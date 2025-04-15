"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../UI/Button";

export default function AdminBookingCard({ booking, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBooking, setEditedBooking] = useState({ ...booking });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBooking((prev) => ({ ...prev, [name]: value }));
  };

  const fetchAvailableSlots = async (date) => {
    try {
      setLoadingSlots(true);
      const response = await axios.get(
        `/api/bookings/available-slots?date=${date}`
      );
      setAvailableSlots(response.data.availableSlots || []);
    } catch (err) {
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  // Fetch available slots when slot_date changes
  useEffect(() => {
    if (isEditing && editedBooking.slot_date) {
      fetchAvailableSlots(editedBooking.slot_date.split("T")[0]);
    }
  }, [editedBooking.slot_date, isEditing]);

  const handleSave = () => {
    onEdit(editedBooking);
    setIsEditing(false);
  };

  const handleDeleteClick = () => {
    const confirmed = confirm("Are you sure you want to delete this booking?");
    if (confirmed) {
      onDelete(booking._id);
    }
  };

  return (
    <div className='border p-4 rounded-lg shadow-md w-full max-w-2xl mx-auto bg-white'>
      {isEditing ? (
        <div className='space-y-4'>
          {/* Email Display */}
          <div>
            <label className='block text-md p-2 font-semibold text-center'>
              User Email
            </label>
            <p className='border p-2 rounded bg-gray-100 text-gray-600 text-center'>
              {editedBooking.user_email}
            </p>
          </div>

          {/* Slot Date Input */}
          <div>
            <label className='block text-md font-semibold p-2 text-center'>
              Slot Date
            </label>
            <input
              type='date'
              name='slot_date'
              value={editedBooking.slot_date?.split("T")[0] || ""}
              onChange={handleInputChange}
              className='w-full border p-2 rounded text-center'
            />
          </div>

          {/* Slot Time Dropdown */}
          <div>
            <label className='block text-md font-semibold p-2 text-center'>
              Slot Time
            </label>
            <select
              name='slot_time'
              value={editedBooking.slot_time || ""}
              onChange={handleInputChange}
              className='w-full border p-2 rounded text-center'
            >
              <option value=''>Select a time</option>
              {loadingSlots ? (
                <option disabled>Loading slots...</option>
              ) : availableSlots.length > 0 ? (
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

          {/* Action Buttons */}
          <div className='flex gap-4 justify-end'>
            <Button children='Save' onClick={handleSave} variant='success' />
            <Button children='Cancel' onClick={() => setIsEditing(false)} />
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
              {booking.slot_date?.split("T")[0]} {booking.slot_time}
            </p>
            <p className='text-sm text-center'>Price: £{booking.total_price}</p>

            <div className='flex justify-between mt-4'>
              <Button
                children='Edit'
                onClick={() => setIsEditing(true)}
                className='bg-blue-500'
              />
              <Button
                children='Delete'
                onClick={handleDeleteClick}
                variant='danger'
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
