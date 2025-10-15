"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUserPage() {
    const [form, setForm] = useState({ name: "", email: "", phone: "", age: "" });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: form.name,
                    email: form.email,
                    phone: form.phone,
                    age: Number(form.age),
                }),
            });

            const data = await res.json();

            if (res.ok) {
                alert("✅ User added successfully!");
                router.push("/"); // navigate back to home after success
            } else {
                alert("❌ Error: " + data.error);
            }
        } catch (error) {
            console.error("Error adding user:", error);
            alert("Something went wrong!");
        }
    };

    return (
        <div className="max-w-md mx-auto py-20">
            <h2 className="text-3xl font-bold text-center underline mb-8">
                Add New User
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={form.age}
                    onChange={handleChange}
                    className="border p-2 rounded"
                    required
                />

                <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 mt-4"
                >
                    Save User
                </button>
            </form>
        </div>
    );
}
