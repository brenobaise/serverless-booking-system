import AdminBookingCard from "./AdminBookingCard";
export default function BookingList({ bookings, onEdit, onDelete }) {
  if (!Array.isArray(bookings) || bookings.length === 0) {
    return <p className='text-center text-gray-500'>No bookings available.</p>;
  }

  return (
    <ul className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6'>
      {bookings.map((booking) => (
        <AdminBookingCard
          key={booking._id}
          booking={booking}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
