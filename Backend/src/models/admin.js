import mongoose from 'mongoose';

const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'admin name is mandatory'],
    },
    emailID: {
        type: String,
        default: '',
        required: [true, 'admin emailid is mandatory'],
        unique : true,
    },
    password: {
        type: String,
        default: '',
        required: [true, 'admin password is mandatory'],
    },
    DOB: {
        type: Date,
        default: '',
        required: [true, 'admin date of birth is mandatory'],
    },
  }
);
adminSchema.plugin(uniqueValidator);
const admin = mongoose.model('admin', adminSchema);

export default admin;
