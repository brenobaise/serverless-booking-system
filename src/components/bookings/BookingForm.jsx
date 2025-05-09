"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../UI/Button";
import ConfirmationDialog from "./ConfirmationDialog";
import DatePicker from "react-datepicker";
import { isSameDay } from "date-fns";
// app/layout.tsx or app/ClientLayout.tsx (whichever is client-side)

export default function BookingForm({ service, unique_code }) {
  const [email, setEmail] = useState("");
  const [slotDate, setSlotDate] = useState(new Date());
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // only one call — never loops internally
  async function fetchDisabledDates() {
    const today = new Date().toISOString().slice(0, 10);
    try {
      const res = await axios.get(
        `/api/bookings/disabled-dates?start=${today}&days=30`
      );
      setUnavailableDates(res.data.disabledDates.map((d) => new Date(d)));
    } catch (err) {
      console.error("Failed to load disabled dates:", err);
      setUnavailableDates([]);
    }
  }

  useEffect(() => {
    fetchDisabledDates();
  }, []);

  async function fetchAvailableSlots(date) {
    try {
      const res = await axios.get(`/api/bookings/available-slots?date=${date}`);
      setAvailableSlots(res.data.availableSlots);
    } catch (err) {
      console.error("Error fetching slots:", err.response?.data || err);
      setAvailableSlots([]);
    }
  }

  useEffect(() => {
    const fmt = slotDate.toISOString().slice(0, 10);
    fetchAvailableSlots(fmt);
  }, [slotDate]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!email || !slotDate || !selectedTime) {
      setError("All fields are required.");
      return;
    }
    setShowConfirmDialog(true);
  };

  const confirmBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/bookings", {
        user_email: email,
        slot_date: slotDate.toISOString().slice(0, 10),
        slot_time: selectedTime,
        Service_id: service._id,
        total_price: service.price,
        unique_code,
      });
      if (res.status === 201) {
        setSuccess(true);
        setEmail("");
        setSlotDate(new Date());
        setSelectedTime("");
      }
      setShowConfirmDialog(false);
    } catch (err) {
      console.error("Booking Error:", err.response?.data || err);
      setError("Failed to book. Please try again.");
    } finally {
      setLoading(false);
      // if you want to re‐reload disabledDates after a booking succeeds,
      // you can call fetchDisabledDates() here once.
    }
  };

  return (
    <div className='border p-4 rounded shadow-md bg-white w-full'>
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
          <DatePicker
            selected={slotDate}
            onChange={(date) => setSlotDate(date)}
            minDate={new Date()}
            filterDate={(date) => {
              return !unavailableDates.some((d) => isSameDay(d, date));
            }}
            placeholderText='Select a booking date'
            dateFormat='yyyy-MM-dd'
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
              availableSlots
                .filter((slot) => slot.available) // Only show available ones
                .map(({ time }) => (
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
          date: slotDate.toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          time: selectedTime,
        }}
        unique_code={unique_code}
      />
    </div>
  );
}
