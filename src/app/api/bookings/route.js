import connectToDatabase from "@/lib/mongoose";
import Booking from "@/app/models/Booking";

export async function GET(req) {
  await connectToDatabase();
  const bookings = await Booking.find({});
  return new Response(JSON.stringify(bookings), { status: 200 });
}

export async function POST(req) {
  try {
    await connectToDatabase();
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
