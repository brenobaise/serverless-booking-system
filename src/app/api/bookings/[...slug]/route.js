import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Booking from "@/app/models/Booking";
import mongoose from "mongoose";
import Service from "@/app/models/Service";



export async function GET(req, { params }) {
  const { slug } = await params;
  await connectToDatabase()

  try {
    // Check if the slug contains a single identifier
    if (slug.length === 1) {
      const [identifier] = slug;

      // If the identifier is an email
      if (identifier.includes("@")) {
        const bookings = await Booking.withServiceDetailsByEmail(identifier);
        return NextResponse.json(bookings || [], { status: 200 });
      }


      if (identifier.match(/^[0-9a-fA-F]{24}$/)) {

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

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Invalid booking ID" }, { status: 400 });
  }

  try {
    await connectToDatabase();

    const booking = await Booking.findById(id);
    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    await Booking.findByIdAndDelete(id);

    // 3. Decrement the numOfTimesBooked for the associated service
    if (booking.Service_id) {
      await Service.findByIdAndUpdate(booking.Service_id, {
        $inc: { numOfTimesBooked: -1 },
      });
    }

    return NextResponse.json(
      { message: "Booking successfully deleted", deleted: booking },
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
