import connectToDatabase from "@/lib/mongoose";
import Booking from "@/app/models/Booking";

// GET../bookings => gets all available bookings
export async function GET(req) {
  await connectToDatabase();
  const bookings = await Booking.find({});
  return new Response(JSON.stringify(bookings), { status: 200 });
}

// POST../booking => create a new boooking
export async function POST(req) {
  try {
    await connectToDatabase();
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
