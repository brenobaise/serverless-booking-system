"use client";
import "@/app/styles/global.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceList from "@/components/services/ServiceList";
import Button from "@/components/Button";
import NewServiceForm from "@/components/services/NewServiceForm";

export default function DashboardServicePage() {
  const [showForm, setShowForm] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch services
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

  // Fetch services on mount
  useEffect(() => {
    fetchServices();
  }, []);

  // Handle editing a service
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
      console.log("Service updated successfully:", response.data);
    } catch (err) {
      console.error("Failed to update service:", err.message);
    }
  };

  // Handle deleting a service
  const handleDelete = async (serviceId) => {
    try {
      await axios.delete(`/api/dashboard/services/${serviceId}`);
      setServices((prevServices) =>
        prevServices.filter((service) => service._id !== serviceId)
      );
      console.log("Service deleted successfully.");
    } catch (err) {
      console.error("Failed to delete service:", err.message);
    }
  };

  // Handle adding a new service
  const handleServiceAdded = () => {
    fetchServices(); // Refresh the list of services
    setShowForm(false); // Close the form after submission
  };

  // Toggle between form and service list
  const toggleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  // Render loading or error states
  if (loading) return <p>Loading services...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className=" flex justify-center ">
      <div>
        <Button
          onClick={toggleShowForm}
          size="medium"
          className=" bg-slate-500 transition ease-in-out delay-350 hover:bg-green-600"
        >
          {showForm ? "Back " : "Add Service"}
        </Button>
      </div>
      <div className="flex  flex-row justify-between items-center">
        {/* Form Section */}
        {showForm && (
          <div className="  w-full max-w-lg">
            <NewServiceForm onServiceAdded={handleServiceAdded} />
          </div>
        )}

        {/* Service List Section */}
        {!showForm && (
          <div className="  flex">
            <ServiceList
              services={services}
              isAdmin={true}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
}
