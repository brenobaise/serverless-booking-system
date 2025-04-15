import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Booking from "@/app/models/Booking";
import mongoose from "mongoose";


export async function GET(req, { params }) {
  const { slug } = await params;

  try {
    // Check if the slug contains a single identifier
    if (slug.length === 1) {
      const [identifier] = slug;

      // If the identifier is an email
      if (identifier.includes("@")) {
        const bookings = await Booking.withServiceDetailsByEmail(identifier);
        if (bookings.length === 0) {
          return NextResponse.json(
            { error: `No bookings found for this email. ${identifier}` },
            { status: 404 }
          );
        }
        return NextResponse.json(bookings, { status: 200 });
      }

      // If the identifier is a valid ObjectID
      if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
        console.log("Fetching booking by ID:", identifier);

        const booking = await Booking.findById(identifier);
        if (!booking) {
          return NextResponse.json(
            { error: "Booking not found." },
            { status: 404 }
          );
        }
        return NextResponse.json(booking, { status: 200 });
      }
    }

    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  } catch (err) {
    console.error("Error fetching booking:", err.message);
    return NextResponse.json(
      { error: "An error occurred while fetching booking data." },
      { status: 500 }
    );
  }
}


export async function PATCH(req, { params }) {
  const { slug } = await params;
  const id = slug[0];

  // checks if the incoming id is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid booking ID" }, { status: 400 });
  }
  try {
    const data = await req.json();

    const updatedBooking = await Booking.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!updatedBooking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBooking);
  } catch (err) {
    console.error("Error updating booking:", err.message);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { slug } = await params;
  const id = slug[0];
  // checks if the incoming id is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid booking ID" }, { status: 400 });
  }

  try {
    const deleted = await Booking.findByIdAndDelete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Booking successfully deleted", deleted },
      { status: 200 }
    );
  } catch (err) {
    console.error("Failed to delete booking:", err.message);
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}