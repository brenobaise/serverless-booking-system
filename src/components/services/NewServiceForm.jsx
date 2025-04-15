"use client";

import { useState } from "react";
import axios from "axios";
import Button from "../UI/Button";

export default function NewServiceForm({ onServiceAdded }) {
  const [formData, setFormData] = useState({
    name: "",
    small_description: "",
    price: "",
    duration: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/dashboard/services", formData);
      alert("Service created successfully!");
      setFormData({ name: "", small_description: "", price: "", duration: "" });
      onServiceAdded();
    } catch (err) {
      console.error("Failed to create service:", err.message);
      alert("Error creating service.");
    }
  };

  return (
    <div className='w-full max-w-md p-4 bg-white rounded shadow'>
      <h2 className='text-xl font-bold mb-4 text-center'>Add New Service</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <label className='block font-medium mb-1'>Service Name</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
            className='w-full border rounded p-2'
          />
        </div>
        <div>
          <label className='block font-medium mb-1'>Description</label>
          <textarea
            name='small_description'
            value={formData.small_description}
            onChange={handleChange}
            required
            className='w-full border rounded p-2'
          />
        </div>
        <div>
          <label className='block font-medium mb-1'>Price</label>
          <input
            type='number'
            name='price'
            value={formData.price}
            onChange={handleChange}
            required
            min='0'
            className='w-full border rounded p-2'
          />
        </div>
        <div>
          <label className='block font-medium mb-1'>Duration (mins)</label>
          <input
            type='number'
            name='duration'
            value={formData.duration}
            onChange={handleChange}
            required
            min='1'
            className='w-full border rounded p-2'
          />
        </div>
        <Button type='submit' size='medium' className='w-full'>
          Submit
        </Button>
      </form>
    </div>
  );
}
