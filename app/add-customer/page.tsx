"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function AddCustomerPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        age: "",
        address: "",
        brand: "",
        model: "",
        carNumber: "",
        reportedIssues: "",
        dateArrived: new Date().toISOString().slice(0, 16), // default to current date/time
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/customers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    age: Number(form.age),
                    address: form.address,
                    brand: form.brand,
                    model: form.model,
                    carNumber: form.carNumber,
                    reportedIssues: form.reportedIssues,
                    dateArrived: new Date(form.dateArrived),
                }),
            });

            const data = await res.json();

            if (res.ok) {
                alert("✅ Customer, Car, and Service record created successfully!");
                router.push("/services");
            } else {
                alert("❌ Error: " + data.error);
            }
        } catch (error) {
            console.error("Error adding customer:", error);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-4">
            <Card className="p-8 rounded-2xl w-full max-w-2xl shadow-xl border border-gray-700">
                <h2 className="text-3xl font-bold text-center mb-8 underline text-green-400">
                    New Customer Visit
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* CUSTOMER INFO */}
                    <h3 className="text-lg font-semibold text-blue-400 border-b border-gray-700 pb-1">
                        Customer Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                            name="name"
                            placeholder="Full Name"
                            value={form.name}
                            onChange={handleChange}
                            className="border p-2 rounded bg-gray-800 text-white"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="border p-2 rounded bg-gray-800 text-white"
                            required
                        />
                        <input
                            name="phone"
                            placeholder="Phone Number"
                            value={form.phone}
                            onChange={handleChange}
                            className="border p-2 rounded bg-gray-800 text-white"
                            required
                        />
                        <input
                            name="age"
                            type="number"
                            placeholder="Age"
                            value={form.age}
                            onChange={handleChange}
                            className="border p-2 rounded bg-gray-800 text-white"
                        />
                    </div>
                    <input
                        name="address"
                        placeholder="Address"
                        value={form.address}
                        onChange={handleChange}
                        className="border p-2 rounded bg-gray-800 text-white"
                    />

                    {/* CAR INFO */}
                    <h3 className="text-lg font-semibold text-yellow-400 border-b border-gray-700 pb-1 mt-6">
                        Car Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                            name="brand"
                            placeholder="Car Brand"
                            value={form.brand}
                            onChange={handleChange}
                            className="border p-2 rounded bg-gray-800 text-white"
                            required
                        />
                        <input
                            name="model"
                            placeholder="Car Model"
                            value={form.model}
                            onChange={handleChange}
                            className="border p-2 rounded bg-gray-800 text-white"
                            required
                        />
                        <input
                            name="carNumber"
                            placeholder="Car Number (e.g. MH12AB1234)"
                            value={form.carNumber}
                            onChange={handleChange}
                            className="border p-2 rounded bg-gray-800 text-white col-span-2"
                            required
                        />
                    </div>

                    {/* SERVICE INFO */}
                    <h3 className="text-lg font-semibold text-green-400 border-b border-gray-700 pb-1 mt-6">
                        Service Visit Details
                    </h3>
                    <textarea
                        name="reportedIssues"
                        placeholder="Reported issues by customer"
                        value={form.reportedIssues}
                        onChange={handleChange}
                        className="border p-2 rounded bg-gray-800 text-white h-24"
                        required
                    />

                    <label className="text-sm text-gray-400 mt-2">
                        Date & Time of Arrival:
                    </label>
                    <input
                        type="datetime-local"
                        name="dateArrived"
                        value={form.dateArrived}
                        onChange={handleChange}
                        className="border p-2 rounded bg-gray-800 text-white w-full"
                        required
                    />

                    {/* ACTION BUTTONS */}
                    <div className="flex justify-center mt-6 gap-4">
                        <Button
                            text={loading ? "Saving..." : "Save Record"}
                            color="green"
                            type="submit"
                        />
                        <Button
                            text="⬅ Back to Home"
                            color="blue"
                            onClick={() => router.push("/")}
                        />
                    </div>
                </form>
            </Card>
        </div>
    );
}
