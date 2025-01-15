// src/app/services/page.jsx
"use client";
import "../styles/global.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceList from "@/components/services/ServiceList";

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
    <div className="flex justify-center overflow-auto">
      <div className="  bg-cyan-400">
        <ServiceList services={services} />
      </div>
    </div>
  );
}
