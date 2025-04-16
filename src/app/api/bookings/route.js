import connectToDatabase from "@/lib/mongoose";
import Booking from "@/app/models/Booking";
import { NextResponse } from "next/server";
import { validateBookingData } from "@/lib/validators/bookingValidation";
import StoreConfig from "@/app/models/StoreConfig";

// GET api/bookings => gets all available bookings
// Admin Only Route ?
export async function GET() {
  await connectToDatabase();

  const bookings = await Booking.withServiceDetails();

  return new Response(JSON.stringify(bookings), { status: 200 });
}

// POST api/booking => create a new boooking
export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();

    const { user_email, slot_date, slot_time, Service_id, total_price, unique_code } = data;

    if (
      !user_email ||
      !slot_date ||
      !slot_time ||
      !Service_id ||
      !total_price
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const storeConfig = await StoreConfig.findOne();
    if (!storeConfig) {
      return NextResponse.json(
        { error: "Store configuration not found" },
        { status: 500 }
      );
    }

    const maxBookingsPerSlot = storeConfig.max_bookings_per_slot || 1;

    // Check existing bookings for the selected date and time slot
    const existingBookings = await Booking.countDocuments({
      slot_date: new Date(slot_date),
      slot_time,
    });

    if (existingBookings >= maxBookingsPerSlot) {
      return NextResponse.json(
        { error: "Time slot fully booked" },
        { status: 400 }
      );
    }

    // Create the new booking
    const newBooking = await Booking.create({
      user_email,
      slot_date: new Date(slot_date),
      slot_time,
      Service_id,
      total_price,
      unique_code
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
