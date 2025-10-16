import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { ServiceRecord } from "@/models/serviceRecord";

export async function PATCH(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        // ✅ await the params since Next.js 15 passes them as a Promise
        const { id } = await context.params;
        const data = await request.json();

        const { detectedIssues, partsReplaced, totalCost, isInWorkshop } = data;

        const update: any = {
            detectedIssues,
            partsReplaced,
            totalCost,
            isInWorkshop,
        };

        // Automatically add delivery date if car is handed over
        if (isInWorkshop === false) {
            update.dateDelivered = new Date();
        }

        const updatedRecord = await ServiceRecord.findByIdAndUpdate(id, update, {
            new: true,
        });

        if (!updatedRecord) {
            return NextResponse.json(
                { error: "Service record not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedRecord);
    } catch (error: any) {
        console.error("❌ Error updating service record:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
