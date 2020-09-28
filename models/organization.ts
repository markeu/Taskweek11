import mongoose from "mongoose";

const Schema = mongoose.Schema;


const organizationSchema = new Schema({
  organization: {
    type: String,
    unique: true,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  marketValue: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  ceo: {
    type: String,
    required: true,
  },
  noOfEmployees: Number,
  employees: [String],
  products: [String],
});

const Organization = mongoose.model("Organization", organizationSchema);

export { Organization };
