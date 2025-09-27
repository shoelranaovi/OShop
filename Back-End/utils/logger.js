// logger.js
const { createLogger, transports, format } = require('winston');
const path = require('path');

// Custom formats
const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  })
);

// Create logger instance
const logger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new transports.Console(), // Console log
    new transports.File({ filename: path.join(__dirname, '../logs', 'error.log'), level: 'error' }),
    new transports.File({ filename: path.join(__dirname, '../logs', 'combined.log') }),
  ],
});

module.exports = logger;
