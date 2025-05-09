import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongoose";
import StoreConfig from "@/app/models/StoreConfig";

export async function GET() {
    try {
        await connectToDatabase();

        const config = await StoreConfig.findOne();
        const backgroundColors = config?.background_colors || new Map();

        return NextResponse.json(
            { background_colors: Object.fromEntries(backgroundColors) },
            { status: 200 }
        );
    } catch (err) {
        console.error("GET background colours error:", err.message);
        return NextResponse.json(
            { error: "Failed to fetch background colours" },
            { status: 500 }
        );
    }
}

export async function PATCH(req) {
    try {
        const body = await req.json();
        const updates = body.background_colors;

        if (!updates || typeof updates !== "object") {
            return NextResponse.json(
                { error: "Invalid or missing 'background_colors' object" },
                { status: 400 }
            );
        }

        await connectToDatabase();
        let config = await StoreConfig.findOne();
        if (!config) config = await StoreConfig.create({});

        Object.entries(updates).forEach(([key, value]) => {
            if (typeof value === "string" && value.startsWith("#")) {
                config.background_colors.set(key, value);
            }
        });

        await config.save();

        return NextResponse.json(
            { message: "Background colours updated successfully" },
            { status: 200 }
        );
    } catch (err) {
        console.error("PATCH background colours error:", err.message);
        return NextResponse.json(
            { error: "Failed to update background colours" },
            { status: 500 }
        );
    }
}
