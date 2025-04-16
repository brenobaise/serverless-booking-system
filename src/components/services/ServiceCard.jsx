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
    <div className='flex flex-col border p-4 rounded shadow-md gap-4 bg-white w-full sm:max-w-md lg:max-w-lg'>
      <img
        className='w-full h-44 object-cover rounded'
        src='testimage.jpg'
        alt={service.name}
      />
      <div>
        <h2 className='text-xl font-bold'>{service.name}</h2>
        <p>{service.small_description}</p>
        <p className='text-gray-600'>
          Price: £{service.price} | Duration: {service.duration} mins
        </p>
        <Button
          children={showForm ? "Hide Form" : "Book Now"}
          onClick={() => setShowForm(!showForm)}
          size='medium'
          variant='primary'
          className='shadow-md shadow-slate-500 transition ease-in delay-150 hover:font-light'
        />

        {showForm && (
          <BookingForm service={service} unique_code={confirmation_code} />
        )}
      </div>
    </div>
  );
}
