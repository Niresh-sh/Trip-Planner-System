// New file: background job to mark approved bookings as success after endDate passes

import Booking from "../Models/BookingModel.js";

const CHECK_INTERVAL_MS = 1000 * 60 * 30; // 30 minutes

async function completeDueBookings() {
  try {
    const now = new Date();

    // Treat endDate <= now as completed. If you want "end of day" semantics for date-only entries,
    // ensure endDate is stored with end-of-day time or adjust here to setHours(23,59,59,999).
    const filter = {
      status: "approved",
      endDate: { $lte: now },
    };

    const update = {
      $set: {
        status: "success",
        completedAt: now,
        updatedAt: now,
      },
    };

    const result = await Booking.updateMany(filter, update);
    if (result.matchedCount && result.modifiedCount) {
      console.log(`CompleteBookingsJob: marked ${result.modifiedCount} booking(s) as success.`);
    } else if (result.matchedCount) {
      console.log(`CompleteBookingsJob: ${result.matchedCount} booking(s) matched, no changes needed.`);
    } else {
      // nothing to update
    }
  } catch (err) {
    console.error("CompleteBookingsJob error:", err);
  }
}

export function CompleteBooking() {
  // run immediately
  completeDueBookings().catch((e) => console.error(e));

  // schedule periodic runs
  const id = setInterval(() => {
    completeDueBookings().catch((e) => console.error(e));
  }, CHECK_INTERVAL_MS);

  // return stop function if caller wants to clear interval
  return () => clearInterval(id);
}