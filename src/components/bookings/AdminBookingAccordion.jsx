// AdminBookingAccordion.jsx
"use client";
import { useState, useEffect } from "react";
import Button from "../UI/Button";
import DatePicker from "react-datepicker";
import axios from "axios";
import { isSameDay } from "date-fns";
export default function AdminBookingAccordion({ booking, onEdit, onDelete }) {
  const [isOpen, setIsOpen] = useState(false);
  const date = new Date(booking.slot_date);
  const formattedDate = date.toLocaleDateString("en-GB"); // 16/04/2025
  const formattedTime = booking.slot_time; // already like "12:34"
  const formattedDateTime = `${formattedTime} ${formattedDate}`; // "12:34 16/04/2025"

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
    <div className='w-full max-w-3xl border rounded-lg shadow mb-4'>
      {/* Accordion Header */}
      <button
        className='w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 flex justify-between items-center font-semibold'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          <span className='text-lg text-slate-500 font-light'>
            {booking.user_email}
          </span>{" "}
          | <span className='text-ld font-medium'>{booking.serviceName}</span> |{" "}
          <span className=''>{formattedDateTime}</span>
        </span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className='p-4 bg-white'>
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
            <div className='gap-4 flex flex-col'>
              <p className='text-sm text-gray-700'>
                <strong>Booking Code:</strong> {booking.unique_code}
              </p>
              <p className='text-sm text-gray-700'>
                <strong>Total Price:</strong> £{booking.total_price}
              </p>
              <p className='text-sm text-gray-700'>
                <strong>Booked on:</strong>{" "}
                {new Date(booking.booking_date_placed).toLocaleString("en-GB")}
              </p>
              <p className='text-sm text-gray-700'>
                <strong>Booking Date:</strong> {formattedDateTime}
              </p>

              <div className='flex justify-end gap-4 mt-4'>
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
          )}
        </div>
      )}
    </div>
  );
}
