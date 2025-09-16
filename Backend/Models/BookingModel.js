// models/BookingModel.js
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assumes user auth is in place
    required: true,
  },
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true,
  },
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    required: true,
  },
  persons: {
    type: Number,
    required: true,
    min: 1,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: Date,

  totalCost: {
    type: Number,
    required: true,
  },
  contact: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  guideIncluded: {
    type: Boolean,
    default: false,
  },
  guide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Guide',
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'cancelled', 'success'],
    default: 'pending',
  }
}, { timestamps: true });

const BookingModel = mongoose.model('Booking', bookingSchema);
export default BookingModel;
