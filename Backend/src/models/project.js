const mongoose = require('mongoose');

const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Project name is mandatory'],
    },
    startDate: {
      type: Date,
      required: [true, 'Project start date is mandatory'],
    },
    endDate: {
      type: Date,
      required: [true, 'Project end date is mandatory'],
    },
    description: {
        type: String,
        default: '',
    },
    technologies: {
        type: String,
        default: '',
    },
    testCriteria: {
      type: String,
      default: '',
  },
    managerID: {
        type: Schema.Types.ObjectId,
        ref: 'manager',
    },
    testerID: [{
        type: Schema.Types.ObjectId,
        ref: 'tester',
    }],
    activeApplication:[{
      type: Schema.Types.ObjectId,
      ref: 'tester',
    }],
    rejectedApplication:[{
      type: Schema.Types.ObjectId,
      ref: 'tester',
    }],
    commanfiles: [],
  }
);
projectSchema.plugin(uniqueValidator);
const project = mongoose.model('project', projectSchema);

module.exports= project;
