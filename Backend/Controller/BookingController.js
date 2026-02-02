import Trip from "../Models/Trip.js";
import BookingModel from "../Models/BookingModel.js";
import GuideModel from "../Models/GuideModel.js";
import DestinationModel from "../Models/DestinationModel.js";
import logActivity from "../utils/logActivity.js";
import { refundKhaltiPayment } from "./PaymentController.js";


const createBooking = async (req, res) => {
  try {
    const {
      tripId,
      destinationId,
      persons,
      startDate,
      totalCost,
      contact,
      guideIncluded: guideFromBody,
      paymentId,
    } = req.body;

    let guideIncluded = true; // enforced business rule

    if (!tripId || !destinationId || !persons || !startDate || !totalCost || !contact) {
      return res.status(400).json({ message: "Missing required booking data." });
    }

    const userId = req.user._id;

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: "Trip not found" });

    // Optional: prevent overbooking
    if (trip.maxPersons && persons > trip.maxPersons) {
      return res.status(400).json({ message: "Not enough available spots for this trip." });
    }

    let assignedGuide = null;

    if (guideIncluded) {
      assignedGuide = await GuideModel.findOneAndUpdate(
        { status: "Available" },
        { status: "Occupied", assignedDestination: destinationId },
        { new: true }
      );

      if (!assignedGuide) {
        return res.status(400).json({ message: "No available guides at the moment." });
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
      guide: guideIncluded ? assignedGuide._id : null,
      status: "pending",
    });

    if (paymentId) {
      booking.paymentId = paymentId;
      booking.paymentStatus = "paid";
      booking.completedAt = new Date();
    }

    await booking.save();

    const dest = await DestinationModel.findById(destinationId).select("title");

    logActivity({
      userId,
      actionType: "create_booking",
      text: `Booking made by ${req.user.firstName} ${req.user.lastName} for ${
        dest?.title || "destination"
      }`,
      iconColor: "green",
    });

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

    if (booking.userId.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized cancellation" });
    }

  if (["declined", "cancelled", "success"].includes(booking.status)) {
  return res.status(400).json({ message: "This booking cannot be cancelled." });
}


    const dest = await DestinationModel.findById(booking.destinationId).select(
      "title"
    );

    if (booking.guide) {
      await GuideModel.findByIdAndUpdate(booking.guide, {
        status: "Available",
        assignedDestination: null,
      });
    }

    booking.status = "cancelled";
    booking.paymentStatus = "cancelled"; // non-refundable

  

    await booking.save();

    logActivity({
      userId: req.user._id,
      actionType: "cancel_booking",
      text: `Booking cancelled (${dest?.title || "destination"})`,
      iconColor: "red",
    }).catch(() => {});

    

    return res.json({ message: "Booking cancelled (non-refundable)", booking });
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
      .populate(
        "destinationId",
        "title location image latitude longitude cost duration"
      )
      .populate("tripId")
      .populate("guide")
      .populate({
        path: "destinationId",
        populate: {
          path: "category",
          select: "name",
        },
      });
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
      .populate({
        path: "guide",
        populate: {
          path: "assignedDestination", // 👈 must match the Guide schema field
          select: "title location latitude longitude",
        },
      })
      .populate(
        "destinationId",
        "title location image latitude longitude cost duration"
      )
      .populate({
        path: "destinationId",
        populate: {
          path: "category",
          select: "name",
        },
      });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL BOOKINGS (ADMIN)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await BookingModel.find()
      .populate("userId", "firstName email")
      .populate("tripId")
      .populate("guide")
      .populate("destinationId", "title location");

    res.json(bookings);
  } catch (error) {
    console.error("Fetch all bookings error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// APPROVE BOOKING
const approveBooking = async (req, res) => {
  try {
    const booking = await BookingModel.findById(req.params.id).populate(
      "destinationId",
      "title location"
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = "approved"; // enum requires lowercase
    await booking.save();

    logActivity({
      userId: req.user._id,
      actionType: "approve_booking",
      text: `Approved booking ${booking._id} (${
        booking.destinationId?.title || "destination"
      })`,
      iconColor: "green",
    }).catch(() => {});

   

    return res.json({ message: "Booking approved", booking });
  } catch (error) {
    console.error("Approve booking error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const declineBooking = async (req, res) => {
  try {
    const booking = await BookingModel.findById(req.params.id).populate(
      "destinationId",
      "title location"
    );
  
    if (["declined", "cancelled", "success"].includes(booking.status)) {
  return res.status(400).json({
    message: "This booking cannot be declined.",
  });
}

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Refund only if payment was completed
    if (booking.paymentStatus === "paid" && booking.paymentId) {
  const refund = await refundKhaltiPayment(booking.paymentId);


       if (!refund.success) {
    booking.paymentStatus = "refunded";
  } else {
    return res.status(500).json({ message: "Refund failed" });
  }

      booking.paymentStatus = "refunded";
    }

    // ree guide if assigned
    if (booking.guide) {
      await GuideModel.findByIdAndUpdate(booking.guide, {
        status: "Available",
        assignedDestination: null,
      });
    }

    booking.status = "declined";
    await booking.save();

    // Log activity
    logActivity({
      userId: req.user._id,
      actionType: "decline_booking",
      text: `Declined booking ${booking._id} (${
        booking.destinationId?.title || "destination"
      })`,
      iconColor: "orange",
    }).catch(() => {});
   

    return res.json({ message: "Booking declined", booking });
  } catch (error) {
    console.error("Decline booking error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// DELETE BOOKING (ADMIN)
const deleteBooking = async (req, res) => {
  try {
    // fetch first to get destination title
    const booking = await BookingModel.findById(req.params.id).populate(
      "destinationId",
      "title"
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.guide) {
      await GuideModel.findByIdAndUpdate(booking.guide, {
        status: "Available",
        assignedDestination: null,
      });
    }

    await BookingModel.findByIdAndDelete(req.params.id);

    logActivity({
      userId: req.user._id,
      actionType: "delete_booking",
      text: `Admin deleted booking ${booking._id} (${
        booking.destinationId?.title || "destination"
      })`,
      iconColor: "red",
    }).catch(() => {});

    return res.json({ message: "Booking deleted" });
  } catch (error) {
    console.error("Delete booking error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  createBooking,
  cancelBooking,
  getUserBookings,
  getBookingById,
  deleteBooking,
  declineBooking,
  approveBooking,
  getAllBookings,
};
