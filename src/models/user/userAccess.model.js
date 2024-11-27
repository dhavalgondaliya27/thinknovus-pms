const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserAccess = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    active_auto_attendance:{
      type: Boolean,
      default: false,
    },
    consider_as_billable:{
      type:Boolean,
      default: false,
    },
    allow_interview:{
      type:Boolean,
      default: false,
    },
    allow_location_tracking:{
      type:Boolean,
      default: false,
    },
    enable_support:{
      type:Boolean,
      default: false,
    },
    work_mark_as_checked:{
      type:Boolean,
      default: false,
    },
    allow_punchin_form:{
      type:String,
      enum: ['Default all', 'Web', 'Mobile', 'Desktop','Punch In Device'],
      default:'Default all',
    },
    expertise:{
      type:String,
    },
    duties:{
      type:String,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('UserAccess', UserAccess);
