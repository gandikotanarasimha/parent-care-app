// File: server/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Allow requests from other origins
app.use(express.json()); // Allow our app to accept JSON

// --- Database Connection ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

connectDB();

// --- Simple Test Route ---
app.get('/', (req, res) => {
  res.send('API is running...');
});

// --- Import and Use Routes ---
// (We will add these in the next steps)
const authRoutes = require('./routes/authRoutes');
const requesterRoutes = require('./routes/requesterRoutes');
const providerRoutes = require('./routes/providerRoutes');
app.use('/api/auth', authRoutes);
app.use('/api/requester', requesterRoutes);
app.use('/api/provider', providerRoutes);


// --- Start Server ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));