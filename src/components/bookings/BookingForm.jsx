"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../UI/Button";
import ConfirmationDialog from "./ConfirmationDialog";

export default function BookingForm({ service, unique_code }) {
  const [email, setEmail] = useState("");
  const [slotDate, setSlotDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    if (slotDate) {
      fetchAvailableSlots(slotDate);
    }
  }, [slotDate]);

  async function fetchAvailableSlots(date) {
    try {
      const response = await axios.get(
        `/api/bookings/available-slots?date=${date}`
      );
      setAvailableSlots(response.data.availableSlots);
    } catch (error) {
      console.error(
        "Error fetching slots:",
        error.response?.data || error.message
      );
      setAvailableSlots([]);
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !slotDate || !selectedTime) {
      setError("All fields are required.");
      return;
    }

    setShowConfirmDialog(true); // show the dialog now
  };

  const confirmBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Ensure all required fields are filled
    if (!email || !slotDate || !selectedTime) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const total_price = service.price;
      const response = await axios.post("/api/bookings", {
        user_email: email,
        slot_date: slotDate,
        slot_time: selectedTime,
        Service_id: service._id,
        total_price,
        unique_code: unique_code,
      });

      if (response.status === 201) {
        setSuccess(true);
        setEmail("");
        setSlotDate("");
        setSelectedTime("");
        setAvailableSlots([]);
      }

      // close the dialog
      setShowConfirmDialog(false);
    } catch (err) {
      console.error("Booking Error:", err.response?.data || err.message);
      setError("Failed to book the service. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='border p-4 rounded shadow-md max-w-md bg-white w-full sm:w-96'>
      <h2 className='text-xl font-bold mb-4'>Book {service.name}</h2>
      {success && <p className='text-green-600 mb-4'>Booking successful!</p>}
      {error && <p className='text-red-600 mb-4'>{error}</p>}

      <form onSubmit={handleFormSubmit} className='flex flex-col gap-4'>
        {/* Email Input Field */}
        <div>
          <label htmlFor='email' className='block font-medium'>
            Your Email
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full border rounded p-2'
          />
        </div>

        {/* Date Input */}
        <div>
          <label htmlFor='slotDate' className='block font-medium'>
            Booking Date
          </label>
          <input
            type='date'
            id='slotDate'
            value={slotDate}
            onChange={(e) => setSlotDate(e.target.value)}
            required
            className='w-full border rounded p-2'
          />
        </div>

        {/* Available Slots Dropdown */}
        <div>
          <label htmlFor='slotTime' className='block font-medium'>
            Select Time Slot
          </label>
          <select
            id='slotTime'
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            required
            className='w-full border rounded p-2'
          >
            <option value=''>Select a time</option>
            {availableSlots.length > 0 ? (
              availableSlots.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))
            ) : (
              <option disabled>No slots available</option>
            )}
          </select>
        </div>

        {/* Submit Button */}
        <Button type='submit' disabled={loading}>
          {loading ? "Booking..." : "Book Now"}
        </Button>
      </form>
      <ConfirmationDialog
        open={showConfirmDialog}
        onCancel={() => setShowConfirmDialog(false)}
        onConfirm={confirmBooking}
        loading={loading}
        data={{
          serviceName: service.name,
          price: service.price,
          email,
          date: slotDate,
          time: selectedTime,
        }}
        unique_code={unique_code}
      />
    </div>
  );
}
