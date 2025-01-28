import connectToDatabase from "@/lib/mongoose";
import Service from "@/app/models/Service";
import { NextResponse } from "next/server";

// User GET ./api/services
export async function GET(req) {
  try {
    await connectToDatabase();
    const services = await Service.find({ isAvailable: true });
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}
