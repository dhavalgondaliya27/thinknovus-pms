const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const SubTask = new mongoose.Schema(
  {
    project_id: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
    sub_ticket_id: {
      type: String,
    },
    sub_assigned_by_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    sub_assignee_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    sub_task_name: {
      type: String,
    },
    sub_task_status: {
      type: String,
      enum: ['Pending', 'Hold', 'Completed', 'Cancelled', 'Archived'],
    },
    sub_task_priority: {
      type: Boolean,
    },
    sub_task_start_date: {
      type: Date,
    },
    sub_task_end_date: {
      type: Date,
    },
    sub_task_working_hours: {
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
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('SubTask', SubTask);
