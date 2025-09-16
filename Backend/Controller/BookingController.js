import Trip from "../Models/Trip.js";
import BookingModel from "../Models/BookingModel.js";
import GuideModel from "../Models/GuideModel.js";

// CREATE BOOKING
const createBooking = async (req, res) => {
  try {
    const {
      tripId,
      destinationId,
      persons,
      startDate,
      totalCost,
      contact,
      guideIncluded,
    } = req.body;
    if (
      !tripId ||
      !destinationId ||
      !persons ||
      !startDate ||
      !totalCost ||
      !contact
    ) {
      return res
        .status(400)
        .json({ message: "Missing required booking data." });
    }

    const userId = req.user._id;

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    let assignedGuide = null;

    if (guideIncluded) {
      assignedGuide = await GuideModel.findOneAndUpdate(
        { status: "Available" },
        { status: "Occupied" },
        { new: true }
      );

      if (!assignedGuide) {
        return res
          .status(400)
          .json({ message: "No available guides at the moment." });
      }
    }

    const booking = new BookingModel({
      userId,
      tripId,
      destinationId,
      persons,
      startDate,
      totalCost,
      contact,
      guideIncluded,
      guide: guideIncluded ? assignedGuide._id : undefined,
      status: "pending",
    });

    await booking.save();

    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// CANCEL BOOKING
const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user._id;

    const booking = await BookingModel.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Ensure user owns booking
    if (booking.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized cancellation" });
    }

   if (booking.status === 'cancelled' || booking.status === 'success') {
  return res.status(400).json({ message: 'This booking cannot be cancelled.' });
}

    // Mark guide as available again if guide was assigned
    if (booking.guide) {
      await GuideModel.findByIdAndUpdate(booking.guide, {
        status: "Available",
      });
    }

    await BookingModel.findByIdAndDelete(bookingId);

    res.json({ message: "Booking cancelled successfully (non-refundable)" });
  } catch (error) {
    console.error("Cancel error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET USER BOOKING HISTORY
const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookings = await BookingModel.find({ userId })
      .populate("destinationId")
      .populate("tripId")
      .populate("guide")
      .populate("destinationId")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error("Fetch bookings error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getBookingById = async (req, res) => {
  try {
    const booking = await BookingModel.findById(req.params.bookingId)
      .populate("tripId")
      .populate("guide")
      .populate("destinationId");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { createBooking, cancelBooking, getUserBookings, getBookingById };
