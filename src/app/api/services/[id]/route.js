import connectToDatabase from "@/lib/mongoose";
import Service from "@/app/models/Service";
import { NextRequest, NextResponse } from "next/server";

// GET api/services/id
export async function GET(req, { params }) {
  try {
    await connectToDatabase();

    const { id } = params;

    // Validate the ID format (ObjectID format)
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Invalid service ID" },
        { status: 400 }
      );
    }

    // Fetch the service from the database
    const service = await Service.findById(id);

    if (!service) {
      return NextResponse.json({ error: "Service not found" }, { status: 404 });
    }

    return NextResponse.json(service, { status: 200 });
  } catch (err) {
    console.log("Error fetching service:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
