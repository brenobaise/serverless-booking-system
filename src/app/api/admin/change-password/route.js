import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import Admin from "@/app/models/AdminSchema";
import connectToDatabase from "@/lib/mongoose";

export async function POST(req) {
    const { oldPassword, newPassword } = await req.json();
    await connectToDatabase();

    const admin = await Admin.findOne({});
    if (!admin) {
        return NextResponse.json({ error: "Admin account not found" }, { status: 404 });
    }

    const isValid = await bcrypt.compare(oldPassword, admin.passwordHash);
    if (!isValid) {
        return NextResponse.json({ error: "Old password is incorrect" }, { status: 401 });
    }

    const hash = await bcrypt.hash(newPassword, 10);
    admin.passwordHash = hash;
    await admin.save();

    return NextResponse.json({ message: "Password changed successfully" });
}
