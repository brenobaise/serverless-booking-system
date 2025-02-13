import connectToDatabase from "@/lib/mongoose";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import StoreConfig from "@/app/models/StoreConfig";

// Admin Route: api/dashboard/storeconfig
export async function PUT(req) {
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Admin access only" },
        { status: 401 }
      );
    }

    const body = await req.json();
    // console.log("🔹 Received Data:", body);

    let { open_times, max_booking_per_slot } = body;
    if (!open_times || typeof max_booking_per_slot !== "number") {
      console.error("❌ Invalid request data:", {
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

    // console.log(`✅ Updated StoreConfig:`, storeConfig);

    return NextResponse.json(
      { message: "Working hours updated successfully", data: storeConfig },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Server Error:", error);
    return NextResponse.json(
      { error: "Failed to update store configs" },
      { status: 500 }
    );
  }
}

export async function GET(req, res) {
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Admin access only" },
        { status: 401 }
      );
    }

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
