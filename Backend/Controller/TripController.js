import Destinations from '../Models/DestinationModel.js'
import Trip from '../Models/Trip.js';
import  logActivity  from "../utils/logActivity.js";

const getDestinations = async (req, res) => {
  try {
    const destinations = await Destinations.find();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch destinations' });
  }
};

const createTrip = async (req, res) => {
  try {
    const trip = new Trip(req.body);
    const savedTrip = await trip.save();
    res.status(201).json(savedTrip);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create trip' });
  }
};

const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id).populate('selectedDestination');
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving trip' });
  }
};

export {
    getTripById,
    createTrip,
    getDestinations
}
