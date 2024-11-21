const mongoose = require('mongoose');
const Schema = require('json-schema');

const employeePersonalDocsInfoSchema = new mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    panCardNum: { type: String, required: true },
    aadharCardNum: { type: String, required: true },
    pfNum: { type: String, required: true },
    passportNum: { type: String, required: false },
    aadharCardPhotoUrl: { type: String, required: true },
    panCardPhotoUrl: { type: String, required: true },
    experienceLetterPhoto: { type: String, required: false },
    passportPhoto: { type: String, required: false },
    addressProofPhoto: { type: String, required: false },
    relievingLetterPhoto: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model(
  'employeePersonalDocsInfo',
  employeePersonalDocsInfoSchema,
);
