import mongoose, { Schema, Document, models } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    age: number;
}

const UserSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        age: { type: Number, required: true },
    },
    { timestamps: true }
);

export const User = models.User || mongoose.model<IUser>("User", UserSchema);
