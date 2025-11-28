import mongoose from 'mongoose';
import BookingModel from '../Models/BookingModel.js';
import DestinationModel from '../Models/DestinationModel.js';
import * as math from 'mathjs';

/**
 * SVD/ALS-based Collaborative Filtering
 */
const getRecommendations = async (req, res) => {
  try {
    const userId = req.params.userId;

    // 1️⃣ Fetch all successful bookings
const bookings = await BookingModel.find({
  status: { $in: ['approved', 'success'] },
  paymentStatus: 'paid'
});


    // 2️⃣ Build user and destination maps
    const userIds = [...new Set(bookings.map(b => b.userId.toString()))];
    const destIds = [...new Set(bookings.map(b => b.destinationId.toString()))];

    const userIndexMap = {};
    const destIndexMap = {};
    userIds.forEach((id, i) => (userIndexMap[id] = i));
    destIds.forEach((id, i) => (destIndexMap[id] = i));

    // 3️⃣ Create interaction matrix (users x destinations)
    const R = math.zeros(userIds.length, destIds.length)._data; // 2D array

    bookings.forEach(b => {
      const uIdx = userIndexMap[b.userId.toString()];
      const dIdx = destIndexMap[b.destinationId.toString()];
      R[uIdx][dIdx] = 1; // implicit feedback: booked = 1
    });

    // 4️⃣ ALS factorization
    const factors = 5; // latent features
    const iterations = 15;
    const lambda = 0.1;

    let U = math.random([userIds.length, factors], -0.1, 0.1);
    let V = math.random([destIds.length, factors], -0.1, 0.1);

    for (let iter = 0; iter < iterations; iter++) {
      // Update U
      for (let i = 0; i < userIds.length; i++) {
        const ratedDest = R[i].map((r, j) => r ? j : -1).filter(j => j >= 0);
        if (!ratedDest.length) continue;

        const Vj = ratedDest.map(j => V[j]);
        const Rj = ratedDest.map(j => R[i][j]);

        const VjT = math.transpose(Vj);
        const VjTVj = math.add(math.multiply(VjT, Vj), math.multiply(lambda, math.identity(factors)));
        const VjTRj = math.multiply(VjT, Rj);
        U[i] = math.squeeze(math.lusolve(VjTVj, VjTRj));
      }

      // Update V
      for (let j = 0; j < destIds.length; j++) {
        const ratedUsers = R.map((row, i) => row[j] ? i : -1).filter(i => i >= 0);
        if (!ratedUsers.length) continue;

        const Ui = ratedUsers.map(i => U[i]);
        const Rij = ratedUsers.map(i => R[i][j]);

        const UiT = math.transpose(Ui);
        const UiTUi = math.add(math.multiply(UiT, Ui), math.multiply(lambda, math.identity(factors)));
        const UiTRij = math.multiply(UiT, Rij);
        V[j] = math.squeeze(math.lusolve(UiTUi, UiTRij));
      }
    }

    // 5️⃣ Compute scores for the target user
    const uIdx = userIndexMap[userId];
    if (uIdx === undefined) return res.json({ recommendedDestinations: [] });

    const userVector = U[uIdx];
    const scores = destIds.map((dId, idx) => ({
      id: dId,
      score: math.dot(userVector, V[idx]),
    }));

    // Exclude already booked destinations
    const bookedSet = new Set(R[uIdx].map((r, j) => r ? destIds[j] : null).filter(Boolean));
    const recommendations = scores
      .filter(s => !bookedSet.has(s.id))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map(s => mongoose.isValidObjectId(s.id) ? new mongoose.Types.ObjectId(s.id) : s.id);

    const recommendedDestinations = await DestinationModel.find({ _id: { $in: recommendations } });

    res.json({ recommendedDestinations });
  } catch (err) {
    console.error("Matrix Factorization Recommendation Error:", err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

export default getRecommendations;
