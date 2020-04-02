import mongoose from 'mongoose';

const { Schema } = mongoose;

const bugReportSchema = new Schema(
  {
    severity: {
      type: String,
      default : ''
    },
    bugDescription :{
      type: String,
      default : ''
    },
    projectID: {
      type: Schema.Types.ObjectId,
      ref: 'project',
    },
    testID: {
      type: Schema.Types.ObjectId,
      ref: 'test',
    },
    path :{
      type: String,
      default : ''
    },
  }
);

const bugReport = mongoose.model('bugReport', bugReportSchema);

export default bugReport;
