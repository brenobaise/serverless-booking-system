"use client";
import React, { useState } from "react";
import Button from "@/components/UI/Button";

export default function FetchBookingsByEmail() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
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

    console.log(bookings);
  };
  return (
    <div className='p-6 h-[600px]'>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='Enter your email'
        className='border p-2 rounded mr-4'
      />
      <Button
        children='Fetch Bookings'
        onClick={fetchBookings}
        size='medium'
        variant='primary'
        className='transition ease-linear delay-150 hover:font-medium'
      />

      {error && <p className='text-red-500 mt-4'>{error}</p>}

      {bookings.length > 0 && (
        <ul className='mt-6 space-y-4'>
          {bookings.map((booking) => (
            <li key={booking._id} className='border p-4 rounded shadow'>
              <p className='text-md font-bold '>
                Booked Service: {booking.serviceName}
              </p>
              <p>
                <strong>Date:</strong> {booking.slot_time} -{" "}
                {new Date(booking.slot_date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>

              <p className='text-md font-bold '>
                Total Price: ${booking.total_price}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
