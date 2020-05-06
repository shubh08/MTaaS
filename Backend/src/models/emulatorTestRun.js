const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')
const { Schema } = mongoose;

var emulatorTestRunSchema=new Schema({
    userName: {
        type: String
      },
      projectName:{
        type: String
      },
    name:{
        type: String,
        required: [true, 'Test Runner Name is mandatory'],
      },
    platform:{
        type: String
      },
    status:{
        type: String
      },
    result:{
        type: String
      },
    totalJobs:Number,
    deviceMinutes:Number,
    passed : Number,
    failed: Number
});

emulatorTestRunSchema.plugin(uniqueValidator);
const emulatortestRun = mongoose.model('emulatortestRun', emulatorTestRunSchema);

module.exports = emulatortestRun;

