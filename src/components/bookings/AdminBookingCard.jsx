"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../UI/Button";
import DatePicker from "react-datepicker";
import { isSameDay } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

export default function AdminBookingCard({ booking, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBooking, setEditedBooking] = useState({ ...booking });
  // track slotDate as a Date object
  const [slotDate, setSlotDate] = useState(
    booking.slot_date ? new Date(booking.slot_date) : new Date()
  );
  const [availableSlots, setAvailableSlots] = useState([]);
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Fetch disabled dates when entering edit mode
  useEffect(() => {
    if (isEditing) {
      fetchDisabledDates();
      fetchSlotsForDate(slotDate);
    }
  }, [isEditing]);

  // Whenever slotDate changes, push it into editedBooking and reload slots
  useEffect(() => {
    if (isEditing) {
      setEditedBooking((prev) => ({
        ...prev,
        slot_date: slotDate.toISOString(),
      }));
      fetchSlotsForDate(slotDate);
    }
  }, [slotDate]);

  async function fetchDisabledDates() {
    const today = new Date().toISOString().slice(0, 10);
    const daysToCheck = 30;

    try {
      const res = await axios.get(
        `/api/bookings/disabled-dates?start=${today}&days=${daysToCheck}`
      );
      // convert each "YYYY‑MM‑DD" back into a Date object
      const disabled = res.data.disabledDates.map((d) => new Date(d));
      setUnavailableDates(disabled);
    } catch (err) {
      console.error("Failed to load disabled dates:", err);
      setUnavailableDates([]);
    }
  }

  async function fetchSlotsForDate(dateObj) {
    setLoadingSlots(true);
    try {
      const dateStr = dateObj.toISOString().split("T")[0];
      const res = await axios.get(
        `/api/bookings/available-slots?date=${dateStr}`
      );
      setAvailableSlots(res.data.availableSlots);
    } catch (err) {
      console.error("Error fetching slots:", err);
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  }

  const handleSave = () => {
    onEdit(editedBooking);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    if (confirm("Are you sure you want to delete this booking?")) {
      onDelete(booking._id);
    }
  };

  return (
    <div className='border p-4 rounded-lg shadow-md w-full max-w-2xl mx-auto bg-white'>
      {isEditing ? (
        <div className='space-y-4'>
          {/* Email */}
          <div>
            <label className='block text-md p-2 font-semibold text-center'>
              User Email
            </label>
            <p className='border p-2 rounded bg-gray-100 text-gray-600 text-center'>
              {editedBooking.user_email}
            </p>
          </div>

          {/* DatePicker */}
          <div>
            <label className='block text-md font-semibold p-2 text-center'>
              Slot Date
            </label>
            <DatePicker
              selected={slotDate}
              onChange={(date) => setSlotDate(date)}
              minDate={new Date()}
              filterDate={(date) =>
                !unavailableDates.some((d) => isSameDay(d, date))
              }
              placeholderText='Select a booking date'
              dateFormat='yyyy-MM-dd'
              className='w-full border p-2 rounded text-center'
            />
          </div>

          {/* Time slots */}
          <div>
            <label className='block text-md font-semibold p-2 text-center'>
              Slot Time
            </label>
            <select
              name='slot_time'
              value={editedBooking.slot_time || ""}
              onChange={(e) =>
                setEditedBooking((prev) => ({
                  ...prev,
                  slot_time: e.target.value,
                }))
              }
              className='w-full border p-2 rounded text-center'
            >
              <option value=''>Select a time</option>
              {loadingSlots ? (
                <option disabled>Loading slots...</option>
              ) : availableSlots.length > 0 ? (
                availableSlots
                  .filter((slot) => slot.available)
                  .map((slot) => (
                    <option key={slot.time} value={slot.time}>
                      {slot.time}
                    </option>
                  ))
              ) : (
                <option disabled>No slots available</option>
              )}
            </select>
          </div>

          {/* Actions */}
          <div className='flex gap-4 justify-end'>
            <Button onClick={handleSave} variant='success'>
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </div>
        </div>
      ) : (
        <>
          <h3 className='text-md font-semibold text-center '>
            Service - {booking.serviceName}
          </h3>
          <div className='flex flex-col p-4 justify-evenly'>
            <p className='text-sm font-semibold text-gray-500 text-center p-2'>
              {booking.user_email}
            </p>
            <p className='text-sm mt-2 text-black font-bold text-center p-1'>
              {booking.slot_time}{" "}
              {new Date(booking.slot_date).toLocaleDateString("en-GB")}
            </p>

            <p className='text-sm text-center'>Price: £{booking.total_price}</p>
            <div className='flex justify-between mt-4'>
              <Button
                onClick={() => setIsEditing(true)}
                className='bg-blue-500'
              >
                Edit
              </Button>
              <Button onClick={handleDeleteClick} variant='danger'>
                Delete
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
