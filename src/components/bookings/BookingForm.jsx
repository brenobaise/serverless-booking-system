"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../UI/Button";
import ConfirmationDialog from "./ConfirmationDialog";
import DatePicker from "react-datepicker";
import { isSameDay } from "date-fns";

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
    <div className='border p-4 rounded shadow-md max-w-md bg-white w-full sm:w-96'>
      {/* ... same JSX as before for email, datepicker, select, button, dialog */}
    </div>
  );
}
