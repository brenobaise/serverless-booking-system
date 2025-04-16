"use client";
import React, { useState } from "react";
import Button from "@/components/UI/Button";
import axios from "axios";
import CancelDialog from "../../components/bookings/CancelDialog";

/**
 *  Fetch Bookings Component
 * @returns The component which renders the page.
 *
 */
export default function FetchBookingsByEmail() {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState(null); // stores booking data
  const [loading, setLoading] = useState(false);

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
      console.error("Cancellation error:", err.message);
      alert(err.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-6 max-w-3xl w-full mx-auto mt-10'>
      {/* Email Input and Fetch Button */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6'>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Enter your email'
          className='border border-gray-300 p-3 rounded-md w-full sm:w-auto flex-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
        <Button
          children='Fetch Bookings'
          onClick={fetchBookings}
          size='medium'
          variant='primary'
          className='px-5 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition'
        />
      </div>

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
        <>
          <div className='overflow-y-auto max-h-[600px] pr-2'>
            <ul className='space-y-4'>
              {bookings.map((booking) => (
                <li
                  key={booking._id}
                  className='border border-gray-200 p-5 rounded-xl shadow-sm hover:shadow-md bg-white transition'
                >
                  {/* Service Name */}
                  <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                    {booking.serviceName}
                  </h3>

                  {/* Date and Time Info */}
                  <div className='text-sm text-gray-700 mb-3'>
                    <div className='flex flex-wrap gap-4'>
                      <div>
                        <span className='font-medium'>Time:</span>{" "}
                        {booking.slot_time}
                      </div>
                      <div>
                        <span className='font-medium'>Date:</span>{" "}
                        {new Date(booking.slot_date).toLocaleDateString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <p className='text-md font-semibold text-gray-800 mb-3'>
                    Total Price: £{booking.total_price}
                  </p>

                  {/* Cancel Button */}
                  <div>
                    <Button
                      children='Cancel Booking'
                      onClick={() => handleCancelClick(booking)}
                      className='px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm transition'
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Cancel Dialog */}
          <CancelDialog
            open={showConfirmDialog}
            onCancel={handleDialogCancel}
            onConfirm={handleDialogConfirm}
            loading={loading}
          />
        </>
      )}
    </div>
  );
}
