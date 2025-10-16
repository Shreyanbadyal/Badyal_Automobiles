"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function ServiceDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const [record, setRecord] = useState<any>(null);
    const [form, setForm] = useState({
        detectedIssues: "",
        partsReplaced: "",
        totalCost: "",
        isInWorkshop: true,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecord = async () => {
            try {
                const res = await fetch(`/api/services?inWorkshop=true`);
                const data = await res.json();
                const found = data.find((r: any) => r._id === id);
                if (found) {
                    setRecord(found);
                    setForm({
                        detectedIssues: found.detectedIssues || "",
                        partsReplaced: found.partsReplaced || "",
                        totalCost: found.totalCost || "",
                        isInWorkshop: found.isInWorkshop,
                    });
                }
            } catch (error) {
                console.error("Error fetching record:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecord();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/services/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    totalCost: Number(form.totalCost),
                }),
            });
            if (res.ok) {
                alert("✅ Service record updated successfully!");
                router.push("/workshop");
            } else {
                alert("❌ Failed to update record");
            }
        } catch (error) {
            console.error(error);
            alert("Error updating service record");
        }
    };

    if (loading)
        return <div className="text-center text-gray-300 py-20">Loading record...</div>;

    if (!record)
        return <div className="text-center text-gray-400 py-20">Record not found</div>;

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white px-4">
            <Card className="p-8 rounded-2xl w-full max-w-lg">
                <h2 className="text-3xl font-bold text-center mb-6 underline text-yellow-400">
                    Service Record: {record.car.carNumber}
                </h2>
                <p className="text-gray-400 text-sm mb-2">
                    {record.car.brand} {record.car.model} | {record.customer.name} ({record.customer.phone})
                </p>
                <p className="text-gray-500 text-sm mb-4">
                    Reported Issues: {record.reportedIssues}
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <textarea
                        name="detectedIssues"
                        placeholder="Issues detected by mechanic"
                        value={form.detectedIssues}
                        onChange={handleChange}
                        className="border p-2 rounded bg-gray-800 text-white h-20"
                    />
                    <textarea
                        name="partsReplaced"
                        placeholder="Parts replaced (with description)"
                        value={form.partsReplaced}
                        onChange={handleChange}
                        className="border p-2 rounded bg-gray-800 text-white h-20"
                    />
                    <input
                        name="totalCost"
                        type="number"
                        placeholder="Total Cost"
                        value={form.totalCost}
                        onChange={handleChange}
                        className="border p-2 rounded bg-gray-800 text-white"
                    />
                    <label className="flex items-center gap-2 text-sm text-gray-400">
                        <input
                            type="checkbox"
                            name="isInWorkshop"
                            checked={form.isInWorkshop}
                            onChange={handleChange}
                        />
                        Car still in workshop?
                    </label>

                    <Button text="💾 Save Changes" color="green" type="submit" />
                </form>

                <div className="text-center mt-6">
                    <Button text="⬅ Back" color="blue" onClick={() => router.push("/workshop")} />
                </div>
            </Card>
        </div>
    );
}
