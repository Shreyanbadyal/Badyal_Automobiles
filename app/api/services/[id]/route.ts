import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ServiceRecord } from "@/models/serviceRecord";

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();
        const data = await req.json();
        const { detectedIssues, partsReplaced, totalCost, isInWorkshop } = data;

        const update: any = {
            detectedIssues,
            partsReplaced,
            totalCost,
            isInWorkshop,
        };

        // If car delivered, auto-assign handover date
        if (isInWorkshop === false) {
            update.dateDelivered = new Date();
        }

        const updatedRecord = await ServiceRecord.findByIdAndUpdate(
            params.id,
            update,
            { new: true }
        );

        if (!updatedRecord) {
            return NextResponse.json(
                { error: "Service record not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedRecord);
    } catch (error: any) {
        console.error("Error updating service:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
