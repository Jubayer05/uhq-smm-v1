const Report = require('../../models/OrderReport');

// ✅ All your controller logic goes here (as you wrote it)
const createReport = async (req, res) => {
  const { issueType, serviceStatus, description, service } = req.body;
  const userId = req.user.id;

  if (!issueType || !serviceStatus || !description || !service) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const report = new Report({
      user: userId,
      issueType,
      service,
      description,
      serviceStatus,
    });
    await report.save();
    console.log('Saved Report:', report);

    res.status(201).json({
      success: true,
      message: 'Issue reported',
      report
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to create report',
      error: err.message
    });
  }
};


// Get reports by user
const getReportsByUser = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.params.userId })
      .populate('user', 'name email');

    res.status(200).json({ success: true, reports });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch reports', error: err.message });
  }
};

// Get all reports (admin)
const getAllReports = async (req, res) => {
  try {
    let reports;

    if (req.user.isAdmin) {
      // Admin: fetch all reports
      reports = await Report.find()
        .populate('user', 'name email');
    } else {
      // Vendor/User: fetch only their own reports
      reports = await Report.find({ user: req.user._id })
        .populate('user', 'name email');
    }

    res.status(200).json({ success: true, reports });
  } catch (err) {
    console.error('Error fetching reports:', err.message);
    res.status(500).json({ success: false, message: 'Failed to fetch reports' });
  }
};

// Get single report
const getSingleReport = async (req, res) => {
  const { id } = req.params;

  try {
    const report = await Report.findById(id).populate('user', 'name email');
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    res.status(200).json({ success: true, report });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch report', error: err.message });
  }
};

// Update report status or description
const updateReport = async (req, res) => {
  const { id } = req.params;
  const { serviceStatus, description } = req.body;

  try {
    const report = await Report.findById(id);
    if (!report) return res.status(404).json({ message: 'Report not found' });

    if (serviceStatus) report.serviceStatus = serviceStatus;
    if (description) report.description = description;

    await report.save();

    res.status(200).json({ success: true, message: 'Report updated', report });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to update report', error: err.message });
  }
};

// Delete a report
const deleteReport = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Report.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Report not found' });

    res.status(200).json({ success: true, message: 'Report deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to delete report', error: err.message });
  }
};
// Update only the service status of a report
const updateReportStatus = async (req, res) => {
  const { id } = req.params;
  const { serviceStatus } = req.body;

  if (!serviceStatus) {
    return res.status(400).json({ success: false, message: 'Service status is required' });
  }

  try {
    const report = await Report.findById(id);
    if (!report) {
      return res.status(404).json({ success: false, message: 'Report not found' });
    }

    report.serviceStatus = serviceStatus;
    await report.save();

    res.status(200).json({
      success: true,
      message: 'Service status updated successfully',
      report,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to update service status',
      error: err.message,
    });
  }
};


module.exports = {
  createReport,
  getReportsByUser,
  getAllReports,
  getSingleReport,
  updateReport,
  deleteReport,
  updateReportStatus
};
