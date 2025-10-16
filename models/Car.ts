import { Schema, model, models, Types } from "mongoose";

export interface ICar {
    brand: string;
    model: string;
    carNumber: string;
    customer: Types.ObjectId;
}

const CarSchema = new Schema<ICar>(
    {
        brand: { type: String, required: true },
        model: { type: String, required: true },
        carNumber: { type: String, required: true, unique: true },
        customer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
    { timestamps: true }
);

export const Car = models.Car || model<ICar>("Car", CarSchema);
