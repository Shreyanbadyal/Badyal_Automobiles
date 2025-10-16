import { Schema, model, models, Types } from "mongoose";

export interface IServiceRecord {
    car: Types.ObjectId;              // Which car came in
    customer: Types.ObjectId;         // Which customer owns it
    dateArrived: Date;                // When it arrived
    reportedIssues: string;           // Issues told by customer
    detectedIssues?: string;          // Issues found by mechanic
    partsReplaced?: string;           // List/description of parts added
    partsCost?: number;               // Total cost of parts
    totalCost?: number;               // Total cost to be paid by customer
    isInWorkshop: boolean;            // true = still in workshop
    dateDelivered?: Date;             // When car was handed back
}

const ServiceRecordSchema = new Schema<IServiceRecord>(
    {
        car: { type: Schema.Types.ObjectId, ref: "Car", required: true },
        customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
        dateArrived: { type: Date, required: true, default: () => new Date() },
        reportedIssues: { type: String, required: true },
        detectedIssues: String,
        partsReplaced: String,
        partsCost: Number,
        totalCost: Number,
        isInWorkshop: { type: Boolean, default: true },
        dateDelivered: Date,
    },
    { timestamps: true }
);

export const ServiceRecord =
    models.ServiceRecord || model<IServiceRecord>("ServiceRecord", ServiceRecordSchema);
