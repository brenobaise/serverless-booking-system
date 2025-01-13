import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  small_description: {
    type: String,
    required: true,
    trim: true,
  },
  large_description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  sm_img_url: {
    type: String,
    trim: true,
  },
  xl_img_url: {
    type: String,
    trim: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  numOfTimesBooked: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
  },
}, { timestamps: true });

export default mongoose.models.Service || mongoose.model('Service', ServiceSchema);