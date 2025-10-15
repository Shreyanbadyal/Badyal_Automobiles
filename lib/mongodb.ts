
import mongoose from "mongoose";
import { use } from "react";
const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
    throw new Error("❌ Please define the MONGODB_URI environment variable inside .env.local");
}
// Global cache to avoid multiple connections during hot reloads
let cached = (global as any).mongoose;
if (!cached) {
    cached = (global as any).mongoose = { conn: null, promise: null };
}
export async function connectDB() {
    // Return existing connection if available
    if (cached.conn) return cached.conn;

    // Create connection promise if not already started
    if (!cached.promise) {
        try {
            cached.promise = mongoose.connect(MONGODB_URI, {
                dbName: "nextjs_app", // optional
                bufferCommands: false,
            });
        } catch (error) {
            console.error("❌ MongoDB connection failed:", error);
            throw error;
        }
    }
    try {
        cached.conn = await cached.promise;
        console.log("✅ MongoDB connected successfully");
        return cached.conn;
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        throw error;
    }
}
