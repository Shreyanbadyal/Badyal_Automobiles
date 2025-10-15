"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleAddUser = () => {
    router.push("/add-user");
  };

  const handleSeeUsers = () => {
    router.push("/all-users");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <div className="text-center p-10 rounded-2xl bg-gray-900/60 backdrop-blur-md shadow-2xl border border-gray-700 w-[90%] sm:w-[450px] transition-all duration-300">

        <h1 className="text-4xl font-extrabold mb-3 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
          User Management App
        </h1>

        <p className="text-gray-300 mb-10 text-lg font-medium">
          Choose what you’d like to do
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5">
          <button
            onClick={handleAddUser}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-200"
          >
            ➕ Add a User
          </button>

          <button
            onClick={handleSeeUsers}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md transform hover:scale-105 transition-all duration-200"
          >
            👀 See All Users
          </button>
        </div>
      </div>

      <footer className="mt-10 text-sm text-gray-500">
        © {new Date().getFullYear()} | Built with ❤️ using Next.js + MongoDB
      </footer>
    </div>
  );
}
