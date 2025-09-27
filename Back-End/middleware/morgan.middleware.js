// morgan.middleware.js
const morgan = require('morgan');
const logger = require('../utils/logger');

// Custom token for user-agent or anything else
morgan.token('user-agent', (req) => req.headers['user-agent']);

// Custom format
const morganFormat = ':method :url :status :res[content-length] - :response-time ms - :user-agent';

// Create stream that writes to Winston
const stream = {
  write: (message) => logger.info(message.trim())
};

const skip = () => {
  const env = process.env.NODE_ENV || 'development';
  return env !== 'development'; // skip console logging in production
};

const morganMiddleware = morgan(morganFormat, { stream, skip });

module.exports = morganMiddleware;
