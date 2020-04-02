import mongoose from 'mongoose';

const { Schema } = mongoose;

const billingSchema = new Schema(
  {
    projectID: {
      type: Schema.Types.ObjectId,
      ref: 'project',
    },
    startTime: {
      type: Date,
      required: [true, 'Start Date is mandatory'],
    },
    endTime: {
      type: Date,
      required: [true, 'End Date is mandatory'],
    },
    cost: {
      type: Number,
      required: [true, 'Cost is mandatory'],
    },
  }
);

const billing = mongoose.model('billing', billingSchema);

export default billing;
