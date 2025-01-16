"use client";
import Sidebar from "@/components/Sidebar";
import StatsCard from "@/components/StatsCard";
import Table from "@/components/Table";

export default function DashboardPage() {
  return (
    <div className="space-y-6 ">
      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard title="Total Services" value="25" />
        <StatsCard title="Total Bookings" value="134" />
        <StatsCard title="New Users" value="12" />
        <StatsCard title="Revenue" value="$4,560" />
      </div>

      {/* Table Section */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
        <Table />
      </div>
    </div>
  );
}
