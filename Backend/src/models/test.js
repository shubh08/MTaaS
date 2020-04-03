const mongoose = require('mongoose');

const { Schema } = mongoose;

const testSchema = new Schema(
  {
    projectID: {
      type: Schema.Types.ObjectId,
      ref: 'project',
    },
    startTime: {
      type: Date,
      required: [true, 'Start Date is mandatory'],
    },
    endTime: {
      type: Date,
      required: [true, 'End Date is mandatory'],
    },
    path: {
      type: String
    },
  }
);

const test = mongoose.model('test', testSchema);

module.exports=test;
