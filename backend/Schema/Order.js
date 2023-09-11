//USer Schema is Defined here
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  driverEmail: { type: String },
  userEmail: { type: String },
  plan: { type: String },
  amount: { type: String },
  paymentMethod: { type: String },
});

const OrderModel = mongoose.model("Orders", OrderSchema);
module.exports = OrderModel;
