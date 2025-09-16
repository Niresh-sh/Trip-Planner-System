// controllers/guideController.js
import Guide from '../Models/GuideModel.js'
import Destination from '../Models/DestinationModel.js';

// Create a new guide
export const createGuide = async (req, res) => {
  try {
    const guide = await Guide.create(req.body);
    res.status(201).json(guide);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all guides
export const getAllGuides = async (req, res) => {
  try {
    const guides = await Guide.find().populate('assignedDestination');
    res.status(200).json(guides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single guide by ID
export const getGuideById = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id).populate('assignedDestination');
    if (!guide) return res.status(404).json({ error: 'Guide not found' });
    res.status(200).json(guide);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a guide
export const updateGuide = async (req, res) => {
  try {
    const guide = await Guide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!guide) return res.status(404).json({ error: 'Guide not found' });
    res.status(200).json(guide);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a guide
export const deleteGuide = async (req, res) => {
  try {
    const guide = await Guide.findByIdAndDelete(req.params.id);
    if (!guide) return res.status(404).json({ error: 'Guide not found' });
    res.status(200).json({ message: 'Guide deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign a guide to a destination
export const assignGuideToDestination = async (req, res) => {
  const { guideId, destinationId } = req.body;

  try {
    const guide = await Guide.findById(guideId);
    if (!guide) return res.status(404).json({ error: 'Guide not found' });

    const destination = await Destination.findById(destinationId);
    if (!destination) return res.status(404).json({ error: 'Destination not found' });

    guide.assignedDestination = destinationId;
    guide.status = 'Occupied';

    await guide.save();

    res.status(200).json({ message: 'Guide assigned successfully', guide });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
