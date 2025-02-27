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
    <nav className="bg-white shadow-md py-4"> {/* Navigation bar container with white background, shadow and padding */}
      <div className="container mx-auto px-4 flex justify-between items-center"> {/* Container to center content and add horizontal padding, flex for layout */}
        <div className="flex items-center space-x-6"> {/* Container for left side links with spacing */}
          <Link to="/" className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition duration-200"> {/* Brand link - larger text, bold, dark gray, hover effect */}
            Event Management
          </Link>
          <Link to="/" className="text-gray-600 hover:text-blue-500 transition duration-200"> {/* Events link - gray text, hover effect */}
            Events
          </Link>
          {user && user.role === 'organizer' && (
            <Link to="/create-event" className="text-gray-600 hover:text-blue-500 transition duration-200"> {/* Create Event link - gray text, hover effect */}
              Create Event
            </Link>
          )}
          {user && (
            <Link to="/my-events" className="text-gray-600 hover:text-blue-500 transition duration-200"> {/* My Events link - gray text, hover effect */}
              My Events
            </Link>
          )}
        </div>
        <div className="flex items-center space-x-4"> {/* Container for right side auth links/user info with spacing */}
          {user ? (
            <div className="flex items-center space-x-4"> {/* Container for user info and logout button */}
              <span className="text-gray-700 text-sm"> {/* Welcome message - gray text, smaller size */}
                Welcome, {user.name} ({user.role})
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-500 transition duration-200"> {/* Login link - gray text, hover effect */}
                Login
              </Link>
              <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm"> 
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;