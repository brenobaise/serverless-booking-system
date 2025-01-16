"use client";
import { useState } from "react";
import axios from "axios";

export default function BookingForm({ service }) {
  const [email, setEmail] = useState("");
  const [slotDate, setSlotDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const total_price = service.price;
      const response = await axios.post("/api/bookings", {
        user_email: email,
        slot_date: slotDate,
        Service_id: service._id,
        total_price,
      });
      if (response.status === 201) {
        setSuccess(true);
        setEmail("");
        setSlotDate("");
      }
    } catch (err) {
      setError("Failed to book the service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded shadow-md max-w-md bg-white w-full sm:w-96">
      <h2 className="text-xl font-bold mb-4">Book {service.name}</h2>
      {success && <p className="text-green-600 mb-4">Booking successful!</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleBooking} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email" className="block font-medium">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label htmlFor="slotDate" className="block font-medium">
            Booking Date
          </label>
          <input
            type="date"
            id="slotDate"
            value={slotDate}
            onChange={(e) => setSlotDate(e.target.value)}
            required
            className="w-full border rounded p-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white rounded p-2 hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Booking..." : "Book Now"}
        </button>
      </form>
    </div>
  );
}
