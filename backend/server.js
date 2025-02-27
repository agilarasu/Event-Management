const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');

dotenv.config(); // Load environment variables
connectDB();      // Connect to MongoDB

const app = express();

app.use(cors());          // Enable CORS for cross-origin requests
app.use(express.json({ limit: '50mb' }));  // Parse JSON request bodies
app.use(express.urlencoded({ limit: '50mb' , extended: true }));
// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});