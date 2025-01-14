"use client";
import "../styles/global.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/services");
        setServices(response.data);
      } catch (err) {
        setError("Failed to fetch services.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return <p>Loading services...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex justify-center">
      {services.length === 0 ? (
        <p>No services available.</p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 ">
          {services.map((service) => (
            <li
              key={service._id}
              className="border p-4 rounded shadow bg-white text-black "
            >
              <h2 className="text-xl font-bold">{service.name}</h2>
              <p>{service.small_description}</p>
              <p className="text-md text-gray-600 ">
                Price: ${service.price} | Duration: {service.duration} mins
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
