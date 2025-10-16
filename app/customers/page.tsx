"use client";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Card from "@/components/Card";

interface Car {
    _id: string;
    brand: string;
    model: string;
    carNumber: string;
}

interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    age: number;
    cars: Car[];
}

export default function CustomersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [expanded, setExpanded] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/customers");
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                console.error("Error fetching customers:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen text-lg text-gray-300">
                Loading customers...
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12 px-4">
            <h2 className="text-4xl font-extrabold underline mb-10 tracking-wide">
                All Customers & Their Cars
            </h2>

            <div className="w-full max-w-5xl bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-700">
                {users.length === 0 ? (
                    <p className="text-center text-gray-400 py-10">No customers found.</p>
                ) : (
                    <table className="min-w-full text-sm text-gray-300">
                        <thead className="bg-gray-700 text-gray-200 uppercase text-sm">
                            <tr>
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Phone</th>
                                <th className="py-3 px-6 text-left">Age</th>
                                <th className="py-3 px-6 text-left">Cars</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <>
                                    <tr
                                        key={user._id}
                                        className="cursor-pointer hover:bg-gray-700 transition duration-200"
                                        onClick={() =>
                                            setExpanded(expanded === user._id ? null : user._id)
                                        }
                                    >
                                        <td className="py-3 px-6 font-medium text-white flex justify-between items-center">
                                            {user.name}
                                            <span className="text-gray-400">
                                                {expanded === user._id ? "▲" : "▼"}
                                            </span>
                                        </td>
                                        <td className="py-3 px-6">{user.email}</td>
                                        <td className="py-3 px-6">{user.phone}</td>
                                        <td className="py-3 px-6">{user.age}</td>
                                        <td className="py-3 px-6">
                                            {user.cars.length} {user.cars.length === 1 ? "car" : "cars"}
                                        </td>
                                    </tr>

                                    {expanded === user._id && (
                                        <tr>
                                            <td colSpan={5} className="bg-gray-800">
                                                <div className="p-4 border-t border-gray-700">
                                                    {user.cars.map((car) => (
                                                        <div
                                                            key={car._id}
                                                            className="p-3 bg-gray-900 rounded-lg mb-2 border border-gray-700"
                                                        >
                                                            <h4 className="text-blue-400 font-semibold">
                                                                {car.brand} {car.model}
                                                            </h4>
                                                            <p className="text-sm text-gray-400">
                                                                Car No: {car.carNumber}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <div className="mt-10">
                <Button
                    text="⬅ Back to Home"
                    color="blue"
                    onClick={() => (window.location.href = "/")}
                />
            </div>
        </div>
    );
}
