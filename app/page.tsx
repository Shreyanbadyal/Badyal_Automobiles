"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import Card from "@/components/Card";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <Card className="text-center p-10 rounded-2xl w-[90%] sm:w-[450px] shadow-lg border border-gray-700">
        <h1 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
          Badyal Automobiles
        </h1>

        <p className="text-gray-300 mb-10 text-lg font-medium">
          Manage Customers, Cars & Workshop Records
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <Button text="➕ Add Customer" color="blue" onClick={() => router.push("/add-customer")} />
          <Button text="👥 View Customers" color="green" onClick={() => router.push("/customers")} />
          <Button text="🚗 Cars in Workshop" color="yellow" onClick={() => router.push("/workshop")} />
        </div>
      </Card>

      <footer className="mt-10 text-sm text-gray-500">
        © {new Date().getFullYear()} | Built with ❤️ using Next.js + MongoDB
      </footer>
    </div>
  );
}
