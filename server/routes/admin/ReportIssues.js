const express = require('express');
const router = express.Router();
const {
  createReport,
  getAllReports,
  getSingleReport,
  updateReport,
  deleteReport,
  updateReportStatus
} = require('../../controllers/admin/ReportIssues');

const { authMiddleware } = require('../../controllers/auth/auth-controller'); // Auth middleware

router.post('/addIssue', authMiddleware, createReport);
router.get('/getAllIssues', authMiddleware, getAllReports);
router.get('/getSingleIssue/:id', authMiddleware, getSingleReport);
router.put('/updateIssue/:id/status', authMiddleware, updateReport);
router.put('/updateIssueStatus/:id', authMiddleware, updateReportStatus);
router.delete('/deleteIssue/:id', authMiddleware, deleteReport);

module.exports = router;
