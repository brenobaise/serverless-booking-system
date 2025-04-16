"use client";

/**
 * Confirmation Dialog Component.
 * Renders when the user clicks "Book Now" from the BookingForm.
 * It shows booking info and the unique code required to cancel the booking.
 */

export default function ConfirmationDialog({
  open,
  onConfirm,
  onCancel,
  data,
  loading,
  unique_code,
}) {
  if (!open) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white p-6 rounded-2xl shadow-xl max-w-md w-full space-y-6'>
        {/* Title */}
        <h2 className='text-xl font-bold text-gray-800 text-center'>
          Confirm Your Booking
        </h2>

        {/* Booking Summary */}
        <div className='text-sm text-gray-700 space-y-2'>
          <div className='flex justify-between'>
            <span className='font-medium'>Service:</span>
            <span>{data.serviceName}</span>
          </div>
          <div className='flex justify-between'>
            <span className='font-medium'>Price:</span>
            <span>£{data.price}</span>
          </div>
          <div className='flex justify-between'>
            <span className='font-medium'>Email:</span>
            <span>{data.email}</span>
          </div>
          <div className='flex justify-between'>
            <span className='font-medium'>Date:</span>
            <span>{data.date}</span>
          </div>
          <div className='flex justify-between'>
            <span className='font-medium'>Time:</span>
            <span>{data.time}</span>
          </div>
        </div>

        {/* Confirmation Code */}
        <div className='bg-gray-100 rounded-lg p-4 text-sm text-gray-800'>
          <p className='font-semibold mb-1'>Your Confirmation Code:</p>
          <div className='bg-white p-2 rounded border font-mono text-sm text-blue-600'>
            {unique_code}
          </div>
          <p className='mt-2 text-xs text-gray-500'>
            Please save this code. It will be required to cancel your booking.
          </p>
        </div>

        {/* Action Buttons */}
        <div className='flex justify-end gap-3 pt-2'>
          <button
            onClick={onCancel}
            className='px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100 transition'
          >
            Edit Choices
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className='px-4 py-2 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50'
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}
