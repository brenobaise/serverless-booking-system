import Button from "@/components/UI/Button";

export default function UserBookingCard({ booking, onCancel }) {
  // Compute if the booking is in the past
  const now = new Date();
  const bookingDateTime = new Date(booking.slot_date);
  const [hours, minutes] = booking.slot_time.split(":").map(Number);
  bookingDateTime.setHours(hours, minutes, 0, 0);

  const isPast = bookingDateTime < now;

  return (
    <div
      className={`flex flex-col h-fit border p-3 rounded-xl shadow-sm gap-2 w-full sm:max-w-xs transition ${
        isPast
          ? "bg-gray-100 text-gray-500 border-gray-300"
          : "bg-white text-gray-900 hover:shadow-md"
      }`}
    >
      {/* Header */}
      <h2 className='text-lg font-semibold text-center'>
        {booking.serviceName}
      </h2>

      {/* Date and Time */}
      <div className='text-sm leading-relaxed px-1'>
        <p>
          <span className='font-semibold'>Time:</span> {booking.slot_time}
        </p>
        <p>
          <span className='font-semibold'>Date:</span>{" "}
          {new Date(booking.slot_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>
      </div>

      {/* Price */}
      <div className='font-medium text-sm px-1'>
        💷 Total: £{booking.total_price}
      </div>

      {/* Optional note */}
      {isPast && (
        <p className='text-xs italic text-center text-gray-400'>
          This booking has passed
        </p>
      )}

      {/* Cancel Button */}
      {!isPast && onCancel && (
        <div className='flex justify-center'>
          <Button
            children='Cancel Booking'
            onClick={() => onCancel(booking)}
            className='text-xs px-3 py-2 mt-2 w-[160px] bg-red-600 hover:bg-red-700 text-white rounded-md shadow-sm transition-all duration-200 ease-in-out'
          />
        </div>
      )}
    </div>
  );
}
