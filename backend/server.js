// Importing dependencies
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config(); // Make sure to load environment variables from .env

const app = express();

// Connecting to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected')) // On success
  .catch((err) => console.error('MongoDB connection error:', err)); // On error

// Server Setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
