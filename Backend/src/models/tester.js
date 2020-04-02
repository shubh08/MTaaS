import mongoose from 'mongoose';
const uniqueValidator = require('mongoose-unique-validator')
const { Schema } = mongoose;

const testerSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Tester name is mandatory'],
    },
    about: {
      type: String,
      default: '',
    },
    technologies: {
        type: String,
        default: '',
    },
    emailID: {
        type: String,
        default: '',
        required: [true, 'Tester emailid is mandatory'],
        unique : true,
    },
    password: {
        type: String,
        default: '',
        required: [true, 'Tester password is mandatory'],
    },
    DOB: {
        type: Date,
        default: '',
        required: [true, 'Tester date of birth is mandatory'],
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
testerSchema.plugin(uniqueValidator);
const tester = mongoose.model('tester', testerSchema);

export default tester;
