const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const fileupload = require('express-fileupload');
require('dotenv').config();

// Import middleware
const errorHandler = require('./middleware/error');

// Route files
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const roleRoutes = require('./routes/roles');

// Create Express app
const app = express();

// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  max: 100, // 100 requests per windowMs
  windowMs: 15 * 60 * 1000, // 15 minutes
  message: 'Too many requests from this IP, please try again in 15 minutes!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'price',
      'ratingsAverage',
      'ratingsQuantity',
      'category',
      'subcategory',
      'inStock',
    ],
  })
);

// File uploading
app.use(fileupload());

// Enable CORS
app.use(cors());

// Compress all responses
app.use(compression());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Mount routers
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/roles', roleRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Welcome to TinyTots API',
    documentation: 'https://github.com/edogola4/tinytots-api#readme',
    version: '1.0.0',
  });
});

// Database connection
mongoose
  .connect(process.env.MONGODB_URI, {
    // Removed deprecated options
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s for local development
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Handle 404 - Must be after all other routes
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

// Error handling middleware
app.use(errorHandler);

module.exports = app;