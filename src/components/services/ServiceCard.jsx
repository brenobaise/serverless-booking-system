// src/components/ServiceCard.jsx
export default function ServiceCard({ service }) {
  return (
    <div className="flex flex-col md:flex-row border p-4 rounded shadow-md gap-4 max-w-lg bg-white">
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
      </div>
    </div>
  );
}
