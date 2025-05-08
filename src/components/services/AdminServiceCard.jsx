import { useState } from "react";
import Button from "../UI/Button";

export default function AdminServiceCard({ service, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedService, setEditedService] = useState({ ...service });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedService((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onEdit(editedService);
    setIsEditing(false);
  };

  if (!service) {
    return <p>No service data available.</p>;
  }

  return (
    <div className='flex flex-col border border-gray-200 p-6 rounded-2xl shadow-lg bg-white w-full max-w-md transition hover:shadow-xl space-y-4'>
      {/* Edit Mode */}
      {isEditing ? (
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold text-gray-800 text-center'>
            Edit Service
          </h2>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Name
            </label>
            <input
              type='text'
              name='name'
              value={editedService.name}
              onChange={handleInputChange}
              className='w-full border p-2 rounded-md text-sm'
            />
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Small Description
            </label>
            <textarea
              name='small_description'
              value={editedService.small_description}
              onChange={handleInputChange}
              className='w-full border p-2 rounded-md text-sm'
              rows={2}
            />
          </div>

          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Large Description
            </label>
            <textarea
              name='large_description'
              value={editedService.large_description || ""}
              onChange={handleInputChange}
              className='w-full border p-2 rounded-md text-sm'
              rows={3}
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                Price (£)
              </label>
              <input
                type='number'
                name='price'
                value={editedService.price}
                onChange={handleInputChange}
                className='w-full border p-2 rounded-md text-sm'
              />
            </div>

            <div className='space-y-2'>
              <label className='block text-sm font-medium text-gray-700'>
                Duration (mins)
              </label>
              <input
                type='number'
                name='duration'
                value={editedService.duration}
                onChange={handleInputChange}
                className='w-full border p-2 rounded-md text-sm'
              />
            </div>
          </div>

          <div className='flex justify-end gap-3 pt-2'>
            <Button onClick={handleSave} variant='success' size='medium'>
              Save
            </Button>
            <Button
              onClick={() => setIsEditing(false)}
              variant='secondary'
              size='medium'
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        // View Mode
        <div className='space-y-3'>
          <div>
            <h2 className='text-xl font-bold text-gray-900 text-center'>
              {service.name}
            </h2>
            <p className='text-sm text-gray-600 text-center'>
              {service.small_description}
            </p>
          </div>

          <div className='text-sm text-gray-700 space-y-1'>
            <p>
              <span className='font-medium'>Description:</span>{" "}
              {service.large_description || "N/A"}
            </p>
            <p>
              <span className='font-medium'>Available:</span>{" "}
              {service.isAvailable ? "Yes" : "No"}
            </p>
            <p>
              <span className='font-medium'>Booked:</span>{" "}
              {service.numOfTimesBooked} times
            </p>
            <p>
              <span className='font-medium'>Duration:</span> {service.duration}{" "}
              mins
            </p>
          </div>

          <div className='flex justify-end gap-3 pt-2'>
            <Button
              onClick={() => setIsEditing(true)}
              className='bg-slate-500 hover:bg-slate-600 text-white transition'
              size='medium'
            >
              Edit
            </Button>
            <Button
              onClick={() => onDelete(service._id)}
              variant='danger'
              size='medium'
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
