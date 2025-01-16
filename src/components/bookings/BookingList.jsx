import BookingCard from "@/components/bookings/BookingCard";
import Sidebar from "../Sidebar";

export default function BookingList({ bookings }) {
  if (!Array.isArray(bookings) || bookings.length === 0) {
    return <p className="text-center text-gray-500">No bookings available.</p>;
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6  ">
      {bookings.map((booking) => (
        <BookingCard key={booking._id} bookings={booking} />
      ))}
    </ul>
  );
}
