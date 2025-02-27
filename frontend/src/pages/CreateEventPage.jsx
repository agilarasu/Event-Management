import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm';
import * as api from '../services/api';

const CreateEventPage = () => {
  const navigate = useNavigate();

  const handleCreateEvent = async (eventData) => {
    try {
      await api.createEvent(eventData);
      alert('Event created successfully!'); // Simple success alert, improve UI later
      navigate('/my-events'); // Redirect to my events page after creation
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create event.'); // Simple error alert, improve UI later
      console.error("Error creating event:", err);
    }
  };

  return (
    <div>
      <h2>Create New Event</h2>
      <EventForm onSubmit={handleCreateEvent} />
    </div>
  );
};

export default CreateEventPage;