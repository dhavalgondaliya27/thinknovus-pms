const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const Client = new mongoose.Schema(
  {
    project_id: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
    company_name: {
      type: String,
    },
    client_name: {
      type: String,
    },
    client_phone: {
      type: String,
    },
    client_email: {
      type: String,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    zipcode: {
      type: String,
    },
    currency: {
      type: String,
    },
    source: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Client', Client);
