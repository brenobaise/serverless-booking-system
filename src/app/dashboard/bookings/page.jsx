"use client";
import BookingList from "@/components/bookings/BookingList";
import Dialog from "@/components/UI/Dialog";
import { useState, useEffect } from "react";
import axios from "axios";
import DashboardBookingSearch from "@/components/bookings/DashboardBookingSearch";

export default function DashboardBookingPage() {
  const [allBookings, setAllBookings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/bookings");
      setAllBookings(response.data);
      setBookings(response.data);
    } catch (err) {
      setError("Failed to fetch bookings.");
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleEdit = async (updatedBooking) => {
    try {
      const response = await axios.patch(
        `/api/bookings/${updatedBooking._id}`,
        updatedBooking
      );
      const updated = {
        ...response.data,
        serviceName: updatedBooking.serviceName,
      };

      setAllBookings((prev) =>
        prev.map((b) => (b._id === updated._id ? updated : b))
      );
      setBookings((prev) =>
        prev.map((b) => (b._id === updated._id ? updated : b))
      );
    } catch (err) {
      console.error("Failed to update booking:", err.message);
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`/api/bookings/${bookingId}`);
      setAllBookings((prev) => prev.filter((b) => b._id !== bookingId));
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (err) {
      console.error("Failed to delete booking:", err.message);
    }
  };

  const handleSearchResults = (results) => {
    if (results.length > 0) {
      setBookings(results);
    } else {
      setBookings(allBookings); // fallback if no matches
    }
  };

  if (loading)
    return <p className='text-center text-gray-500'>Loading bookings...</p>;
  if (error) return <p className='text-center text-red-500'>{error}</p>;

  return (
    <div className='flex flex-col  items-center justify-center'>
      <Dialog className='w-full'>
        <div className='flex justify-center items-center'>
          <DashboardBookingSearch onResults={handleSearchResults} />
        </div>

        <div className='flex flex-col justify-center items-center'>
          <BookingList
            bookings={bookings}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </Dialog>
    </div>
  );
}
