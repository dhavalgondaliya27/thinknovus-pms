const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const ProjectTeam = new mongoose.Schema(
  {
    project_id: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
    },
    project_manager_id: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    supervisor_id: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    support_person_id: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    team_member_id: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('ProjectTeam', ProjectTeam);
