import Link from "next/link"; // Import the Link component
import "@/app/styles/global.css";
import Button from "@/components/bookings/UI/Button";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center  min-h-screen">
      <div className="text-center">
        <Link href="/services">
          <Button
            children="Get Started"
            variant="success"
            size="large"
            className=" shadow-2xl shadow-slate-400  "
          />
        </Link>
      </div>
    </div>
  );
}
