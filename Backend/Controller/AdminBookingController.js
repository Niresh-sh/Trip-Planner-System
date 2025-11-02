import BookingModel from "../Models/BookingModel.js";
import GuideModel from "../Models/GuideModel.js";
import logActivity from "../utils/logActivity.js";

// GET ALL BOOKINGS (ADMIN)
const getAllBookings = async (req, res) => {
  try {
    console.log("User in getAllBookings:", req.user);
    console.log('User:', req.user);
    const bookings = await BookingModel.find()
      .populate("userId", "firstName email")
      .populate("tripId")
      .populate("guide")
      .populate("destinationId", "title")
      .sort({ createdAt: -1 });

    // Log the admin fetching all bookings
   

    res.json(bookings);
  } catch (error) {
    console.error("Fetch all bookings error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// APPROVE BOOKING
const approveBooking = async (req, res) => {
  try {
    const booking = await BookingModel.findById(req.params.id)
     .populate("destinationId", "title");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // keep casing consistent
    booking.status = "approved";
    await booking.save();

    // Log the admin approval action
    if (req.user) {
      await logActivity({
        userId: req.user._id || req.user.id,
        actionType: 'approve_booking',
        text: `Booking approved ${booking.destinationId.title}`,
        iconColor: 'green',
      });
    }

    res.json({ message: "Booking approved", booking });
    
  } catch (error) {
    console.error("Approve booking error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DECLINE BOOKING
const declineBooking = async (req, res) => {
  try {
    const booking = await BookingModel.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "Declined";

    if (booking.guide) {
      await GuideModel.findByIdAndUpdate(booking.guide, { status: "Available" });
    }

    await booking.save();

    // Log the admin decline action
    if (req.user) {
      await logActivity({
        userId: req.user._id || req.user.id,
        actionType: 'decline_booking',
        text: `booking declined ${booking.destinationId.title}`,
        iconColor: 'orange',
      });
    }

    res.json({ message: "Booking declined", booking });
  } catch (error) {
    console.error("Decline booking error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// DELETE BOOKING (ADMIN)
const deleteBooking = async (req, res) => {
  try {
    const booking = await BookingModel.findByIdAndDelete(req.params.id)
     .populate("destinationId", "title");
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.guide) {
      await GuideModel.findByIdAndUpdate(booking.guide, { status: "Available" });
    }
     await BookingModel.findByIdAndDelete(req.params.id);
    // Log the admin delete action
    if (req.user) {
      await logActivity({
        userId: req.user._id || req.user.id,
        actionType: 'delete_booking',
        text: `${req.user.firstName} ${req.user.lastName}'s  booking has been deleted package name ${booking.destinationId.title}`,
        iconColor: 'red',
      });
    }

    res.json({ message: "Booking deleted" });
  } catch (error) {
    console.error("Delete booking error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getAllBookings, approveBooking, declineBooking, deleteBooking };
