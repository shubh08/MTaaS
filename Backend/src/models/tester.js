const mongoose = require('mongoose');
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
    email: {
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
testerSchema.plugin(uniqueValidator);
const tester = mongoose.model('tester', testerSchema);

module.exports=tester;
