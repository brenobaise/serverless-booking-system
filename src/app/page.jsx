import Link from "next/link"; // Import the Link component
import "@/app/styles/global.css";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <Link href="/services">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
