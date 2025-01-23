"use client";
import "@/app/styles/global.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceList from "@/components/services/ServiceList";
import Button from "@/components/Button";
import NewServiceForm from "@/components/services/NewServiceForm";
import Dialog from "@/components/new-components/Dialog"; // Import Dialog component

export default function DashboardServicePage() {
  const [showForm, setShowForm] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch services
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/dashboard/services");
      setServices(response.data);
    } catch (err) {
      setError("Failed to fetch services.");
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = async (updatedService) => {
    try {
      const response = await axios.put(
        `/api/dashboard/services/${updatedService._id}`,
        updatedService
      );
      setServices((prev) =>
        prev.map((service) =>
          service._id === updatedService._id ? response.data : service
        )
      );
    } catch (err) {
      console.error("Failed to update service:", err.message);
    }
  };

  const handleDelete = async (serviceId) => {
    try {
      await axios.delete(`/api/dashboard/services/${serviceId}`);
      setServices((prevServices) =>
        prevServices.filter((service) => service._id !== serviceId)
      );
    } catch (err) {
      console.error("Failed to delete service:", err.message);
    }
  };

  const handleServiceAdded = () => {
    fetchServices();
    setShowForm(false);
  };

  const toggleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  if (loading) return <p>Loading services...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center">
      <Dialog>
        <div className="flex p-4 justify-start items-end">
          <Button
            onClick={toggleShowForm}
            size="medium"
            className="bg-slate-500 transition ease-in-out delay-350 hover:bg-green-600"
          >
            {showForm ? "Back" : "Add Service"}
          </Button>
        </div>

        <div className="flex justify-center items-center">
          {showForm ? (
            <NewServiceForm onServiceAdded={handleServiceAdded} />
          ) : (
            <div>
              <ServiceList
                services={services}
                isAdmin={true}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
}
