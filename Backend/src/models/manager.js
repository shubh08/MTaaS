const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const { Schema } = mongoose;

const managerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Project name is mandatory'],
    },
    about: {
      type: String,
      default: '',
    },
    company: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        default: '',
        required: [true, 'Manager emailid is mandatory'],
        unique : true,
    },
    password: {
        type: String,
        default: '',
        required: [true, 'Manager password is mandatory'],
    },
    DOB: {
        type: Date,
        default: '',
        required: [true, 'Manager date of birth is mandatory'],
    },
    active: {
      type: Boolean,
      default: true
  },
    projectID: [{
        type: Schema.Types.ObjectId,
        ref: 'project',
    }],
    notificationID: [{
        type: Schema.Types.ObjectId,
        ref: 'notification',
    }],
  }
);
managerSchema.plugin(uniqueValidator);
const manager = mongoose.model('manager', managerSchema);

module.exports= manager;
