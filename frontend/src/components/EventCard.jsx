import React from 'react';
import { Link } from 'react-router-dom';
import defaultThumbnail from '../assets/default-event-thumbnail.png'; // Import default thumbnail image

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* **Thumbnail Image** */}
      <img
        className="w-full h-48 object-cover" // Image styling: full width, fixed height, cover aspect
        src={event.thumbnail || defaultThumbnail}
        alt={event.title}
        onError={(e) => { e.target.src = defaultThumbnail; }}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate"> {/* Title styling */}
          <Link to={`/events/${event._id}`} className="hover:text-indigo-600 transition-colors duration-200">
            {event.title}
          </Link>
        </h3>
        <p className="text-gray-600 text-sm mb-1"> {/* Date styling */}
          Date: {new Date(event.date).toLocaleDateString()}
        </p>
        <p className="text-gray-600 text-sm mb-1 truncate"> {/* Location styling */}
          Location: {event.location}
        </p>
        <p className="text-gray-600 text-sm truncate"> {/* Organizer styling */}
          Organizer: {event.organizer?.name}
        </p>
      </div>
    </div>
  );
};

export default EventCard;