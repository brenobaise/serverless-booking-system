import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Booking from "@/app/models/Booking";

export async function GET(req, { params }) {
  const { slug } = await params;

  try {
    // Check if the slug contains a single identifier
    if (slug.length === 1) {
      const [identifier] = slug;

      // If the identifier is an email
      if (identifier.includes("@")) {
        const bookings = await Booking.find({ user_email: identifier });
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

    // If the slug is invalid
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  } catch (err) {
    console.error("Error fetching booking:", err.message);
    return NextResponse.json(
      { error: "An error occurred while fetching booking data." },
      { status: 500 }
    );
  }
}
