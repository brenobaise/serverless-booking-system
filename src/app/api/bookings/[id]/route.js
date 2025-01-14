import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Booking from "@/app/models/Booking";

// GET api/booking/id
export async function GET(req, { params }) {
  try {
    await connectToDatabase();

    const { id } = params;

    // Validate the ID format (ObjectID format)
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Invalid Booking ID" },
        { status: 400 }
      );
    }

    // Fetch the service from the database
    const booking = await Booking.findById(id);

    if (!booking) {
      return NextResponse.json(
        { error: `Booking ${params}  not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(booking, { status: 200 });
  } catch (err) {
    console.error("Error fetching Booking", error.message);
    return NextResponse.json(
      { error: `Failed to fetch the Booking by ID: ${params}` },
      { status: 500 }
    );
  }
}
