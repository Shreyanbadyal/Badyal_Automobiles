import { Schema, model, models, Types } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    phone: string;
    age: number;
    address?: string;
    cars: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        age: { type: Number, required: true },
        address: { type: String },
        cars: [{ type: Schema.Types.ObjectId, ref: "Car" }],
    },
    { timestamps: true }
);

export const User = models.User || model<IUser>("User", UserSchema);
