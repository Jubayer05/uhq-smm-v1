// ✅ Correct version of controller
const SystemError = require('../../models/SystemErrors');


const addSystemErrors =  async(req, res) =>{
     try {
    const log = {
      id: Date.now().toString(),
      type: '404 Not Found',
      source: 'Frontend (Vendor)',
      message: 'Invalid route visited',
      affectedApi: req.body.path,
      dateTime: new Date().toISOString()
    };

    await SystemError.create(log);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to log frontend error:', error.message);
    res.status(500).json({ success: false, message: 'Error logging frontend error' });
  }
};

const getSystemErrors = async (req, res) => {
  try {
    let errors;

    if (req.user?.isAdmin) {
      errors = await SystemError.find().sort({ dateTime: -1 });
    } else {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.status(200).json({ success: true, errors });
  } catch (err) {
    console.error('Error fetching system errors:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch system errors' });
  }
};

module.exports = { getSystemErrors , addSystemErrors};
