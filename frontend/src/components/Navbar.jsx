import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MenuIcon, XIcon } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Left side - Brand and Desktop Links */}
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition duration-200">
            Event Management
          </Link>
          {/* Desktop Links - Hidden on small screens */}
          <div className="hidden sm:flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-500 transition duration-200">
              Events
            </Link>
            {user && user.role === 'organizer' && (
              <Link to="/create-event" className="text-gray-600 hover:text-blue-500 transition duration-200">
                Create Event
              </Link>
            )}
            {user && (
              <Link to="/my-events" className="text-gray-600 hover:text-blue-500 transition duration-200">
                My Events
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu Button - Visible on small screens */}
        <div className="sm:hidden">
          <button onClick={toggleMobileMenu} className="text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500">
            {isMobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Right side - Auth Links / User Info - Hidden on small screens for mobile menu */}
        <div className="hidden sm:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 text-sm">
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
              <Link to="/login" className="text-gray-600 hover:text-blue-500 transition duration-200">
                Login
              </Link>
              <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu - Collapsible on small screens */}
      <div className={`sm:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 py-2 flex flex-col space-y-2">
          <Link to="/" className="block py-2 text-gray-600 hover:text-blue-500 transition duration-200 border-b border-gray-200">
            Events
          </Link>
          {user && user.role === 'organizer' && (
            <Link to="/create-event" className="block py-2 text-gray-600 hover:text-blue-500 transition duration-200 border-b border-gray-200">
              Create Event
            </Link>
          )}
          {user && (
            <Link to="/my-events" className="block py-2 text-gray-600 hover:text-blue-500 transition duration-200 border-b border-gray-200">
              My Events
            </Link>
          )}
          {user ? (
            <>
              <span className="block py-2 text-gray-700 text-sm border-b border-gray-200">
                Welcome, {user.name} ({user.role})
              </span>
              <button
                onClick={handleLogout}
                className="w-full text-left block py-2 text-red-500 hover:bg-gray-100 transition duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block py-2 text-gray-600 hover:text-blue-500 transition duration-200 border-b border-gray-200">
                Login
              </Link>
              <Link to="/register" className="block py-2 text-blue-500 hover:text-blue-700 transition duration-200">
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