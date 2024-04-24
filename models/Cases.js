const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dates: [
    {
      date : {
        type: Date,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    }
  ]
}, { timestamps: true });

const Case = mongoose.model('Case', caseSchema);
module.exports = Case;