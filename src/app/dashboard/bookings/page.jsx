"use client";
import BookingList from "@/components/bookings/BookingList";
import Dialog from "@/components/UI/Dialog";
import { useState, useEffect } from "react";
import axios from "axios";
import DashboardBookingSearch from "@/components/bookings/DashboardBookingSearch";
import { useMemo } from "react";

export default function DashboardBookingPage() {
  const [allBookings, setAllBookings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("soonest"); // default to soonest

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
  const sortBookings = (bookingsToSort, order) => {
    return [...bookingsToSort].sort((a, b) => {
      const dateA = new Date(a.slot_date);
      const dateB = new Date(b.slot_date);

      const [hoursA, minutesA] = a.slot_time.split(":").map(Number);
      const [hoursB, minutesB] = b.slot_time.split(":").map(Number);

      dateA.setHours(hoursA, minutesA);
      dateB.setHours(hoursB, minutesB);
      console.log("Sorting", a.slot_date, a.slot_time, "=>", dateA);

      return order === "soonest" ? dateA - dateB : dateB - dateA;
    });
  };

  const sortedBookings = useMemo(() => {
    return sortBookings(bookings, sortOrder);
  }, [bookings, sortOrder]);

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
          {/* Sort Dropdown */}
          <div className='my-4'>
            <label className='mr-2 text-white font-bold'>Sort by:</label>
            <select
              className='border px-2 py-1 rounded'
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value='soonest'>Soonest First</option>
              <option value='latest'>Latest First</option>
            </select>
          </div>
          <BookingList
            bookings={sortedBookings}
            isAdmin={true}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </Dialog>
    </div>
  );
}
