// models/BookingModel.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    tripId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    destinationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
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
    endDate: {
  type: Date,
  required: true,
  default: function () {
    const d = new Date(this.startDate);
    d.setHours(23, 59, 59, 999);
    return d;
  }
},


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
      ref: "Guide",
    },
    status: {
  type: String,
  enum: ["pending", "approved", "declined", "success", "cancelled"],
  default: "pending",
},

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded", "cancelled"],
      default: "pending",
    },

    paymentId: { type: String, default: null }, 
    paymentMethod: { type: String, default: "khalti" },
    paymentDetails: { type: Object, default: {} }, 

    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("Booking", bookingSchema);
export default BookingModel;
