import Activity from "../Models/ActivityModel.js";

// GET all activities (latest first)
export const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate("userId", "firstName lastName email")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: activities });
  } catch (err) {
    console.error("getAllActivities error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET activities by user
export const getUserActivities = async (req, res) => {
  try {
    const { userId } = req.params;
    const activities = await Activity.find({ userId })
      .populate("userId", "firstName lastName email")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: activities });
  } catch (err) {
    console.error("getUserActivities error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE activity by ID (for admin)
export const deleteActivity = async (req, res) => {
  try {
    const { id } = req.params;
    await Activity.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Activity deleted" });
  } catch (err) {
    console.error("deleteActivity error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
