import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/User";
import { Car } from "@/models/Car";
import { ServiceRecord } from "@/models/serviceRecord";

export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const {
            name, email, phone, age, address,
            brand, model, carNumber,
            reportedIssues
        } = body;

        let user = await User.findOne({ email });
        if (!user) user = await User.create({ name, email, phone, age, address });

        let car = await Car.findOne({ carNumber });
        if (!car) {
            car = await Car.create({ brand, model, carNumber, customer: user._id });
            user.cars.push(car._id);
            await user.save();
        }

        const record = await ServiceRecord.create({
            customer: user._id,
            car: car._id,
            reportedIssues,
            isInWorkshop: true,
        });

        return NextResponse.json(
            { message: "Service record created successfully", record },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error creating service record:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const isInWorkshop = searchParams.get("inWorkshop");

    const query: any = {};
    if (isInWorkshop !== null) query.isInWorkshop = isInWorkshop === "true";

    const records = await ServiceRecord.find(query)
        .populate("customer", "name phone email")
        .populate("car", "brand model carNumber")
        .sort({ createdAt: -1 });

    return NextResponse.json(records);
}
