import BookingCard from "@/components/bookings/BookingCard";

export default function BookingList({ bookings }) {
  if (!Array.isArray(bookings) || bookings.length === 0) {
    return <p className="text-center text-gray-500">No bookings available.</p>;
  }

  return (
    <ul className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-4">
      {bookings.map((booking) => (
        <BookingCard key={booking._id} bookings={booking} />
      ))}
    </ul>
  );
}
