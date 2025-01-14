import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Booking from "@/app/models/Booking";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET api/booking/id
export async function GET(req, { params }) {
  try {
    await connectToDatabase();

    const { id } = await params;

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

// DELETE api/bookings/id
export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();

    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Admin access only" },
        { status: 401 }
      );
    }

    const { id } = await params;

    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: `Invalid booking ID format : ${params}` },
        { status: 400 }
      );
    }

    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Booking deleted successfully", booking: deletedBooking },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      `Error deleting Booking, ID received: ${params}`,
      error.message
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
