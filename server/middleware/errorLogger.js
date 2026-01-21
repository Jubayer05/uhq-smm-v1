const SystemError = require('../models/SystemErrors');

const errorLogger = async (err, req, res, next) => {
  const log = {
    id: Date.now().toString(),
    type: getStatusType(err.status || 500),
    source: detectSource(req.originalUrl),
    message: err.message || 'Unhandled error',
    affectedApi: req.originalUrl,
    dateTime: new Date().toISOString()
  };

  try {
    await SystemError.create(log);
  } catch (e) {
    console.error('Failed to log system error:', e);
  }

  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
};

function getStatusType(status) {
  if (status === 404) return '404 Not Found';
  if (status === 401) return '401 Unauthorized';
  if (status === 503) return '503 Service Unavailable';
  return '500 Internal Server Error';
}

function detectSource(url) {
  if (url.includes('/payments')) return 'Payment Service';
  if (url.includes('/users')) return 'User Service';
  if (url.includes('/auth')) return 'Auth Service';
  if (url.includes('/vendor')) return 'Vendor Panel';
  if (url.includes('/admin')) return 'Admin Panel';
  return 'Unknown';
}

module.exports = errorLogger;
