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

// Define a static method for aggregation
BookingSchema.statics.withServiceDetails = function () {
  return this.aggregate([
    {
      $lookup: {
        from: "services",
        localField: "Service_id",
        foreignField: "_id",
        as: "serviceDetails",
      },
    },
    {
      $unwind: {
        path: "$serviceDetails", // Unwind the serviceDetails array
        preserveNullAndEmptyArrays: true, // Keep bookings even if no matching service is found
      },
    },
    {
      $project: {
        _id: 1,
        user_email: 1,
        booking_date_placed: 1,
        slot_date: 1,
        serviceName: "$serviceDetails.name", // Include the service name
        total_price: 1,
      },
    },
  ]);
};
BookingSchema.statics.withServiceDetailsByEmail = function (email) {
  return this.aggregate([
    {
      $match: { user_email: email },
    },
    {
      $lookup: {
        from: "services", // Collection name in MongoDB
        localField: "Service_id",
        foreignField: "_id",
        as: "serviceDetails",
      },
    },
    {
      $unwind: {
        path: "$serviceDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        user_email: 1,
        booking_date_placed: 1,
        slot_date: 1,
        serviceName: "$serviceDetails.name", // Extract the service name
        total_price: 1,
      },
    },
  ]);
};

export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
