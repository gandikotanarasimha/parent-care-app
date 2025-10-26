// File: server/routes/requesterRoutes.js

const express = require('express');
const router = express.Router();
const {
  addBeneficiary,
  getMyBeneficiaries,
  createServiceRequest,
  getAllProviders,
  inviteProvider,
  getMyServiceRequests, // This import is correct
} = require('../controllers/requesterController');
const { protect, isRequester } = require('../middleware/authMiddleware');

// Protect all these routes: must be logged in AND be a 'Requester'
router.use(protect);
router.use(isRequester);

// --- Beneficiary Routes ---
// POST /api/requester/beneficiaries
// GET  /api/requester/beneficiaries
router.route('/beneficiaries').post(addBeneficiary).get(getMyBeneficiaries);

// --- Service Request Routes ---
// This is the line you are changing
router
  .route('/service-requests')
  .post(createServiceRequest)
  .get(getMyServiceRequests); // <-- ADD THIS PART

// --- Provider browsing routes ---
router.route('/providers').get(getAllProviders); // GET /api/requester/providers
router.route('/invite').post(inviteProvider); // POST /api/requester/invite

module.exports = router;