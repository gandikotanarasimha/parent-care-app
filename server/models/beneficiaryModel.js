// File: server/models/beneficiaryModel.js

const mongoose = require('mongoose');

const beneficiarySchema = new mongoose.Schema({
  requesterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
}, { timestamps: true });

const Beneficiary = mongoose.model('Beneficiary', beneficiarySchema);
module.exports = Beneficiary;