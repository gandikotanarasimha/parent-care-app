// File: server/routes/providerRoutes.js

const express = require('express');
const router = express.Router();
const {
  getAvailableJobs,
  acceptJob,
  getMyJobs,
  getMyInvitations,
} = require('../controllers/providerController');
const { protect, isProvider } = require('../middleware/authMiddleware');

// Protect all these routes: must be logged in AND be a 'Provider'
router.use(protect);
router.use(isProvider);

// Get all 'Pending' jobs
router.route('/available-jobs').get(getAvailableJobs);
router.route('/invitations').get(getMyInvitations); // GET /api/provider/invitations

// Get all jobs for this provider
router.route('/my-jobs').get(getMyJobs);

// Accept a job
router.route('/jobs/:id/accept').put(acceptJob);

module.exports = router;