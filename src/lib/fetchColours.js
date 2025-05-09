// lib/fetchColors.ts
import connectToDatabase from "@/lib/mongoose";
import StoreConfig from "@/app/models/StoreConfig";

export async function getBackgroundColoursFromDB() {
    await connectToDatabase();
    const config = await StoreConfig.findOne();
    return config ? config.toObject() : null;
}
