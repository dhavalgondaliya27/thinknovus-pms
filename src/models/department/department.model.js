const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const Department = new Schema(
  {
    department_name: {
      type: String,
    },
    department_type: {
      type: String,
      enum: [
        'Admin',
        'Development/Production',
        'Finance',
        'Marketing',
        'Purchase',
        'Sales',
        'Security',
        'Support',
      ],
    },
    department_status: {
      type: String,
      enum: ['active', 'inactive'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Department', Department);
