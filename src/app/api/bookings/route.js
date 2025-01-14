import connectToDatabase from "@/lib/mongoose";
import Booking from "@/app/models/Booking";
import { NextRequest, NextResponse } from "next/server";
import { validateBookingData } from "@/lib/validators/bookingValidation";

// GET../bookings => gets all available bookings
export async function GET(req) {
  await connectToDatabase();
  const bookings = await Booking.find({});
  return new Response(JSON.stringify(bookings), { status: 200 });
}

// POST api/booking => create a new boooking
export async function POST(req) {
  try {
    await connectToDatabase();

    const data = await req.json();
    const validationError = await validateBookingData(data);

    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // Create the booking
    const { user_email, slot_date, Service_id, total_price } = data;
    const newBooking = await Booking.create({
      user_email,
      slot_date: new Date(slot_date),
      Service_id,
      total_price,
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error("Error creating booking:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
