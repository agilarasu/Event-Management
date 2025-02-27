import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); // Redirect to login after logout
  };

  return (
    <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <Link to="/" style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold', marginRight: '20px' }}>Event Management</Link>
        <Link to="/" style={{ textDecoration: 'none', color: 'black', marginRight: '10px' }}>Events</Link>
        {user && user.role === 'organizer' && (
          <Link to="/create-event" style={{ textDecoration: 'none', color: 'black', marginRight: '10px' }}>Create Event</Link>
        )}
        {user && (
          <Link to="/my-events" style={{ textDecoration: 'none', color: 'black', marginRight: '10px' }}>My Events</Link>
        )}
      </div>
      <div>
        {user ? (
          <>
            <span style={{ marginRight: '10px' }}>Welcome, {user.name} ({user.role})</span>
            <button onClick={handleLogout} style={{ padding: '5px 10px', cursor: 'pointer' }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: 'none', color: 'black', marginRight: '10px' }}>Login</Link>
            <Link to="/register" style={{ textDecoration: 'none', color: 'black' }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;