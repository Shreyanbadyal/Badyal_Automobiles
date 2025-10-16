import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Car } from "@/models/Car";
import { User } from "@/models/User";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { brand, model, carNumber, customerId } = await req.json();

        const car = await Car.create({ brand, model, carNumber, customer: customerId });
        const user = await User.findById(customerId);
        if (user) {
            user.cars.push(car._id);
            await user.save();
        }

        return NextResponse.json({ message: "Car added successfully", car });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const customerId = searchParams.get("customerId");

    const query: any = {};
    if (customerId) query.customer = customerId;

    const cars = await Car.find(query).populate("customer", "name email phone");
    return NextResponse.json(cars);
}
