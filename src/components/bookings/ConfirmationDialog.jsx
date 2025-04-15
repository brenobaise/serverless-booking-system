"use client";
export default function ConfirmationDialog({
  open,
  onConfirm,
  onCancel,
  data,
  loading,
}) {
  if (!open) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm w-full'>
        <h3 className='text-lg font-semibold mb-4'>Confirm Your Booking</h3>
        <ul className='mb-4 text-sm space-y-1'>
          <li>
            <strong>Service:</strong> {data.serviceName}
          </li>
          <li>
            <strong>Price:</strong> £{data.price}
          </li>
          <li>
            <strong>Email:</strong> {data.email}
          </li>
          <li>
            <strong>Date:</strong> {data.date}
          </li>
          <li>
            <strong>Time:</strong> {data.time}
          </li>
        </ul>
        <div className='flex justify-end gap-3'>
          <button
            onClick={onCancel}
            className='bg-gray-200 text-gray-800 px-4 py-2 rounded'
          >
            Edit Choices
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className='bg-blue-600 text-white px-4 py-2 rounded'
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}
