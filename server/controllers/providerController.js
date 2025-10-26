// File: server/controllers/providerController.js

const ServiceRequest = require('../models/serviceRequestModel');

// @desc    Get all available jobs (status: Pending)
// @route   GET /api/provider/available-jobs
// @access  Private (Provider only)
exports.getAvailableJobs = async (req, res) => {
  try {
    // Find all jobs that are 'Pending'
    const jobs = await ServiceRequest.find({ status: 'Pending' })
      .populate('beneficiaryId', 'name address notes') // Show some beneficiary info
      .populate('requesterId', 'name'); // Show the requester's name

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Accept a job
// @route   PUT /api/provider/jobs/:id/accept
// @access  Private (Provider only)
exports.acceptJob = async (req, res) => {
  try {
    const job = await ServiceRequest.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if job is still pending
    if (job.status !== 'Pending') {
      return res.status(400).json({ message: 'Job is no longer available' });
    }

    // Accept the job
    job.status = 'Accepted';
    job.providerId = req.user._id; // Assign this provider to the job

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all jobs accepted by the logged-in provider
// @route   GET /api/provider/my-jobs
// @access  Private (Provider only)
exports.getMyInvitations = async (req, res) => {
  try {
    const invitations = await ServiceRequest.find({
      providerId: req.user._id, // Match the logged-in provider
      status: 'Invited', // Only show 'Invited' jobs
    })
      .populate('beneficiaryId', 'name address notes')
      .populate('requesterId', 'name');

    res.json(invitations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await ServiceRequest.find({ providerId: req.user._id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};