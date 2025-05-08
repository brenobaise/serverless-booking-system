import { useState } from "react";
import BookingForm from "../bookings/BookingForm.jsx";
import Button from "../UI/Button.jsx";
import { v4 as uuidv4 } from "uuid";

/**
 * User Service Card.
 * It is the card displayed to the user when booking a service.
 * It also calls the BookingForm Component
 */
export default function ServiceCard({ service }) {
  const [showForm, setShowForm] = useState(false);
  const confirmation_code = uuidv4();

  return (
    <div className='flex flex-col h-fit border border-gray-200 p-6 rounded-2xl shadow-lg gap-4 bg-white w-full sm:max-w-md lg:max-w-lg transition hover:shadow-xl'>
      <img
        className='w-full h-48 object-cover rounded-xl '
        src='testimage.jpg'
        alt={service.name}
      />

      <div className='flex flex-col gap-3'>
        <h2 className='text-2xl font-semibold text-gray-900 tracking-tight text-center p-4'>
          {service.name}
        </h2>
        <p className='text-gray-700 leading-relaxed text-xl'>
          {service.small_description}
        </p>
        <p className='text-gray-600   font-normal text-xl'>
          <span className='block  '>💷 Price: £{service.price}</span>
          <span className='block'>⏱ Duration: {service.duration} mins</span>
        </p>

        <Button
          children={showForm ? "Hide Form" : "Book Now"}
          onClick={() => setShowForm(!showForm)}
          size='medium'
          variant='primary'
          className=' text-xl mt-2 shadow-md shadow-slate-400 hover:shadow-lg transition-all duration-200 ease-in-out'
        />

        {showForm && (
          <div className='mt-4'>
            <BookingForm service={service} unique_code={confirmation_code} />
          </div>
        )}
      </div>
    </div>
  );
}
