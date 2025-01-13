import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user_email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
      trim: true,
    },
    booking_date_placed: {
      type: Date,
      default: Date.now,
    },
    slot_date: {
      type: Date,
      required: true,
    },
    Service_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
