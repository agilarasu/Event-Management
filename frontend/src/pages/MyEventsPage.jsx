import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';
import EventCard from '../components/EventCard';
import { CalendarCheck, ListChecks, AlertTriangle } from 'lucide-react';

const MyEventsPage = () => {
  const { user } = useAuth();
  const [organizedEvents, setOrganizedEvents] = useState([]);
  const [joinedEvents, setJoinedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyEvents = async () => {
      setLoading(true);
      setError('');
      try {
        if (user?.role === 'organizer') { // Check if user and role exist to avoid errors
          const { data: organizedData } = await api.getOrganizedEvents();
          setOrganizedEvents(organizedData);
        } else if (user?.role === 'participant') { // Check if user and role exist
          const { data: joinedData } = await api.getJoinedEvents();
          setJoinedEvents(joinedData);
        }
      } catch (err) {
        setError('Failed to load events.');
        console.error("Error fetching my events:", err);
      } finally {
        setLoading(false);
      }
    };
    if (user) { // Fetch only if user is loaded
      fetchMyEvents();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-600 text-lg font-semibold">Loading my events...</div>
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

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
        <ListChecks className="h-6 w-6 text-gray-700" />
        <span>My Events</span>
      </h2>

      {user?.role === 'organizer' && (
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center space-x-2">
            <CalendarCheck className="h-5 w-5 text-gray-600" />
            <span>Organized Events</span>
          </h3>
          {organizedEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {organizedEvents.map(event => <EventCard key={event._id} event={event} />)}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-md p-4 text-gray-500">
              <p>No events organized yet.</p>
            </div>
          )}
        </div>
      )}

      {user?.role === 'participant' && (
        <div>
          <h3 className="text-2xl font-semibold text-gray-700 mb-4 flex items-center space-x-2">
            <CalendarCheck className="h-5 w-5 text-gray-600" />
            <span>Joined Events</span>
          </h3>
          {joinedEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {joinedEvents.map(event => <EventCard key={event._id} event={event} />)}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-md p-4 text-gray-500">
              <p>No events joined yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MyEventsPage;