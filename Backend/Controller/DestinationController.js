import destinationModel from "../Models/DestinationModel.js";
import categoryModel from "../Models/CategoryModel.js";

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

     // Fetch category name from ID
    // const categoryDoc = await categoryModel.findById(category);
    // const categoryName = categoryDoc?.name || "Uncategorized";

    // Parse fields that come in stringified JSON format
    const parsedHighlights = typeof highlights === "string" ? JSON.parse(highlights) : highlights;
    const parsedIncluded = typeof included === "string" ? JSON.parse(included) : included;
    const parsedNotIncluded = typeof notIncluded === "string" ? JSON.parse(notIncluded) : notIncluded;
    const parsedNearbyAttractions = typeof nearbyAttractions === "string" ? JSON.parse(nearbyAttractions) : nearbyAttractions;
    const parsedBestTime = typeof bestTime === "string" ? JSON.parse(bestTime) : bestTime;


    const destination = new destinationModel({
      title,
      location,
      latitude,
      longitude,
      rating,
      duration,
      category ,
      cost,
      description,
      highlights: parsedHighlights,
      elevation,
      bestTime : parsedBestTime,
      image,
      included : parsedIncluded,
      notIncluded : parsedNotIncluded,
      nearbyAttractions : parsedNearbyAttractions,
    });
    await destination.save();
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
    const destinations = await destinationModel.find().populate('category');
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

import mongoose from "mongoose";

const GetSingleDestinationController = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if id is valid
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
