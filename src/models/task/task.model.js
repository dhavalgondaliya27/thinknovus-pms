const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const Task = new mongoose.Schema(
  {
    project_id: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
    client_id: {
      type: Schema.Types.ObjectId,
      ref: 'Client',
    },
    ticket_id: {
      type: String,
    },
    assigned_by_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    assignee_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    sub_task_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: 'SubTask',
      },
    ],
    task_name: {
      type: String,
    },
    task_status: {
      type: String,
      enum: ['Pending', 'Hold', 'Completed', 'Cancelled', 'Archived'],
    },
    task_priority: {
      type: String,
      enum: ['High', 'Medium', 'Low', 'Clear'],
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    working_hours: {
      type: Number,
    },
    section: {
      type: String,
    },
    sub_section: {
      type: String,
    },
    rating: {
      type: Number,
    },
    task_timing: [
      {
        start_time: {
          type: Date,
        },
        end_time: {
          type: Date,
        },
        remark: {
          type: String,
        },
        task_photo: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Task', Task);
