// src/app/services/page.jsx
"use client";
import "@/app/styles/global.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceList from "@/components/services/ServiceList";

export default function DashboardServicePage() {
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
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) return <p>Loading services...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-6 ">
      <ServiceList services={services} isAdmin={true} />
    </div>
  );
}
