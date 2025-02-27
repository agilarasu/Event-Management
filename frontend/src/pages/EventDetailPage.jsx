import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../services/api';
import { useAuth } from '../context/AuthContext';
import defaultThumbnail from '../assets/default-event-thumbnail.png'; // Import default thumbnail
import { Calendar, MapPin, User, Users, AlertTriangle } from 'lucide-react'; // Lucide Icons

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.getEventById(id);
        setEvent(data);
      } catch (err) {
        setError('Failed to load event details.');
        console.error("Error fetching event details:", err);
        navigate('/'); // Redirect to event list on error
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, navigate]);

  const handleRegister = async () => {
    if (!user) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }
    try {
      await api.registerForEvent(id);
      alert('Registered for event successfully!'); // Simple success alert, improve UI later
      // Optionally refresh event details to update participant list
      fetchEvent(); // Re-fetch event details after registration
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register for event.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600 text-lg font-semibold">Loading event details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-10 flex justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <AlertTriangle className="absolute left-2 top-3" />
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600 text-lg font-semibold">Event not found.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-screen-lg"> {/* 80% screen width on larger screens */}
        <div className="mb-8 flex justify-center">
          <img
            className="max-w-3xl w-4/5 rounded-lg shadow-md object-cover aspect-video" // reduced width, centered
            src={event.thumbnail || defaultThumbnail}
            alt={event.title}
            onError={(e) => { e.target.src = defaultThumbnail; }} // Fallback for broken URL
          />
        </div>

        {/* **Title and Description** */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">{event.title}</h2>
        <p className="text-gray-700 text-lg">{event.description}</p>
      </div>

      {/* **Event Details Cards Grid** */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Date Card */}
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-3">
          <Calendar className="text-gray-500 h-6 w-6" />
          <div>
            <h4 className="text-gray-800 font-semibold">Date & Time</h4>
            <p className="text-gray-600 text-sm">
              {new Date(event.date).toLocaleDateString()} <br/>
              {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>

        {/* Location Card */}
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-3">
          <MapPin className="text-gray-500 h-6 w-6" />
          <div>
            <h4 className="text-gray-800 font-semibold">Location</h4>
            <p className="text-gray-600 text-sm">{event.location}</p>
          </div>
        </div>

        {/* Organizer Card */}
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-3">
          <User className="text-gray-500 h-6 w-6" />
          <div>
            <h4 className="text-gray-800 font-semibold">Organizer</h4>
            <p className="text-gray-600 text-sm">{event.organizer?.name}</p>
            <p className="text-gray-600 text-sm">{event.organizer?.email}</p>
          </div>
        </div>

        {/* Capacity Card (Conditional) */}
        {event.capacity > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-3">
            <Users className="text-gray-500 h-6 w-6" />
            <div>
              <h4 className="text-gray-800 font-semibold">Capacity</h4>
              <p className="text-gray-600 text-sm">{event.capacity} people</p>
            </div>
          </div>
        )}

        {/* Participants Card */}
        <div className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-3">
          <Users className="text-gray-500 h-6 w-6" />
          <div>
            <h4 className="text-gray-800 font-semibold">Participants</h4>
            <p className="text-gray-600 text-sm">{event.participants?.length || 0} registered</p>
          </div>
        </div>
      </div>

      {/* **Register Button** */}
      {user && user.role === 'participant' && !event.participants?.some(p => p._id === user._id) && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleRegister}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-200"
          >
            Register for Event
          </button>
        </div>
      )}
       {error && (
        <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <AlertTriangle className="absolute left-2 top-3" />
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
    </div>
  );
};

export default EventDetailPage;