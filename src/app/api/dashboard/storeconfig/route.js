import connectToDatabase from "@/lib/mongoose";
import { NextResponse } from "next/server";
import StoreConfig from "@/app/models/StoreConfig";

// Admin Route: api/dashboard/storeconfig
export async function PUT(req) {
  try {
    await connectToDatabase();

    const body = await req.json();

    let { open_times, max_booking_per_slot } = body;
    if (!open_times || typeof max_booking_per_slot !== "number") {
      console.error("Invalid request data:", {
        open_times,
        max_booking_per_slot,
      });
      return NextResponse.json(
        {
          error: "Missing or invalid fields: open_times, max_booking_per_slot",
        },
        { status: 400 }
      );
    }

    const storeConfig = await StoreConfig.findOneAndUpdate(
      {},
      { Open_times: open_times, max_bookings_per_slot: max_booking_per_slot },
      { new: true, upsert: true }
    );

    return NextResponse.json(
      { message: "Working hours updated successfully", data: storeConfig },
      { status: 200 }
    );
  } catch (error) {
    console.error(" Server Error:", error);
    return NextResponse.json(
      { error: "Failed to update store configs" },
      { status: 500 }
    );
  }
}

export async function GET(req, res) {
  try {
    await connectToDatabase();

    const storeConfig = await StoreConfig.findOne();

    if (!storeConfig) {
      return NextResponse.json(
        { message: "No working hours set" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        data: {
          open_times: storeConfig.Open_times,
          max_booking_per_slot: storeConfig.max_bookings_per_slot,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
