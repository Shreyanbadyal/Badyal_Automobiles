import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ServiceRecord } from "@/models/serviceRecord";
import { User } from "@/models/User";
import { Car } from "@/models/Car";

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const {
            name,
            email,
            phone,
            age,
            address,
            brand,
            model,
            carNumber,
            reportedIssues,
            dateArrived, // optional: from frontend
        } = body;

        // 1️⃣ Find or create the user
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({ name, email, phone, age, address });
        }

        // 2️⃣ Find or create the car
        let car = await Car.findOne({ carNumber });
        if (!car) {
            car = await Car.create({ brand, model, carNumber, customer: user._id });
            user.cars.push(car._id);
            await user.save();
        }

        // 3️⃣ Create the service record
        const record = await ServiceRecord.create({
            customer: user._id,
            car: car._id,
            reportedIssues,
            dateArrived: dateArrived ? new Date(dateArrived) : new Date(),
            isInWorkshop: true,
        });

        return NextResponse.json(
            {
                message: "✅ Customer, Car, and Service Record created successfully",
                user,
                car,
                record,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("❌ Error creating service record:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const users = await User.find().populate("cars");
        return NextResponse.json(users, { status: 200 });
    } catch (error: any) {
        console.error("❌ Error fetching users:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
