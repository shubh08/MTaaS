const mongoose = require('mongoose');

const { Schema } = mongoose;

const applicationSchema = new Schema(
  {
    status: {
      type: String,
      default : 'Pending'
    },
    managerID:{
      type: Schema.Types.ObjectId,
      ref: 'manager',
    },
    projectID: {
      type: Schema.Types.ObjectId,
      ref: 'project',
    },
    testerID: {
      type: Schema.Types.ObjectId,
      ref: 'tester',
    },
    appliedOn: {
      type: Date,
      default:Date.now(),
    },
  }
);

const application = mongoose.model('application', applicationSchema);

module.exports= application;
