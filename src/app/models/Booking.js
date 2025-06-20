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
    slot_time: {
      type: String, // Stores "HH:mm" to track booking time
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
    unique_code: {
      type: String,
      required: true,
    }
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
        slot_time: 1,
        serviceName: "$serviceDetails.name", // Include the service name
        total_price: 1,
        unique_code: 1,
      },
    },
  ]);
};
BookingSchema.statics.withServiceDetailsByEmail = function (email) {
  return this.aggregate([
    {
      $match: {
        user_email: email,
        slot_date: { $gte: new Date() }, // Only future or today's bookings
      },
    },
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
        path: "$serviceDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $sort: {
        slot_date: 1,
        slot_time: 1, // Assuming time is in "HH:mm" format
      },
    },
    {
      $project: {
        _id: 1,
        user_email: 1,
        booking_date_placed: 1,
        slot_date: 1,
        slot_time: 1,
        serviceName: "$serviceDetails.name",
        total_price: 1,
        unique_code: 1,
      },
    },
  ]);
};


export default mongoose.models.Booking ||
  mongoose.model("Booking", BookingSchema);
