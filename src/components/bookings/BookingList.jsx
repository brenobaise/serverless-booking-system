import BookingCard from "../new-components/booking/BookingCard";

export default function BookingList({ bookings }) {
  if (!Array.isArray(bookings) || bookings.length === 0) {
    return <p className="text-center text-gray-500">No bookings available.</p>;
  }

  return (
    <ul className="flex flex-col justify-center w-2/3">
      {bookings.map((booking) => (
        <BookingCard key={booking._id} bookings={booking} />
      ))}
    </ul>
  );
}
