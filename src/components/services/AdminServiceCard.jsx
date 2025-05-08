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
    <div className='flex flex-col border p-6 rounded-xl shadow-md bg-white w-full max-w-xl mx-auto space-y-4'>
      {/* Edit Mode */}
      {isEditing ? (
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold text-gray-800'>Edit Service</h2>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Name
            </label>
            <input
              type='text'
              name='name'
              value={editedService.name}
              onChange={handleInputChange}
              className='w-full border p-2 rounded-md'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Small Description
            </label>
            <textarea
              name='small_description'
              value={editedService.small_description}
              onChange={handleInputChange}
              className='w-full border p-2 rounded-md'
              rows={2}
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Large Description
            </label>
            <textarea
              name='large_description'
              value={editedService.large_description || ""}
              onChange={handleInputChange}
              className='w-full border p-2 rounded-md'
              rows={3}
            />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Price
              </label>
              <input
                type='number'
                name='price'
                value={editedService.price}
                onChange={handleInputChange}
                className='w-full border p-2 rounded-md'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>
                Duration (mins)
              </label>
              <input
                type='number'
                name='duration'
                value={editedService.duration}
                onChange={handleInputChange}
                className='w-full border p-2 rounded-md'
              />
            </div>
          </div>

          <div className='flex justify-end gap-4 pt-4'>
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
        <>
          <div>
            <h2 className='text-xl font-bold text-gray-800'>{service.name}</h2>
            <p className='text-sm text-gray-500 mt-1'>
              {service.small_description}
            </p>
          </div>

          <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm text-gray-700'>
            <p>
              <span className='font-medium'>Large Description:</span>{" "}
              {service.large_description || "N/A"}
            </p>
            <p>
              <span className='font-medium'>Is Available:</span>{" "}
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

          {service.sm_img_url && (
            <div className='mt-4'>
              <img
                src={service.sm_img_url}
                alt={`${service.name} preview`}
                className='w-full h-40 object-cover rounded-md shadow-sm'
              />
            </div>
          )}

          <div className='flex justify-end gap-4 pt-4'>
            <Button
              onClick={() => setIsEditing(true)}
              className='bg-slate-400 hover:bg-slate-500 text-white transition'
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
        </>
      )}
    </div>
  );
}
