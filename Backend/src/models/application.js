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
  }
);

const application = mongoose.model('application', applicationSchema);

module.exports= application;
