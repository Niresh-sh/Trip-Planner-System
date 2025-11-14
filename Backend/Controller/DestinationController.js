import destinationModel from "../Models/DestinationModel.js";
import categoryModel from "../Models/CategoryModel.js";
import logActivity from "../utils/logActivity.js";
import mongoose from "mongoose";

const CreateDestinationController = async (req, res) => {
  try {
    const {
      title,
      location,
      latitude,
      longitude,
      rating,
      duration,
      category,
      cost,
      description,
      highlights,
      elevation,
      bestTime,
      image,
      included,
      notIncluded,
      nearbyAttractions,
    } = req.body;

    const parsedHighlights =
      typeof highlights === "string" ? JSON.parse(highlights) : highlights;
    const parsedIncluded =
      typeof included === "string" ? JSON.parse(included) : included;
    const parsedNotIncluded =
      typeof notIncluded === "string" ? JSON.parse(notIncluded) : notIncluded;
    const parsedNearbyAttractions =
      typeof nearbyAttractions === "string"
        ? JSON.parse(nearbyAttractions)
        : nearbyAttractions;
    const parsedBestTime =
      typeof bestTime === "string" ? JSON.parse(bestTime) : bestTime;

    const destination = new destinationModel({
      title,
      location,
      latitude,
      longitude,
      rating,
      duration,
      category,
      cost,
      description,
      highlights: parsedHighlights,
      elevation,
      bestTime: parsedBestTime,
      image,
      included: parsedIncluded,
      notIncluded: parsedNotIncluded,
      nearbyAttractions: parsedNearbyAttractions,
    });

    await destination.save();

    // Log with destination title (not ID) — non-blocking
    if (req.user?._id) {
      logActivity({
        userId: req.user._id,
        actionType: "create_destination",
        text: `Created destination: ${destination.title}`,
        iconColor: "blue",
      }).catch(() => {});
    }

    res.status(200).json({
      success: true,
      message: "Destination created successfully",
      destination: [destination],
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
  console.log("req.body:", req.body);
};

const getAllDestinationController = async (req, res) => {
  try {
    const destinations = await destinationModel.find().populate("category", "name");
    res.status(200).json({
      success: true,
      destinations: destinations,
      message: "Destination fetched successfully",
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

const UpdateDestinationController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      location,
      latitude,
      longitude,
      rating,
      duration,
      highlights,
      elevation,
      bestTime,
      included,
      notIncluded,
      nearbyAttractions,
      image,
      cost,
      description,
      category,
    } = req.body;

    const destination = await destinationModel.findByIdAndUpdate(
      id,
      {
        title,
        location,
        latitude,
        longitude,
        rating,
        duration,
        category,
        cost,
        description,
        highlights,
        elevation,
        bestTime,
        image,
        included,
        notIncluded,
        nearbyAttractions,
      },
      { new: true }
    );

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    // Log with destination title (not ID) — non-blocking
    if (req.user?._id) {
      logActivity({
        userId: req.user._id,
        actionType: "update_destination",
        text: `Updated destination: ${destination.title}`,
        iconColor: "yellow",
      }).catch(() => {});
    }

    res.status(200).json({
      success: true,
      message: "Destination updated successfully",
      destination: destination,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

const DeleteDestinationController = async (req, res) => {
  try {
    const { id } = req.params;
    const destination = await destinationModel.findByIdAndDelete(id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    // Log with destination title (not ID) — non-blocking
    if (req.user?._id) {
      logActivity({
        userId: req.user._id,
        actionType: "delete_destination",
        text: `Deleted destination: ${destination.title}`,
        iconColor: "red",
      }).catch(() => {});
    }

    res.status(200).json({
      success: true,
      message: "Destination deleted successfully",
      destination: destination,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

const GetSingleDestinationController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid destination ID",
      });
    }

    const destination = await destinationModel.findById(id);

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Destination fetched successfully",
      destination,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Server error: " + e.message,
    });
  }
};

export {
  GetSingleDestinationController,
  DeleteDestinationController,
  UpdateDestinationController,
  getAllDestinationController,
  CreateDestinationController,
};
