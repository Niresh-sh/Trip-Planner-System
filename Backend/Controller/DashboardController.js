import UserModel from '../Models/UserModel.js';
import BookingModel from '../Models/BookingModel.js';
import DestinationModel from '../Models/DestinationModel.js';
import  logActivity  from "../utils/logActivity.js";

const getDashboardStats = async (req, res) => {
  try {
    // Total revenue (sum of all booking amounts)
    const revenueResult = await BookingModel.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: '$totalCost' } } }
    ]);
    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    // Total bookings
    const totalBooking = await BookingModel.countDocuments();

    // Total users
    const totalUsers = await UserModel.countDocuments();

    // Total destinations
    const destinations = await DestinationModel.countDocuments();

    res.json({
      totalRevenue,
      totalUsers,
      totalBooking,
      destinations,
      growth: {
        totalRevenue: 12,  // You can calculate growth dynamically
        totalBooking: 15,
        totalUsers: 8,
        destinations: 5
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

export default getDashboardStats
