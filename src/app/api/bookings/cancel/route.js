import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import Booking from "@/app/models/Booking";
import mongoose from "mongoose";

export async function POST(req) {
    await connectToDatabase();

    try {
        const { bookingId, userInputCode } = await req.json();

        if (!mongoose.Types.ObjectId.isValid(bookingId)) {
            return NextResponse.json({ error: "Invalid booking ID" }, { status: 400 });
        }

        const booking = await Booking.findById(bookingId);
        if (!booking) {
            return NextResponse.json({ error: "Booking not found" }, { status: 404 });
        }
        console.log("Provided:", userInputCode, "Expected:", booking.unique_code);

        if (booking.unique_code !== userInputCode) {
            return NextResponse.json({ error: "Invalid confirmation code" }, { status: 401 });
        }

        await Booking.findByIdAndDelete(bookingId);

        return NextResponse.json({ message: "Booking cancelled successfully" }, { status: 200 });
    } catch (err) {
        console.error("Cancellation failed:", err.message);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
