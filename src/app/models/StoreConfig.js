import mongoose from "mongoose";

const OpenTimeSchema = new mongoose.Schema({
  start: {
    type: String, // Format: "HH:mm"
    required: false, // Not required if closed
  },
  end: {
    type: String, // Format: "HH:mm"
    required: false, // Not required if closed
  },
  isClosed: {
    type: Boolean,
    default: false, // Stores whether the business is closed on that day
  },
});

const StoreConfigSchema = new mongoose.Schema(
  {
    Open_times: {
      type: Map,
      of: OpenTimeSchema,
      required: true,
    },
    max_bookings_per_slot: {
      type: Number,
      default: 1,
      min: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.models.StoreConfig ||
  mongoose.model("StoreConfig", StoreConfigSchema);
