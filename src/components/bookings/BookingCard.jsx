export default function BookingCard({ bookings }) {
  return (
    <li className="flex flex-col w-full max-w-sm p-4 border rounded-lg shadow-lg bg-white gap-4">
      <div className="text-left">
        <p className="text-lg font-semibold text-gray-800">
          Email: {bookings.user_email}
        </p>
        <p className="text-sm text-gray-600">
          Date Placed:{" "}
          {new Date(bookings.booking_date_placed).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600">
          Slot Date: {new Date(bookings.slot_date).toLocaleDateString()}
        </p>
        <p className="text-sm text-gray-600">
          Service ID: {bookings.Service_id}
        </p>
        <p className="text-sm text-gray-800 font-medium">
          Total Price: ${bookings.total_price}
        </p>
      </div>
    </li>
  );
}
