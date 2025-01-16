import AdminServiceCard from "./AdminServiceCard";
import ServiceCard from "./ServiceCard";

export default function ServiceList({ services, isAdmin }) {
  if (!Array.isArray(services) || services.length === 0) {
    return <p>No services available.</p>;
  }

  return (
    <ul className="flex flex-wrap justify-center gap-6 p-6">
      {services.map((service) =>
        isAdmin ? (
          <AdminServiceCard key={service._id} service={service} />
        ) : (
          <ServiceCard key={service._id} service={service} />
        )
      )}
    </ul>
  );
}
