"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@/components/UI/Button";

export default function WorkingHoursAdmin() {
  const defaultHours = {
    Monday: { start: "08:00", end: "16:00", isClosed: false },
    Tuesday: { start: "08:00", end: "16:00", isClosed: false },
    Wednesday: { start: "08:00", end: "16:00", isClosed: false },
    Thursday: { start: "08:00", end: "16:00", isClosed: false },
    Friday: { start: "08:00", end: "16:00", isClosed: false },
    Saturday: { start: "10:00", end: "14:00", isClosed: false },
    Sunday: { start: "", end: "", isClosed: true },
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
        setWorkingHours(normaliseOpenTimes(data.open_times || defaultHours));
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
      setMessage("✅ Working hours updated successfully!");
      fetchWorkingHours();
    } catch (error) {
      console.error(
        "Error Updating Working Hours:",
        error.response?.data || error.message
      );
      setMessage("❌ Failed to update working hours.");
    } finally {
      setLoading(false);
    }
  }

  function handleTimeChange(day, field, value) {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], [field]: value || "" },
    }));
  }

  function toggleClosed(day) {
    setWorkingHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isClosed: !prev[day].isClosed,
        start: !prev[day].isClosed ? "" : "08:00",
        end: !prev[day].isClosed ? "" : "16:00",
      },
    }));
  }

  function normaliseOpenTimes(openTimes) {
    const normalised = { ...openTimes };
    for (const day in normalised) {
      if (normalised[day].isClosed) {
        normalised[day].start = "";
        normalised[day].end = "";
      }
    }
    return normalised;
  }

  return (
    <div className='flex flex-col items-center p-6'>
      <div className='w-full max-w-2xl bg-white shadow-lg rounded-2xl p-6 space-y-6'>
        <h2 className='text-xl font-bold text-center'>Set Working Hours</h2>

        <form onSubmit={handleSubmit} className='space-y-4'>
          {/* Days */}
          <div className='space-y-3'>
            {Object.keys(workingHours).map((day) => (
              <div
                key={day}
                className='grid grid-cols-5 gap-3 items-center text-sm'
              >
                <span className='font-medium'>{day}</span>

                <input
                  type='time'
                  value={workingHours[day].start || ""}
                  disabled={workingHours[day].isClosed}
                  onChange={(e) =>
                    handleTimeChange(day, "start", e.target.value)
                  }
                  className='border p-2 rounded-md text-center'
                />

                <input
                  type='time'
                  value={workingHours[day].end || ""}
                  disabled={workingHours[day].isClosed}
                  onChange={(e) => handleTimeChange(day, "end", e.target.value)}
                  className='border p-2 rounded-md text-center'
                />

                <div className='flex items-center justify-center col-span-2'>
                  <input
                    type='checkbox'
                    checked={workingHours[day].isClosed}
                    onChange={() => toggleClosed(day)}
                    className='mr-2'
                  />
                  <label className='text-gray-700'>Closed</label>
                </div>
              </div>
            ))}
          </div>

          {/* Max Bookings */}
          <div className='flex items-center gap-3'>
            <label className='text-sm font-medium'>
              Max Bookings per Slot:
            </label>
            <input
              type='number'
              value={maxBookings}
              min={1}
              onChange={(e) => setMaxBookings(parseInt(e.target.value) || 1)}
              className='border p-2 rounded-md w-20 text-center'
            />
          </div>

          {/* Save Button */}
          <div className='flex justify-center'>
            <Button
              type='submit'
              variant='primary'
              size='medium'
              disabled={loading}
              className='px-6 py-2 text-sm'
            >
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          {/* Message */}
          {message && (
            <p
              className={`text-sm text-center font-medium ${
                message.includes("successfully")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
