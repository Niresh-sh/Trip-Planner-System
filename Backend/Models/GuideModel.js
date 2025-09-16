// models/guideModel.js
import mongoose from 'mongoose';

const guideSchema = new mongoose.Schema({
  name: String,
  phone: String,
  languages: [String],
   location: String,
  status: {
    type: String,
    enum: ['Available', 'Occupied'],
    default: 'Available',
  },
  assignedDestination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination',
    default: null,
  },
});

export default mongoose.model('Guide', guideSchema);
