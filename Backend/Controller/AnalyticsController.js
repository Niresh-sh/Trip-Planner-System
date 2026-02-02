import Booking from "../Models/BookingModel.js";

function makeDaysArray(start, end) {
  const days = [];
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    days.push(new Date(d).toISOString().slice(0, 10));
  }
  return days;
}

function makeMonthsArray(start, end) {
  const months = [];
  for (let d = new Date(start.getFullYear(), start.getMonth(), 1); d <= new Date(end.getFullYear(), end.getMonth(), 1); d.setMonth(d.getMonth() + 1)) {
    months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`);
  }
  return months;
}

function makeIsoWeeksArray(start, end) {
  const weeks = [];
  const cur = new Date(start);

  function isoWeekLabel(dt) {
    const tmp = new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()));
    tmp.setUTCDate(tmp.getUTCDate() + 4 - (tmp.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1));
    const weekNo = Math.ceil((((tmp - yearStart) / 86400000) + 1) / 7);
    return `${tmp.getUTCFullYear()}-W${String(weekNo).padStart(2, "0")}`;
  }

  const startCopy = new Date(cur);
  startCopy.setHours(0, 0, 0, 0);
  while (startCopy <= end) {
    weeks.push(isoWeekLabel(startCopy));
    startCopy.setDate(startCopy.getDate() + 7);
  }
  return weeks;
}

export const getRevenueAnalytics = async (req, res) => {
  try {
    const { year, startDate, endDate, groupBy } = req.query;

       const statuses = ["approved", "success"];

    let start = startDate ? new Date(startDate) : null;
    let end = endDate ? new Date(endDate) : null;

    if (end) end.setHours(23, 59, 59, 999);

    if (year && !start && !end) {
      start = new Date(`${year}-01-01`);
      end = new Date(`${parseInt(year, 10) + 1}-01-01`);
      end.setMilliseconds(-1);
    }

    if (!start || !end) {
      const now = new Date();
      end = end || now;
      start = start || new Date(now.getFullYear() - 1, now.getMonth() + 1, 1);
      end.setHours(23, 59, 59, 999);
    }

    // Auto group by logic
    let gb = groupBy;
    const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24));
    if (!gb) {
      // if (diffDays === 0) gb = "hour";
       if (diffDays <= 31) gb = "day";
      else if (diffDays <= 365) gb = "month";
      else gb = "year";
    }

   
    let groupIdExpr;
    let labels = [];

    if (gb === "hour") {
      groupIdExpr = { $hour: "$startDate" };
      labels = Array.from({ length: 24 }, (_, i) => `${i}:00`);
    } else if (gb === "day") {
      groupIdExpr = { $dateToString: { format: "%Y-%m-%d", date: "$startDate" } };
      labels = makeDaysArray(start, end);
    } else if (gb === "week") {
      groupIdExpr = {
        $concat: [
          { $toString: { $isoWeekYear: "$startDate" } },
          "-W",
          {
            $cond: [
              { $lt: [{ $isoWeek: "$startDate" }, 10] },
              { $concat: ["0", { $toString: { $isoWeek: "$startDate" } }] },
              { $toString: { $isoWeek: "$startDate" } },
            ],
          },
        ],
      };
      labels = makeIsoWeeksArray(start, end);
    } else if (gb === "year") {
      groupIdExpr = { $dateToString: { format: "%Y", date: "$startDate" } };
    } else {
      groupIdExpr = { $dateToString: { format: "%Y-%m", date: "$startDate" } };
      labels = makeMonthsArray(start, end);
    }

    const pipeline = [
      {
        $match: {
          status: { $in: statuses },
          startDate: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: groupIdExpr,
          totalRevenue: { $sum: { $ifNull: ["$totalCost", 0] } },
          tripCount: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ];

    const revenueData = await Booking.aggregate(pipeline);

    const totalStats = await Booking.aggregate([
      {
        $match: {
          status: { $in: statuses },
          startDate: { $gte: start, $lte: end },
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $ifNull: ["$totalCost", 0] } },
          totalTrips: { $sum: 1 },
        },
      },
    ]);

    const totalRevenue = totalStats[0]?.totalRevenue || 0;
    const totalTrips = totalStats[0]?.totalTrips || 0;
    const avgRevenuePerTrip = totalTrips > 0 ? parseFloat((totalRevenue / totalTrips).toFixed(2)) : 0;

    const analytics = labels.map(lbl => {
      const rec = revenueData.find(r => String(r._id) === String(lbl));
      return { label: lbl, revenue: rec ? rec.totalRevenue : 0, trips: rec ? rec.tripCount : 0 };
    });

    return res.status(200).json({
      analytics,
      summary: { totalRevenue, totalTrips, avgRevenuePerTrip },
    });

  } catch (error) {
    console.error("AnalyticsController error:", error);
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};
