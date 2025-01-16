import { useState } from "react";
import BookingForm from "../bookings/BookingForm.jsx";
import Button from "../Button.jsx";

export default function ServiceCard({ service }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col border p-4 rounded shadow-md gap-4 bg-white w-full sm:max-w-md lg:max-w-lg">
      <img
        className="w-full h-44 object-cover rounded"
        src="testimage.jpg"
        alt={service.name}
      />
      <div>
        <h2 className="text-xl font-bold">{service.name}</h2>
        <p>{service.small_description}</p>
        <p className="text-gray-600">
          Price: ${service.price} | Duration: {service.duration} mins
        </p>
        <Button
          children={showForm ? "Hide Form" : "Book Now"}
          onClick={() => setShowForm(!showForm)}
          size="medium"
          variant="primary"
          className="shadow-md shadow-slate-500 transition ease-in delay-150 hover:font-light"
        />

        {showForm && <BookingForm service={service} />}
      </div>
    </div>
  );
}
