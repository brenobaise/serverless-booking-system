"use client";
import { useState } from "react";

/**
 * Cancel Dialog Component.
 * Renders when the user clicks "Cancel" on a booking.
 * Asks for the user's unique confirmation code to proceed with cancellation.
 */

export default function CancelDialog({ open, onConfirm, onCancel, loading }) {
  const [userInputCode, setUserInputCode] = useState("");

  if (!open) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white p-6 rounded-2xl shadow-xl max-w-md w-full space-y-6'>
        {/* Title */}
        <h2 className='text-xl font-bold text-gray-800 text-center'>
          Cancel Booking
        </h2>

        {/* Instructions */}
        <p className='text-sm text-gray-600 text-center'>
          To cancel your booking, please enter the confirmation code you
          received at the time of booking.
        </p>

        {/* Input */}
        <div className='flex flex-col gap-2'>
          <label
            htmlFor='unique_code'
            className='text-sm font-medium text-gray-700'
          >
            Confirmation Code
          </label>
          <input
            id='unique_code'
            type='text'
            value={userInputCode}
            onChange={(e) => setUserInputCode(e.target.value)}
            placeholder='e.g. aaaaa6666-...-...-b225-...'
            className='w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </div>

        {/* Buttons */}
        <div className='flex justify-end gap-3 pt-2'>
          <button
            onClick={onCancel}
            className='px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 transition'
          >
            Go Back
          </button>
          <button
            onClick={() => onConfirm(userInputCode)}
            disabled={loading}
            className='px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition disabled:opacity-50'
          >
            {loading ? "Cancelling..." : "Confirm Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}
