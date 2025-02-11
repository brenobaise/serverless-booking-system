import connectToDatabase from "@/lib/mongoose";
import Service from "@/app/models/Service";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Admin GET api/dashboard/services/:id
export async function GET(req, { params }) {
  try {
    await connectToDatabase();

    const { id } = await params;

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

// Admin  POST api/dashboard/services/:id
export async function PUT(req, { params }) {
  const { id } = params;
  const {
    name,
    small_description,
    large_description,
    price,
    duration,
    isAvailable,
  } = await req.json();

  // Validate the ID format (ObjectID format)
  if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
    return NextResponse.json({ error: "Invalid service ID" }, { status: 400 });
  }

  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Admin access only" },
        { status: 401 }
      );
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      {
        name,
        small_description,
        large_description,
        price,
        duration,
        isAvailable,
      },
      { new: true, runValidators: true } // Return the updated document and validate input
    );

    if (!updatedService) {
      return new Response(JSON.stringify({ error: "Service not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(updatedService), { status: 200 });
  } catch (err) {
    console.error("Error updating service:", err.message);
    return new Response(JSON.stringify({ error: "Failed to update service" }), {
      status: 500,
    });
  }
}
// Admin  DELETE api/dashboard/services/:id
export async function DELETE(req, { params }) {
  try {
    await connectToDatabase();
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
      return NextResponse.json(
        { error: "Unauthorized: Admin access only" },
        { status: 401 }
      );
    }

    const { id } = await params;

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
