import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Booking from "@/app/models/Booking";
import StoreConfig from "@/app/models/StoreConfig";

// Function to calculate available slots
function getAvailableBookingSlots(
  openingHours,
  existingBookings,
  maxBookingsPerSlot
) {
  const { start, end, isClosed } = openingHours;
  if (isClosed) return [];

  function timeToMinutes(timeStr) {
    if (!timeStr || typeof timeStr !== "string" || !timeStr.includes(":")) {
      console.error("Invalid timeStr passed to timeToMinutes:", timeStr);
      return null; // Return null instead of crashing
    }
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  }

  const openingTime = timeToMinutes(start);
  const closingTime = timeToMinutes(end);

  let allSlots = [];
  for (let time = openingTime; time < closingTime; time += 60) {
    allSlots.push(time);
  }

  const bookedCounts = {};
  existingBookings.forEach((booking) => {
    const minutes = timeToMinutes(booking);
    bookedCounts[minutes] = (bookedCounts[minutes] || 0) + 1;
  });

  const availableSlots = allSlots.filter((slot) => {
    return !bookedCounts[slot] || bookedCounts[slot] < maxBookingsPerSlot;
  });

  function minutesToTime(minutes) {
    const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
    const mins = String(minutes % 60).padStart(2, "0");
    return `${hours}:${mins}`;
  }

  return allSlots.map((minutes) => {
    const time = minutesToTime(minutes);
    const isAvailable = !bookedCounts[minutes] || bookedCounts[minutes] < maxBookingsPerSlot;
    return { time, available: isAvailable };
  });

}

// API Handler
export async function GET(req) {
  await connectToDatabase();

  // Extract `date` query param
  const url = new URL(req.url);
  const date = url.searchParams.get("date");

  try {
    if (!date || !date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      return NextResponse.json(
        { error: "Invalid or missing date format" },
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

    const dayOfWeek = new Date(date).toLocaleString("en-GB", {
      weekday: "long",
    });
    const openingHours = storeConfig.Open_times.get(dayOfWeek); // Use `.get()` for Map

    if (!openingHours) {
      return NextResponse.json(
        { error: "Invalid day selection" },
        { status: 400 }
      );
    }

    const existingBookings = await Booking.find({
      slot_date: new Date(date),
    }).select("slot_time");
    const bookedTimes = existingBookings.map((b) => b.slot_time);

    const availableSlots = getAvailableBookingSlots(
      openingHours,
      bookedTimes,
      maxBookingsPerSlot
    );

    return NextResponse.json({ availableSlots }, { status: 200 });
  } catch (err) {
    console.error(" Error fetching available slots:", err.message);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
