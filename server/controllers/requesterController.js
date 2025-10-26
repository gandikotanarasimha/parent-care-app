// File: server/controllers/requesterController.js

const Beneficiary = require('../models/beneficiaryModel');
const ServiceRequest = require('../models/serviceRequestModel');
const User = require('../models/userModel');

// @desc    Add a new beneficiary
// @route   POST /api/requester/beneficiaries
exports.addBeneficiary = async (req, res) => {
  try {
    const { name, address, phone, notes } = req.body;

    const beneficiary = new Beneficiary({
      requesterId: req.user._id, // from the 'protect' middleware
      name,
      address,
      phone,
      notes,
    });

    const createdBeneficiary = await beneficiary.save();
    res.status(201).json(createdBeneficiary);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
exports.getAllProviders = async (req, res) => {
  try {
    // Find all users who are Providers. Only select a few public fields.
    const providers = await User.find({ role: 'Provider' }).select(
      'name location bio verified'
    );
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
}
};
exports.inviteProvider = async (req, res) => {
  try {
    const {
      providerId,
      beneficiaryId,
      title,
      description,
      serviceDate,
    } = req.body;

    // 1. Find the beneficiary to get their address
    const beneficiary = await Beneficiary.findById(beneficiaryId);
    if (!beneficiary) {
      return res.status(404).json({ message: 'Beneficiary not found' });
    }
    // 2. Check if this beneficiary belongs to the logged-in user
    if (beneficiary.requesterId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    // 3. Create the service request with status "Invited"
    const serviceRequest = new ServiceRequest({
      requesterId: req.user._id,
      beneficiaryId: beneficiaryId,
      providerId: providerId, // Assign to the specific provider
      title,
      description,
      serviceDate,
      location: beneficiary.address,
      status: 'Invited', // Set status to 'Invited'
    });

    const createdRequest = await serviceRequest.save();
    res.status(201).json(createdRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getMyServiceRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find({ requesterId: req.user._id })
      .populate('beneficiaryId', 'name')
      .populate('providerId', 'name'); // Show who accepted it

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
// @desc    Get all of the logged-in user's beneficiaries
// @route   GET /api/requester/beneficiaries
exports.getMyBeneficiaries = async (req, res) => {
  try {
    const beneficiaries = await Beneficiary.find({ requesterId: req.user._id });
    res.json(beneficiaries);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getAllProviders = async (req, res) => {
  try {
    // Find all users who are Providers. Only select a few public fields.
    const providers = await User.find({ role: 'Provider' }).select(
      'name location bio verified'
    );
    res.json(providers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


// @desc    Create a new public service request (Job Board)
// @route   POST /api/requester/service-requests
exports.createServiceRequest = async (req, res) => {
  try {
    const { beneficiaryId, title, description, serviceDate } = req.body;
    
    const beneficiary = await Beneficiary.findById(beneficiaryId);
    if (!beneficiary) {
      return res.status(404).json({ message: 'Beneficiary not found' });
    }

    if (beneficiary.requesterId.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const serviceRequest = new ServiceRequest({
      requesterId: req.user._id,
      beneficiaryId: beneficiaryId,
      title,
      description,
      serviceDate,
      location: beneficiary.address, // Auto-fill the location
      status: 'Pending',
    });

    const createdRequest = await serviceRequest.save();
    res.status(201).json(createdRequest);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
