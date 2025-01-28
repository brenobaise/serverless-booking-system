import AdminServiceCard from "./AdminServiceCard";
import ServiceCard from "./ServiceCard";

export default function ServiceList({ services, isAdmin, onEdit, onDelete }) {
  if (!Array.isArray(services) || services.length === 0) {
    return <p className="text-center text-gray-500">No services available.</p>;
  }

  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {services.map((service) =>
        isAdmin ? (
          <AdminServiceCard
            key={service._id}
            service={service}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ) : (
          <ServiceCard key={service._id} service={service} />
        )
      )}
    </ul>
  );
}
