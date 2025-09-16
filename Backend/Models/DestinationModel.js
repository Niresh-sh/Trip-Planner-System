import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  title: String,
  location: String,
  latitude: Number,
  longitude: Number,
  rating: Number,
  duration: String,
  cost: Number,
  category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'category' }], 
  description: String,
  highlights: [String],
  elevation: String,
  bestTime: Object,
  image: String,
  included: [String],
  notIncluded: [String],
  nearbyAttractions: [
    {
      name: String,
      distance: String,
      rating: Number
    }
  ]
}, { timestamps: true });

export default mongoose.model("Destination", destinationSchema);
