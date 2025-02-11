import mongoose from "mongoose";

const StoreConfigSchema = new mongoose.Schema(
  {
    Open_times: {
      type: Map,
      of: String, // Format: "07:00-15:00"
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
