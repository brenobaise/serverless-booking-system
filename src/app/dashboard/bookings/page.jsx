// DashboardBookingPage.jsx
"use client";
import BookingList from "@/components/bookings/BookingList";
import Dialog from "@/components/bookings/UI/Dialog";
import { useState, useEffect } from "react";
import axios from "axios";

export default function DashboardBookingPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/bookings");
        setBookings(response.data);
      } catch (err) {
        setError("Failed to fetch bookings.");
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading)
    return <p className="text-center text-gray-500">Loading bookings...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-row">
      {console.log(bookings)}
      <Dialog>
        <div className="flex flex-col justify-center items-center">
          <BookingList bookings={bookings} />
        </div>
      </Dialog>
    </div>
  );
}
