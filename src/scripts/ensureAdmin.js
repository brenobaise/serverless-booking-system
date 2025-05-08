import connectToDatabase from "../lib/mongoose";
import bcrypt from "bcrypt";
import Admin from "@/app/models/AdminSchema";

export async function ensureAdminAccount() {
    await connectToDatabase();

    const admin = await Admin.findOne({});
    if (!admin) {
        const email = "admin@example.com";
        const password = "changeme123";
        const hash = await bcrypt.hash(password, 10);

        await Admin.create({ email, passwordHash: hash });
        console.log(" account created:", email, password);
    }
}
