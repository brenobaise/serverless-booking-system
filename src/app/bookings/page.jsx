"use client";
import React, { useState } from "react";
import Button from "@/components/UI/Button";
import axios from "axios";
export default function FetchBookingsByEmail() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  const isValidEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const fetchBookings = async () => {
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
            `No bookings where found under this email: ${email}`
        );
      }

      const data = await response.json();
      console.log(data);

      setBookings(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setBookings([]);
    }
  };

  const handleDelete = async (bookingId) => {
    try {
      await axios.delete(`/api/bookings/${bookingId}`);
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (err) {
      console.error("Failed to delete booking:", err.message);
    }
  };

  const handleCancelClick = (bookingId) => {
    const confirmed = confirm("Are you sure you want to delete this booking?");
    if (confirmed) {
      handleDelete(bookingId);
    }
  };

  return (
    <div className='p-6 min-h-[600px] max-w-3xl mx-auto'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4'>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
          className='border border-gray-300 p-2 rounded w-full sm:w-auto flex-1'
        />
        <Button
          children='Fetch Bookings'
          onClick={fetchBookings}
          size='medium'
          variant='primary'
          className='hover:font-semibold transition duration-200'
        />
      </div>

      {error && <p className='text-red-500 mt-4'>{error}</p>}

      {/* No bookings found message */}
      {bookings.length === 0 && !error && email && (
        <p className='text-gray-500 mt-6'>No bookings found for this email.</p>
      )}

      {bookings.length > 0 && (
        <div className=''>
          <ul className='mt-6 space-y-4'>
            {bookings.map((booking) => (
              <li
                key={booking._id}
                className='border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200 bg-white'
              >
                {/* Service Name */}
                <h3 className='text-lg font-semibold text-gray-800 mb-1'>
                  {booking.serviceName}
                </h3>
                {/* Date and Time */}
                <div className='text-sm text-gray-600 mb-2'>
                  <div className='flex flex-wrap gap-x-4 gap-y-1'>
                    <span>
                      <strong>Time:</strong> {booking.slot_time}
                    </span>
                    <span>
                      <strong>Date:</strong>{" "}
                      {new Date(booking.slot_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                <p className='text-md font-bold text-gray-900'>
                  Total Price: ${booking.total_price}
                </p>
                {/* Cancel Booking */}
                <div>
                  <Button
                    children='Cancel'
                    onClick={() => handleCancelClick(booking._id)}
                    className='bg-red-500 hover:bg-red-600 text-white px-3 py-1 mt-3 rounded'
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
