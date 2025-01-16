export default function BookingCard({ bookings }) {
  return (
    <li className="flex flex-col border p-4 rounded shadow-md gap-4 min-w-lg bg-white w-full sm:max-w-md lg:max-w-lg">
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
