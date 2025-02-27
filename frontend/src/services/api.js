import axios from 'axios';

const API_BASE_URL = '/api'; // Using proxy defined in vite.config.js, or your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // If you need to send cookies
});

// Request interceptor to include token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = (userData) => api.post('/users/register', userData);
export const loginUser = (userData) => api.post('/users/login', userData);
export const getUserProfile = () => api.get('/users/profile');

export const createEvent = (eventData) => api.post('/events', eventData);
export const getAllEvents = () => api.get('/events');
export const getEventById = (eventId) => api.get(`/events/${eventId}`);
export const updateEvent = (eventId, eventData) => api.put(`/events/${eventId}`, eventData);
export const deleteEvent = (eventId) => api.delete(`/events/${eventId}`);
export const registerForEvent = (eventId) => api.post(`/events/${eventId}/register`);
export const getOrganizedEvents = () => api.get('/events/organized');
export const getJoinedEvents = () => api.get('/events/joined');

export default api;