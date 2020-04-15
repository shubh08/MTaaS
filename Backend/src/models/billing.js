const mongoose = require('mongoose');
var moment = require('moment');
const { Schema } = mongoose;

const billingSchema = new Schema(
  {
    projectID: {
      type: Schema.Types.ObjectId,
      ref: 'project',
    },
   totalMinutes:{
    type: Number
   },
    cost: {
      type: Number,
      required: [true, 'Cost is mandatory'],
    },
    date:{
      type:Date,
      default:moment()
    },
    type:{
      type:String
    }
  }
);

const billing = mongoose.model('billing', billingSchema);

module.exports= billing;
