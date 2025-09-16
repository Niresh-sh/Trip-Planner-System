import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  budget: Number,
  startDate: String,
  endDate: String,
  persons: Number,
  contactInfo: {
    name: String,
    email: String,
    phone: String
  },
  selectedDestination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Destination'
  }
});

export default mongoose.model('Trip', tripSchema);
