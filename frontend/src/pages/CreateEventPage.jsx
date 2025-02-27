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
    <div className="container mx-auto px-4  w-[60%] py-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Create New Event</h2>
      <div className="bg-white shadow-md rounded-lg p-6 mx-auto">
        <EventForm onSubmit={handleCreateEvent} />
      </div>
    </div>
  );
};

export default CreateEventPage;