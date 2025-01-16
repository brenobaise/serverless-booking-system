export default function AdminServiceCard({ service }) {
  if (!service) {
    return <p>No service data available.</p>;
  }

  return (
    <div className="flex flex-col border p-4 rounded shadow-md gap-4 bg-white w-full sm:max-w-md lg:max-w-lg">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-800">{service.name}</h2>
        <p className="text-sm text-gray-500">{service.small_description}</p>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <p>
          <span className="font-semibold">ID:</span> {service._id}
        </p>
        <p>
          <span className="font-semibold">Large Description:</span>{" "}
          {service.large_description || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Is Available:</span>{" "}
          {service.isAvailable ? "Yes" : "No"}
        </p>
        <p>
          <span className="font-semibold">Number of Times Booked:</span>{" "}
          {service.numOfTimesBooked}
        </p>
        <p>
          <span className="font-semibold">Service Duration:</span>{" "}
          {service.duration} mins
        </p>
      </div>

      {/* Images */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {service.sm_img_url && (
          <img
            src={service.sm_img_url}
            alt={service.name}
            className="h-32 w-full object-cover rounded-lg shadow-sm"
          />
        )}
        {service.xl_img_url && (
          <img
            src={service.xl_img_url}
            alt={service.name}
            className="h-32 w-full object-cover rounded-lg shadow-sm"
          />
        )}
      </div>
    </div>
  );
}
