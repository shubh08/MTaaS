const mongoose = require('mongoose');

const { Schema } = mongoose;

const bugReportSchema = new Schema(
  {
    projectName: {
      type: String,
      default : ''
    },
    severity: {
      type: String,
      default : ''
    },
    operatingSystem: {
      type: String,
      default : ''
    },
    operatingSystemVersion: {
      type: String,
      default : ''
    },
    bugDescription :{
      type: String,
      default : ''
    },
    date: {
      type: String,
      default : ''
    },
    testerID: {
      type: Schema.Types.ObjectId,
      ref: 'tester',
    },
    testID: {
      type: Schema.Types.ObjectId,
      ref: 'test',
    }
  }
);

const bugReport = mongoose.model('bugReport', bugReportSchema);

module.exports= bugReport;
