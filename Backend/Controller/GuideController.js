// controllers/guideController.js
import Guide from '../Models/GuideModel.js'
import Destination from '../Models/DestinationModel.js';
import  logActivity  from "../utils/logActivity.js";

// Create Guide
export const createGuide = async (req, res) => {
  try {
    const guide = await Guide.create(req.body);
    if (req.user?._id) {
      await logActivity({
        userId: req.user._id,
        actionType: "create_guide",
        text: `Created guide: ${guide.name}`,
        iconColor: "blue",
      });
    }
    res.status(201).json(guide);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All Guides
export const getAllGuides = async (req, res) => {
  try {
    const guides = await Guide.find().populate("assignedDestination", "location title");
    res.status(200).json(guides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Guide by ID
export const getGuideById = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id).populate('assignedDestination');
    if (!guide) return res.status(404).json({ error: 'Guide not found' });
    if (req.user?._id) {
      await logActivity({
        userId: req.user._id,
        actionType: "fetch_guide",
        text: `Fetched guide: ${guide.name}`,
        iconColor: "blue",
      });
    }
    res.status(200).json(guide);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Guide
export const updateGuide = async (req, res) => {
  try {
    const guide = await Guide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!guide) return res.status(404).json({ error: 'Guide not found' });
    if (req.user?._id) {
      await logActivity({
        userId: req.user._id,
        actionType: "update_guide",
        text: `Updated guide: ${guide.name}`,
        iconColor: "yellow",
      });
    }
    res.status(200).json(guide);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete Guide
export const deleteGuide = async (req, res) => {
  try {
    const guide = await Guide.findByIdAndDelete(req.params.id);
    if (!guide) return res.status(404).json({ error: 'Guide not found' });
    if (req.user?._id) {
      await logActivity({
        userId: req.user._id,
        actionType: "delete_guide",
        text: `Deleted guide: ${guide.name}`,
        iconColor: "red",
      });
    }
    res.status(200).json({ message: 'Guide deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign Guide to Destination
export const assignGuideToDestination = async (req, res) => {
  try {
    const { guideId, destinationId } = req.body;
    const guide = await Guide.findById(guideId);
    if (!guide) return res.status(404).json({ error: 'Guide not found' });

    const destination = await Destination.findById(destinationId);
    if (!destination) return res.status(404).json({ error: 'Destination not found' });

    guide.assignedDestination = destination._id;
    guide.status = "Occupied";
    await guide.save();
    await guide.populate("assignedDestination", "location title");

    if (req.user?._id) {
      await logActivity({
        userId: req.user._id,
        actionType: "assign_guide",
        text: `Assigned guide ${guide.name} to ${destination.title}`,
        iconColor: "green",
      });
    }

    res.status(200).json({ message: 'Guide assigned successfully', guide });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
