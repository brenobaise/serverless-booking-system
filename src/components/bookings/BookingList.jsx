import { useState } from "react";
import AdminBookingAccordion from "./AdminBookingAccordion";
import UserBookingCard from "./UserBookingCard";

export default function BookingList({
  bookings,
  isAdmin,
  onEdit,
  onDelete,
  onCancel,
}) {
  const groupByDate = (bookings) => {
    return bookings.reduce((acc, booking) => {
      const dateKey = new Date(booking.slot_date).toLocaleDateString("en-GB");
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(booking);
      return acc;
    }, {});
  };

  const [showPast, setShowPast] = useState(false);

  if (!Array.isArray(bookings) || bookings.length === 0) {
    return <p className='text-center text-gray-500'>No bookings available.</p>;
  }

  const now = new Date();

  const upcoming = bookings.filter((b) => {
    const date = new Date(b.slot_date);
    const [h, m] = b.slot_time.split(":").map(Number);
    date.setHours(h, m, 0, 0);
    return date >= now;
  });

  const past = bookings.filter((b) => {
    const date = new Date(b.slot_date);
    const [h, m] = b.slot_time.split(":").map(Number);
    date.setHours(h, m, 0, 0);
    return date < now;
  });

  return (
    <div className='w-full'>
      {/* Toggle Button for Past Bookings */}
      {past.length > 0 && (
        <div className='flex justify-center mb-4'>
          <button
            onClick={() => setShowPast((prev) => !prev)}
            className='text-sm px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition'
          >
            {showPast ? "Hide Past Bookings" : "Show Past Bookings"}
          </button>
        </div>
      )}

      {/* Admin Layout */}
      {isAdmin ? (
        <div className='flex flex-col gap-4 px-4'>
          {Object.entries(groupByDate(upcoming)).map(([date, group], index) => (
            <div key={date} className='space-y-2 mt-6'>
              {index > 0 && <hr className='border-t border-gray-300 mb-4' />}
              <h4 className='text-center text-white font-semibold'>{date}</h4>
              {group.map((booking) => (
                <AdminBookingAccordion
                  key={booking._id}
                  booking={booking}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </div>
          ))}

          {showPast &&
            Object.entries(groupByDate(past)).map(([date, group], index) => (
              <div key={date} className='space-y-2 mt-6'>
                {index > 0 && <hr className='border-t border-gray-300 mb-4' />}
                <h4 className='text-center text-white font-semibold'>{date}</h4>
                {group.map((booking) => (
                  <AdminBookingAccordion
                    key={booking._id}
                    booking={booking}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))}
              </div>
            ))}
        </div>
      ) : (
        // User Layout
        <div
          className={`${
            (showPast ? upcoming.length + past.length : upcoming.length) > 3
              ? "grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl"
              : "flex flex-col gap-4 max-w-md"
          } px-4 mx-auto`}
        >
          {upcoming.length > 0 &&
            upcoming.map((booking) => (
              <UserBookingCard
                key={booking._id}
                booking={booking}
                onCancel={onCancel}
              />
            ))}

          {showPast &&
            past.map((booking) => (
              <UserBookingCard
                key={booking._id}
                booking={booking}
                onCancel={onCancel}
              />
            ))}
        </div>
      )}
    </div>
  );
}
