"use client";
import { useEffect, useState } from "react";

interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    age: number;
}

export default function AllUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/users");
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                console.error("Error fetching users:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading)
        return (
            <div className="flex justify-center items-center min-h-screen text-lg text-gray-300">
                Loading users...
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12 px-4">
            <h2 className="text-4xl font-extrabold underline mb-10 tracking-wide">
                All Users
            </h2>

            <div className="w-full max-w-5xl bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-700">
                {users.length === 0 ? (
                    <p className="text-center text-gray-400 py-10">No users found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-gray-300">
                            <thead className="bg-gray-700 text-gray-200 uppercase text-sm">
                                <tr>
                                    <th className="py-3 px-6 text-left">Name</th>
                                    <th className="py-3 px-6 text-left">Email</th>
                                    <th className="py-3 px-6 text-left">Phone</th>
                                    <th className="py-3 px-6 text-left">Age</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, idx) => (
                                    <tr
                                        key={user._id}
                                        className={`${idx % 2 === 0 ? "bg-gray-800" : "bg-gray-850"
                                            } hover:bg-gray-700 transition duration-200`}
                                    >
                                        <td className="py-3 px-6 font-medium text-white">
                                            {user.name}
                                        </td>
                                        <td className="py-3 px-6">{user.email}</td>
                                        <td className="py-3 px-6">{user.phone}</td>
                                        <td className="py-3 px-6">{user.age}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <button
                onClick={() => (window.location.href = "/")}
                className="mt-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-200"
            >
                ⬅ Back to Home
            </button>
        </div>
    );
}
