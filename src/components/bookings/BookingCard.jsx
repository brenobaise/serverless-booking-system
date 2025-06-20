import Button from "../UI/Button";

/**
 * The Booking Card Component
 */
function BookingCard({ bookings, oneEdit }) {
  return (
    <div
      className='flex flex-row flex-wrap p-6 m-4 
           max-h-[200px] bg-slate-200
          text-black font-medium rounded-lg shadow-md shadow-slate-550'
    >
      <div className=' text-left'>
        <p className='text-lg font-semibold '>Email: {bookings.user_email}</p>
        <p className='text-sm'>
          Date Placed:{" "}
          {new Date(bookings.booking_date_placed).toLocaleDateString()}
        </p>
        <p className='text-sm '>
          Slot Date: {new Date(bookings.slot_date).toLocaleDateString()}
        </p>
        <p className='text-sm '></p>
        <p className='text-sm font-medium'>
          Total Price: ${bookings.total_price}
        </p>

        <Button
          children='Edit'
          onClick={() => setIsEditing(true)}
          size='medium'
          className='bg-slate-400 transition ease-in-out delay-350'
        />
      </div>
    </div>
  );
}

export default BookingCard;
