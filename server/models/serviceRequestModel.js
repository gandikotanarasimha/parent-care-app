// File: server/models/serviceRequestModel.js

const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema({
  requesterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  beneficiaryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Beneficiary',
  },
  providerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  serviceDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Invited', 'Accepted', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
  negotiatedRate: {
    type: Number,
    default: null,
  },
}, { timestamps: true });

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);
module.exports = ServiceRequest;
