import React, { useState } from 'react';

const EventForm = ({ onSubmit, initialValues = {} }) => {
  const [title, setTitle] = useState(initialValues.title || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [date, setDate] = useState(initialValues.date ? new Date(initialValues.date).toISOString().split('T')[0] : '');
  const [location, setLocation] = useState(initialValues.location || '');
  const [capacity, setCapacity] = useState(initialValues.capacity === undefined ? '' : initialValues.capacity);
  const [thumbnail, setThumbnail] = useState(initialValues.thumbnail || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      date,
      location,
      capacity: capacity === '' ? 0 : parseInt(capacity, 10),
      thumbnail,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4"> {/* Form container with vertical spacing */}
      <div>
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label htmlFor="date" className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label htmlFor="location" className="block text-gray-700 text-sm font-bold mb-2">Location:</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label htmlFor="capacity" className="block text-gray-700 text-sm font-bold mb-2">Capacity (optional):</label>
        <input
          type="number"
          id="capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label htmlFor="thumbnail" className="block text-gray-700 text-sm font-bold mb-2">Thumbnail URL (optional):</label>
        <input
          type="url"
          id="thumbnail"
          value={thumbnail}
          onChange={(e) => setThumbnail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex justify-end"> {/* Button container for alignment */}
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default EventForm;