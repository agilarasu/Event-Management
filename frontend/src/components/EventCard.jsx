import React from 'react';
import { Link } from 'react-router-dom';

const EventCard = ({ event }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px', borderRadius: '5px' }}>
      <h3><Link to={`/events/${event._id}`} style={{ textDecoration: 'none', color: 'blue' }}>{event.title}</Link></h3>
      <p>Date: {new Date(event.date).toLocaleDateString()}</p>
      <p>Location: {event.location}</p>
      <p>Organizer: {event.organizer?.name}</p>
    </div>
  );
};

export default EventCard;