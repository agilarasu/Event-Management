import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';
import EventCard from '../components/EventCard';

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
        if (user.role === 'organizer') {
          const { data: organizedData } = await api.getOrganizedEvents();
          setOrganizedEvents(organizedData);
        } else if (user.role === 'participant') {
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
    return <div>Loading my events...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <h2>My Events</h2>
      {user?.role === 'organizer' && (
        <div>
          <h3>Organized Events</h3>
          {organizedEvents.length > 0 ? (
            organizedEvents.map(event => <EventCard key={event._id} event={event} />)
          ) : (
            <p>No events organized yet.</p>
          )}
        </div>
      )}
      {user?.role === 'participant' && (
        <div>
          <h3>Joined Events</h3>
          {joinedEvents.length > 0 ? (
            joinedEvents.map(event => <EventCard key={event._id} event={event} />)
          ) : (
            <p>No events joined yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyEventsPage;