const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const Project = new mongoose.Schema(
  {
    client_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    project_name: {
      type: String,
      required: true,
    },
    department_id: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
    },
    project_by_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    project_start_date: {
      type: Date,
    },
    project_end_date: {
      type: Date,
    },
    version: {
      type: String,
    },
    priority: {
      type: String,
      enum:['High','Medium','Low','Critical'],
    },
    project_status: {
      type: String,
      enum: [
        'cancelled',
        'completed',
        'hold',
        'maintenance',
        'pending',
        'preliminary',
        'progressing',
      ],
    },
    project_domain: {
      type: String,
    },
    database_details: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Project', Project);
