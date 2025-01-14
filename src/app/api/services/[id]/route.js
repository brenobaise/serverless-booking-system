import connectToDatabase from "@/lib/mongoose";
import Service from "@/app/models/Service";
import { NextRequest, NextResponse } from "next/server";

// GET api/services/:id
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

// DELETE api/services/:id
export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();

    const { id } = params;

    // Validate the ID format (ObjectID format)
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return NextResponse.json(
        { error: "Invalid Service ID" },
        { status: 400 }
      );
    }

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return NextResponse.json({ error: "Service not Found", status: 404 });
    }

    return NextResponse.json(
      { message: "Service deleted successfully", service: deletedService },
      { status: 200 }
    );
  } catch (err) {
    console.error(
      `Error deleting Service, ID received: ${params}`,
      err.message
    );
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
