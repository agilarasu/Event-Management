import React, { useState, useEffect } from 'react';
import * as api from '../services/api';
import EventCard from '../components/EventCard';

const EventListPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError('');
      try {
        const { data } = await api.getAllEvents();
        setEvents(data);
      } catch (err) {
        setError('Failed to load events.');
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600 text-lg font-semibold">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-lg font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">All Events</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventListPage;