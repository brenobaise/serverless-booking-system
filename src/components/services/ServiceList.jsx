// src/components/ServiceList.jsx
import ServiceCard from "./ServiceCard";

export default function ServiceList({ services }) {
  if (services.length === 0) {
    return <p>No services available.</p>;
  }

  return (
    <ul className="flex flex-wrap justify-center gap-6 p-6">
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </ul>
  );
}
