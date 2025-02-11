import connectToDatabase from "@/lib/mongoose";
import Booking from "@/app/models/Booking";
import { NextResponse } from "next/server";
import { validateBookingData } from "@/lib/validators/bookingValidation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET api/bookings => gets all available bookings
// Admin Only Route ?
export async function GET() {
  await connectToDatabase();
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json(
      { error: "Unauthorized: Admin access only" },
      { status: 401 }
    );
  }

  const bookings = await Booking.withServiceDetails();
  return new Response(JSON.stringify(bookings), { status: 200 });
}

// POST api/booking => create a new boooking
export async function POST(req) {
  try {
    await connectToDatabase();

    const data = await req.json();
    const validationError = await validateBookingData(data);
    console.log(`INSIDE api/bookings ${JSON.stringify(data)}`);

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
