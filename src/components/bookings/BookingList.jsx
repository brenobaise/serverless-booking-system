import AdminBookingAccordion from "./AdminBookingAccordion";

export default function BookingList({ bookings, onEdit, onDelete }) {
  if (!Array.isArray(bookings) || bookings.length === 0) {
    return <p className='text-center text-gray-500'>No bookings available.</p>;
  }

  return (
    <div className='w-full px-4'>
      {bookings.map((booking) => (
        <AdminBookingAccordion
          key={booking._id}
          booking={booking}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
