const mongoose = require('mongoose');

const { Schema } = mongoose;

const notificationSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, 'Description is mandatory'],
    },
    managerID:{
      type: Schema.Types.ObjectId,
      ref: 'manager',
    },
    projectID: {
      type: Schema.Types.ObjectId,
      ref: 'project',
    },
    createdOn :{
      type: Date,
    },
    severity: {
      type: String
    }
  }
);

const notification = mongoose.model('notification', notificationSchema);
module.exports= notification;
