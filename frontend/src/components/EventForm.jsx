import React, { useState } from 'react';

const EventForm = ({ onSubmit, initialValues = {} }) => {
  const [title, setTitle] = useState(initialValues.title || '');
  const [description, setDescription] = useState(initialValues.description || '');
  const [date, setDate] = useState(initialValues.date ? new Date(initialValues.date).toISOString().split('T')[0] : ''); // Format date for input
  const [location, setLocation] = useState(initialValues.location || '');
  const [capacity, setCapacity] = useState(initialValues.capacity === undefined ? '' : initialValues.capacity);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, date, location, capacity: capacity === '' ? 0 : parseInt(capacity, 10) }); // Default capacity to 0 if empty
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} />
      </div>
      <div>
        <label htmlFor="date">Date:</label>
        <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} />
      </div>
      <div>
        <label htmlFor="capacity">Capacity (optional):</label>
        <input type="number" id="capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} style={{ width: '100%', padding: '8px', margin: '8px 0', boxSizing: 'border-box' }} />
      </div>
      <button type="submit" style={{ padding: '10px 15px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
    </form>
  );
};

export default EventForm;