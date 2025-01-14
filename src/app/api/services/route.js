import connectToDatabase from "@/lib/mongoose";
import Service from "@/app/models/Service";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// GET api/services -> returns an object with all available services
export async function GET(req) {
  try {
    await connectToDatabase();

    const services = await Service.find({ isAvailable: true });
    console.log(services);
    return NextResponse.json(services, { status: 200 });
  } catch (error) {
    console.error("Error fetching services:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

//POST api/services -> creates a service based on request.body
// Admin Route only
export async function POST(req) {
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Admin access only" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const newService = await Service.create(body);

    return NextResponse.json(newService, { status: 201 });
  } catch (error) {
    console.error("Error creating service:", error.message);
    return NextResponse.json(
      { error: "Failed to create service" },
      { status: 500 }
    );
  }
}
