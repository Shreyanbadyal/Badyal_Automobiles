"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Card from "@/components/Card";

interface Record {
    _id: string;
    car: { brand: string; model: string; carNumber: string };
    customer: { name: string; phone: string };
    dateArrived: string;
    reportedIssues: string;
}

export default function WorkshopPage() {
    const [records, setRecords] = useState<Record[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await fetch("/api/services?inWorkshop=true");
                const data = await res.json();
                setRecords(data);
            } catch (error) {
                console.error("Error fetching workshop cars:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

    if (loading)
        return <div className="text-center text-gray-300 py-20">Loading cars...</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
            <h2 className="text-4xl font-bold text-center mb-8 underline text-yellow-400">
                Cars Currently in Workshop
            </h2>

            {records.length === 0 ? (
                <p className="text-center text-gray-400">No cars in the workshop right now.</p>
            ) : (
                <div className="grid gap-4 max-w-4xl mx-auto">
                    {records.map((r) => (
                        <Card
                            key={r._id}
                            className="p-4 border border-yellow-500 hover:bg-gray-800 transition"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-semibold text-yellow-300">
                                        {r.car.carNumber}
                                    </h3>
                                    <p className="text-gray-400">
                                        {r.car.brand} {r.car.model}
                                    </p>
                                    <p className="text-gray-500 text-sm">
                                        Customer: {r.customer.name} ({r.customer.phone})
                                    </p>
                                </div>
                                <Button
                                    text="🔍 View Details"
                                    color="green"
                                    onClick={() => router.push(`/workshop/${r._id}`)}
                                />
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            <div className="text-center mt-10">
                <Button text="⬅ Back to Home" color="blue" onClick={() => router.push("/")} />
            </div>
        </div>
    );
}
