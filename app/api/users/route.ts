import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { name, email, phone, age } = await req.json();

        if (!name || !email || !phone || !age) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const newUser = new User({ name, email, phone, age });
        await newUser.save();

        return NextResponse.json({ message: "✅ User added successfully", user: newUser });
    } catch (error) {
        console.error("Error adding user:", error);
        return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
    }
}

export async function GET() {
    await connectDB();
    const users = await User.find();
    return NextResponse.json(users);
}
