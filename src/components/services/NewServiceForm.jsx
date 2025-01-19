"use client";

import { useState } from "react";
import axios from "axios";

export default function NewServiceForm() {
  const [formData, setFormData] = useState({
    name: "",
    small_description: "",
    large_description: "",
    price: "",
    sm_img_url: "",
    xl_img_url: "",
    isAvailable: true,
    duration: "",
  });

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
      setFormData({
        name: "",
        small_description: "",
        large_description: "",
        price: "",
        sm_img_url: "",
        xl_img_url: "",
        isAvailable: true,
        duration: "",
      });
    } catch (err) {
      console.error("Failed to create service:", err.message);
      alert("Error creating service.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Service Name</label>
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
          <label className="block font-medium mb-1">Small Description</label>
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
          <label className="block font-medium mb-1">Large Description</label>
          <textarea
            name="large_description"
            value={formData.large_description}
            onChange={handleChange}
            className="w-full border rounded p-2"
          ></textarea>
        </div>
        <div>
          <label className="block font-medium mb-1">Price</label>
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
          <label className="block font-medium mb-1">Small Image URL</label>
          <input
            type="text"
            name="sm_img_url"
            value={formData.sm_img_url}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Large Image URL</label>
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
          <label className="block font-medium mb-1">Duration (in mins)</label>
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
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
