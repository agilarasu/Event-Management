import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventForm from '../components/EventForm';
import * as api from '../services/api';
import { CalendarPlus } from 'lucide-react';

const CreateEventPage = () => {
    const navigate = useNavigate();

    const handleCreateEvent = async (eventData) => { // eventData will be FormData
        try {
            await api.createEvent(eventData); // Send FormData directly
            alert('Event created successfully!');
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to create event.');
            console.error("Error creating event:", err);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 md:py-10 lg:py-12">
            <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-8 lg:p-10">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4 md:mb-6 lg:mb-8 flex items-center justify-center md:justify-start">
                    <CalendarPlus className="mr-2 md:mr-3" size={24} />
                    Create New Event
                </h2>
                <EventForm onSubmit={handleCreateEvent} />
            </div>
        </div>
    );
};

export default CreateEventPage;