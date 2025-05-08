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
          {upcoming.length > 0 && (
            <>
              <h3 className='text-lg font-semibold text-gray-700'>
                Upcoming Bookings
              </h3>
              {upcoming.map((booking) => (
                <AdminBookingAccordion
                  key={booking._id}
                  booking={booking}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </>
          )}

          {showPast && past.length > 0 && (
            <>
              <h3 className='text-lg font-semibold text-gray-700 mt-6'>
                Past Bookings
              </h3>
              {past.map((booking) => (
                <AdminBookingAccordion
                  key={booking._id}
                  booking={booking}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </>
          )}
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
