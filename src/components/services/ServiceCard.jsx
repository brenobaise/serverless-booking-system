import { useState } from "react";
import BookingForm from "../bookings/BookingForm.jsx";

export default function ServiceCard({ service }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex flex-col border p-4 rounded shadow-md gap-4 max-w-lg bg-white">
      <img
        className="w-44 h-44 object-cover rounded"
        src="testimage.jpg"
        alt={service.name}
      />
      <div>
        <h2 className="text-xl font-bold">{service.name}</h2>
        <p>{service.small_description}</p>
        <p className="text-gray-600">
          Price: ${service.price} | Duration: {service.duration} mins
        </p>
        <button
          className="bg-blue-600 text-white rounded p-2 mt-4 hover:bg-blue-700"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Hide Form" : "Book Now"}
        </button>
        {showForm && <BookingForm service={service} />}
      </div>
    </div>
  );
}
