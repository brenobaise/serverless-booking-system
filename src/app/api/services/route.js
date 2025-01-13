import connectToDatabase from "@/lib/mongoose";
import Service from "@/app/models/Service";
import e, { json } from "express";

export async function GET(req) {
  await connectToDatabase();

  const services = await Service.find({ isAvailable: true });
  return new Response(JSON.stringify(services), { status: 200 });
}

export async function POST(req) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const newService = await Service.create(body);
    return new Response(JSON.stringify(newService), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
