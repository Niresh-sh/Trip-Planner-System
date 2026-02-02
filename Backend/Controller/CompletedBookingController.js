// jobs/CompletedBookingJob.js
import Booking from "../Models/BookingModel.js";
import GuideModel from "../Models/GuideModel.js";   

const INTERVAL = 1000 * 60 * 30; // 30 minutes

async function completeDueBookings() {
  try {
    const now = new Date();

    const filter = {
      status: "approved",
      endDate: { $lte: now },
    };

    
    const dueBookings = await Booking.find(filter).select("guide");
    if (!dueBookings || dueBookings.length === 0) {
      return;
    }

    const update = {
      $set: {
        status: "success",
        completedAt: now,
        updatedAt: now,
      },
    };

    const result = await Booking.updateMany(filter, update);

    if (result.modifiedCount > 0) {
      console.log(`Completed ${result.modifiedCount} bookings.`);
    }

   
    const guideIds = [
      ...new Set(
        dueBookings
          .map((b) => (b.guide ? b.guide.toString() : null))
          .filter(Boolean)
      ),
    ];

    if (guideIds.length > 0) {
      const guideRes = await GuideModel.updateMany(
        { _id: { $in: guideIds } },
        { $set: { status: "Available", assignedDestination: null } }
      );

      const updatedGuides =
        (guideRes && (guideRes.modifiedCount || guideRes.nModified)) || 0;
      console.log(`Updated ${updatedGuides} guides to Available.`);
    }
  } catch (err) {
    console.error("Booking completion job error:", err);
  }
}

export default function CompleteBooking() {
  completeDueBookings();
  return setInterval(completeDueBookings, INTERVAL);
}
