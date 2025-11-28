import UserModel from "../Models/UserModel.js";
import BookingModel from "../Models/BookingModel.js";
import DestinationModel from "../Models/DestinationModel.js";
import logActivity from "../utils/logActivity.js";
import Trip from "../Models/Trip.js";
import CompleteBooking from "./CompletedBookingController.js";

const getDashboardStats = async (req, res) => {
  try {
    const revenueResult = await BookingModel.aggregate([
      { $match: { status: "success" } },
      { $group: { _id: null, totalRevenue: { $sum: "$totalCost" } } },
    ]);
    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    const totalBooking = await BookingModel.countDocuments();
    const totalUsers = await UserModel.countDocuments();
    const destinations = await DestinationModel.countDocuments();

    const totalTrips = await BookingModel.countDocuments({ status: "success" });
    const pending = await BookingModel.countDocuments({ status: "pending" });
    const declined = await BookingModel.countDocuments({ status: "declined" });
    const approved = await BookingModel.countDocuments({ status: "approved" });

    res.json({
      totalRevenue,
      totalUsers,
      totalBooking,
      destinations,
      totalTrips,
      pending,
      declined,
      approved,
      growth: {
        totalRevenue: 12,
        totalBooking: 15,
        totalUsers: 8,
        destinations: 5,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


export const getTopDestinations = async (req, res) => {
  try {
    const top = await BookingModel.aggregate([
      // 1️⃣ Only consider approved or successful bookings
      { $match: { status: { $in: ["approved", "success"] } } },

      // 2️⃣ Group by destinationId to count bookings
      {
        $group: {
          _id: "$destinationId",
          bookings: { $sum: 1 },
        },
      },

      // 3️⃣ Sort by bookings descending and limit top 5
      { $sort: { bookings: -1 } },
      { $limit: 5 },

      // 4️⃣ Lookup destination details
      {
        $lookup: {
          from: "destinations",
          localField: "_id",
          foreignField: "_id",
          as: "destination",
        },
      },
      { $unwind: "$destination" },

      // 5️⃣ Lookup category name
      {
        $lookup: {
          from: "categories",
          localField: "destination.category",
          foreignField: "_id",
          as: "categoryData",
        },
      },
      { $unwind: { path: "$categoryData", preserveNullAndEmptyArrays: true } },

      // 6️⃣ Collapse duplicates (if any) and pick first
      {
        $group: {
          _id: "$_id",
          title: { $first: "$destination.title" },
          image: { $first: "$destination.image" },
          bookings: { $first: "$bookings" },
          category: { $first: "$categoryData.name" },
        },
      },

      // 7️⃣ Final output
      {
        $project: {
          _id: 0,
          title: 1,
          image: 1,
          bookings: 1,
          category: 1,
        },
      },
    ]);

    res.json(top);
  } catch (err) {
    console.error("Top destinations error:", err);
    res
      .status(500)
      .json({ message: "Server error fetching top destinations" });
  }
};
export default getDashboardStats;