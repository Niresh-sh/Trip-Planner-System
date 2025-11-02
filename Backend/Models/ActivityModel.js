import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    actionType: { type: String, required: true },
    text: { type: String, required: true },
    iconColor: { type: String, required: true },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
