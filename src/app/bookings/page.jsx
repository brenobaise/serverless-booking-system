"use client";
import React, { useState } from "react";

export default function FetchBookings() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`/api/bookings/${email}`);
      if (!response.ok) {
        throw new Error(
          (await response.json().error) || "Failed to fetch bookings."
        );
      }
      const data = await response.json();
      setBookings(data);
      setError(null); // Clear previous errors
    } catch (err) {
      setError(err.message);
      setBookings([]); // Clear previous data
    }
  };

  return (
    <div className="p-6">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="border p-2 rounded mr-4"
      />
      <button
        onClick={fetchBookings}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Fetch Bookings
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {bookings.length > 0 && (
        <ul className="mt-6 space-y-4">
          {bookings.map((booking) => (
            <li key={booking._id} className="border p-4 rounded shadow">
              <p>
                <strong>Service:</strong>{" "}
                {booking.Service_id?.name || "Unknown"}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(booking.slot_date).toLocaleDateString()}
              </p>
              <p>
                <strong>Total Price:</strong> ${booking.total_price}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
