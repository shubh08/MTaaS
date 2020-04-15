const mongoose = require('mongoose');

const { Schema } = mongoose;

const devicePoolSchema = new Schema(
  {
    projectID: {
      type: Schema.Types.ObjectId,
      ref: 'project'
    },
    devicePoolName: {
      type: String
    },
    devicePoolARN: {
      type: String
    }
  }
);

const devicePool = mongoose.model('devicePool', devicePoolSchema);

module.exports=devicePool;
