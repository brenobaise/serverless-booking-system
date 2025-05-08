"use client";
import React, { useState } from "react";
import Button from "@/components/UI/Button";
import BookingList from "@/components/bookings/BookingList";

import axios from "axios";
import CancelDialog from "../../components/bookings/CancelDialog";

export default function FetchBookingsByEmail() {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const fetchBookings = async (event) => {
    if (event) event.preventDefault();
    if (!email || !isValidEmail(email)) {
      setError("Please enter a valid email address.");
      setBookings([]);
      return;
    }

    try {
      const response = await fetch(`/api/bookings/${email}`);
      if (!response.ok) {
        throw new Error(
          (await response.json().error) ||
            `No bookings were found under this email: ${email}`
        );
      }

      const data = await response.json();
      setBookings(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setBookings([]);
    }
  };

  const handleCancelClick = (booking) => {
    setBookingToCancel(booking);
    setShowConfirmDialog(true);
  };

  const handleDialogCancel = () => {
    setShowConfirmDialog(false);
    setBookingToCancel(null);
  };

  const handleDialogConfirm = async (userInputCode) => {
    if (!bookingToCancel) return;

    try {
      setLoading(true);
      const response = await axios.post("/api/bookings/cancel", {
        bookingId: bookingToCancel._id,
        userInputCode,
      });

      if (response.status === 200) {
        setBookings((prev) =>
          prev.filter((booking) => booking._id !== bookingToCancel._id)
        );
        setShowConfirmDialog(false);
        setBookingToCancel(null);
      } else {
        alert(response.data.error || "Failed to cancel booking");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex flex-col items-center w-full p-6'>
      {/* Search Bar Section - Top Centered */}
      <form
        onSubmit={fetchBookings}
        className='w-full max-w-xl flex flex-col sm:flex-row justify-center items-center gap-3 mb-6'
      >
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
          className='border border-gray-300 p-3 rounded-md w-72 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <Button
          children='Fetch Bookings'
          type='submit'
          size='medium'
          variant='primary'
          className='px-5 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition'
        />
      </form>

      {/* Error Message */}
      {error && <p className='text-red-500 text-sm mb-4'>{error}</p>}

      {/* No Bookings Found */}
      {bookings.length === 0 && !error && email && (
        <p className='text-gray-500 text-sm mt-10 text-center'>
          No bookings found for this email.
        </p>
      )}

      {/* Booking List */}
      {bookings.length > 0 && (
        <div className='w-full max-w-6xl px-4'>
          <BookingList
            bookings={bookings}
            isAdmin={false}
            onCancel={handleCancelClick}
          />

          <CancelDialog
            open={showConfirmDialog}
            onCancel={handleDialogCancel}
            onConfirm={handleDialogConfirm}
            loading={loading}
          />
        </div>
      )}
    </div>
  );
}
