import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as api from '../services/api';
import { useAuth } from '../context/AuthContext';

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
    return <div>Loading event details...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (!event) {
    return <div>Event not found.</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '700px', margin: '20px auto', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>{event.title}</h2>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()} {new Date(event.date).toLocaleTimeString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Organizer:</strong> {event.organizer?.name} ({event.organizer?.email})</p>
      {event.capacity > 0 && <p><strong>Capacity:</strong> {event.capacity}</p>}
      <p><strong>Participants:</strong> {event.participants?.length || 0}</p>
      {user && user.role === 'participant' && !event.participants?.some(p => p._id === user._id) && (
        <button onClick={handleRegister} style={{ padding: '10px 15px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Register for Event</button>
      )}
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
    </div>
  );
};

export default EventDetailPage;