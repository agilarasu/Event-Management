import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { AlertTriangle, User, Mail, Lock, Users } from 'lucide-react'; // Import Lucide Icons

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('participant'); // Default role
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register({ name, email, password, role });
      navigate('/'); // Redirect to home after registration
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10 flex justify-center items-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Register</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <AlertTriangle className="absolute left-2 top-3" />
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-500" />
                <span>Name:</span>
              </div>
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Your Name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-gray-500" />
                <span>Email:</span>
              </div>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Your Email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
              <div className="flex items-center space-x-2">
                <Lock className="h-5 w-5 text-gray-500" />
                <span>Password:</span>
              </div>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Choose a strong password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-gray-500" />
                <span>Role:</span>
              </div>
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="participant">Participant</option>
              <option value="organizer">Organizer</option>
            </select>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition-colors duration-200"
            >
              Register
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?
            <Link to="/login" className="text-indigo-600 hover:text-indigo-800 transition-colors duration-200 ml-1">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;