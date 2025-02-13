"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@/components/bookings/UI/Button";

export default function WorkingHoursAdmin() {
  const defaultHours = {
    Monday: { start: "08:00", end: "16:00", isClosed: false },
    Tuesday: { start: "08:00", end: "16:00", isClosed: false },
    Wednesday: { start: "08:00", end: "16:00", isClosed: false },
    Thursday: { start: "08:00", end: "16:00", isClosed: false },
    Friday: { start: "08:00", end: "16:00", isClosed: false },
    Saturday: { start: "10:00", end: "14:00", isClosed: false },
    Sunday: { start: "--:--", end: "--:--", isClosed: true },
  };

  const [workingHours, setWorkingHours] = useState(defaultHours);
  const [maxBookings, setMaxBookings] = useState(2);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchWorkingHours();
  }, []);

  async function fetchWorkingHours() {
    try {
      const res = await axios.get("/api/dashboard/storeconfig");
      const data = res.data.data;

      if (data) {
        // Normalize the data before setting state
        setWorkingHours(normalizeOpenTimes(data.open_times || defaultHours));
        setMaxBookings(data.max_booking_per_slot || 2);
      }
    } catch (error) {
      console.error("Failed to fetch working hours:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      open_times: workingHours,
      max_booking_per_slot: maxBookings,
    };


    try {
      await axios.put("/api/dashboard/storeconfig", payload);
      setMessage("Working hours updated successfully!");
      fetchWorkingHours();
    } catch (error) {
      console.error("❌ Error Updating Working Hours:", error.response?.data || error.message);
      setMessage("Failed to update working hours");
    } finally {
      setLoading(false);
    }
  }

  function handleTimeChange(day, field, value) {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value || "" }, // ✅ Prevents undefined values
    }));
  }

  function toggleClosed(day) {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isClosed: !prev[day].isClosed,
        start: !prev[day].isClosed ? "--:--" : "08:00", // Default open time
        end: !prev[day].isClosed ? "--:--" : "16:00", // Default close time
      },
    }));
  }

  function normalizeOpenTimes(openTimes) {
    const normalized = { ...openTimes };
    for (const day in normalized) {
      if (normalized[day].isClosed) {
        normalized[day].start = "--:--";
        normalized[day].end = "--:--";
      }
    }
    return normalized;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Set Working Hours</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(workingHours).map((day) => (
          <div key={day} className="flex items-center space-x-4">
            <span className="w-20">{day}</span>
            <input
              type="time"
              value={workingHours[day].start || ""}
              disabled={workingHours[day].isClosed}
              onChange={(e) => handleTimeChange(day, "start", e.target.value)}
              className="border p-2"
            />
            <input
              type="time"
              value={workingHours[day].end || ""}
              disabled={workingHours[day].isClosed}
              onChange={(e) => handleTimeChange(day, "end", e.target.value)}
              className="border p-2"
            />
            <input
              type="checkbox"
              checked={workingHours[day].isClosed}
              onChange={() => toggleClosed(day)}
            />
            <span>Closed</span>
          </div>
        ))}

        <div>
          <label className="block">Max Bookings per Slot:</label>
          <input
            type="number"
            value={maxBookings}
            onChange={(e) => setMaxBookings(parseInt(e.target.value) || 1)}
            className="border p-2 w-20"
          />
        </div>

        <Button type="submit" variant="primary" size="medium" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>


        {message && <p className="text-green-500 mt-2">{message}</p>}
      </form>
    </div>
  );
}
