import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

// Caching the connection to avoid multiple connections in serverless environments
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  if (cached.conn) {
    // If there’s an existing connection, return it
    return cached.conn;
  }

  if (!cached.promise) {
    // If no connection exists, create one
    try {
      const options = {
        bufferCommands: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

      cached.promise = mongoose
        .connect(MONGODB_URI, options)
        .then((mongoose) => mongoose);
    } catch (error) {
      console.error("MongoDB connection error:", error.message);
      throw new Error("Failed to connect to MongoDB");
    }
  }

  try {
    // Wait for the connection to be established
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null; // Reset the promise to allow retries
    console.error("MongoDB connection failed:", error.message);
    throw new Error("Failed to connect to MongoDB");
  }

  return cached.conn;
}

export default connectToDatabase;
