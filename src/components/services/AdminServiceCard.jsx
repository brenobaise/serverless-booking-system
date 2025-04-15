import { useState } from "react";
import Button from "../UI/Button";

export default function AdminServiceCard({ service, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false); // Toggle for edit mode
  const [editedService, setEditedService] = useState({ ...service }); // Editable service state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedService((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onEdit(editedService); // Trigger the onEdit function with the updated service
    setIsEditing(false); // Exit edit mode
  };

  if (!service) {
    return <p>No service data available.</p>;
  }

  return (
    <div className='flex flex-col border p-6 rounded-lg shadow-lg bg-white w-full sm:max-w-md lg:max-w-lg mx-auto'>
      {/* Edit Mode */}
      {isEditing ? (
        <div className='space-y-4'>
          <div>
            <label className='block font-medium'>Name</label>
            <input
              type='text'
              name='name'
              value={editedService.name}
              onChange={handleInputChange}
              className='w-full border p-2 rounded'
            />
          </div>
          <div>
            <label className='block font-medium'>Small Description</label>
            <textarea
              name='small_description'
              value={editedService.small_description}
              onChange={handleInputChange}
              className='w-full border p-2 rounded'
            />
          </div>
          <div>
            <label className='block font-medium'>Large Description</label>
            <textarea
              name='large_description'
              value={editedService.large_description || ""}
              onChange={handleInputChange}
              className='w-full border p-2 rounded'
            />
          </div>
          <div>
            <label className='block font-medium'>Price</label>
            <input
              type='number'
              name='price'
              value={editedService.price}
              onChange={handleInputChange}
              className='w-full border p-2 rounded'
            />
          </div>
          <div>
            <label className='block font-medium'>Duration (mins)</label>
            <input
              type='number'
              name='duration'
              value={editedService.duration}
              onChange={handleInputChange}
              className='w-full border p-2 rounded'
            />
          </div>
          <div className='flex gap-4 justify-end'>
            <Button
              children='Save'
              onClick={handleSave}
              size='medium'
              variant='success'
            />
            <Button
              children='Cancel'
              onClick={() => setIsEditing(false)}
              size='medium'
              variant='secondary'
            />
          </div>
        </div>
      ) : (
        // View Mode
        <>
          <div className='mb-6'>
            <h2 className='text-2xl font-bold text-gray-800'>{service.name}</h2>
            <p className='text-sm text-gray-500 mt-2'>
              {service.small_description}
            </p>
          </div>

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm text-gray-700'>
            <p>
              <span className='font-semibold'>Large Description:</span>{" "}
              {service.large_description || "N/A"}
            </p>
            <p>
              <span className='font-semibold'>Is Available:</span>{" "}
              {service.isAvailable ? "Yes" : "No"}
            </p>
            <p>
              <span className='font-semibold'>Number of Times Booked:</span>{" "}
              {service.numOfTimesBooked}
            </p>
            <p>
              <span className='font-semibold'>Service Duration:</span>{" "}
              {service.duration} mins
            </p>
          </div>

          <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4'>
            {service.sm_img_url && (
              <img
                src={service.sm_img_url}
                alt={`${service.name} - Small Image`}
                className='h-40 w-full object-cover rounded-lg shadow-md'
              />
            )}
          </div>

          {/* Action Buttons */}
          <div className='mt-4 flex gap-20 justify-evenly'>
            <Button
              children='Edit'
              onClick={() => setIsEditing(true)}
              size='medium'
              className='bg-slate-400 transition ease-in-out delay-350'
            />

            <Button
              children='Delete'
              onClick={() => onDelete(service._id)}
              variant='danger'
              size='medium'
            />
          </div>
        </>
      )}
    </div>
  );
}
