"use client";

import { useState } from "react";
import { redirect } from "next/navigation";
import axios from "axios";
import Button from "../Button";

export default function NewServiceForm({ onServiceAdded }) {
  const defaultData = {
    name: "",
    small_description: "",
    large_description: "",
    price: "",
    sm_img_url: "",
    xl_img_url: "",
    isAvailable: true,
    duration: "",
  };
  const [formData, setFormData] = useState(defaultData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/dashboard/services", formData);
      console.log("Service created:", response.data);
      alert("Service created successfully!");
      setFormData(defaultData);
      onServiceAdded();
    } catch (err) {
      console.error("Failed to create service:", err.message);
      alert("Error creating service.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-100 lg:w-[600px] md:w-[800px]">
      <div className="w-full max-w-lg p-6 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Service</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-2">Service Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Small Description</label>
            <input
              type="text"
              name="small_description"
              value={formData.small_description}
              onChange={handleChange}
              required
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Large Description</label>
            <textarea
              name="large_description"
              value={formData.large_description}
              onChange={handleChange}
              className="w-full border rounded p-2"
            ></textarea>
          </div>
          <div>
            <label className="block font-medium mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Small Image URL</label>
            <input
              type="text"
              name="sm_img_url"
              value={formData.sm_img_url}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-2">Large Image URL</label>
            <input
              type="text"
              name="xl_img_url"
              value={formData.xl_img_url}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={handleChange}
                className="mr-2"
              />
              Is Available
            </label>
          </div>
          <div>
            <label className="block font-medium mb-2">Duration (in mins)</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              min="1"
              className="w-full border rounded p-2"
            />
          </div>
          <Button
            children="Submit"
            type="submit"
            size="medium"
            variant="primary"
          />
        </form>
      </div>
    </div>
  );
}
