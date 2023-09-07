//User Schema is Defined here
const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  nameOnCard: { type: String },
  cardNumber: { type: Number },
  expiryMonth: { type: String },
  expiryYear: { type: String },
  cvv: { type: Number },
});

const AddressSchema = new mongoose.Schema({
  addressName: { type: String },
  addressLine1: { type: String },
  addressLine2: { type: String },
  phone: { type: Number },
  city: { type: String },
  state: { type: String },
  pincode: { type: Number },
  isDefault: { type: Boolean },
});

const LocationSchema = new mongoose.Schema({
  text: { type: String },
  lat: { type: Number },
  long: { type: Number },
});

const CustomerSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  seatNumber: { type: Number },
  originLocation: [LocationSchema],
  originTime: { type: String },
  destinationLocation: [LocationSchema],
  destinationTime: { type: String },
  //price:price for that user
});
const RouteTime = new mongoose.Schema({
  start: { type: String },
  end: { type: String },
});
const RouteSchema = new mongoose.Schema({
  origin: [LocationSchema],
  destination: [LocationSchema],
  plan: { type: String },
  seats: { type: Number },
  originTime: [RouteTime],
  destinationTime: [RouteTime],
  customers: [CustomerSchema],
});

const RideHistorySchema = new mongoose.Schema({
  rideId: { type: String },
  origin: [LocationSchema],
  destination: [LocationSchema],
  otp: { type: Number },
});

const DriverSchema = new mongoose.Schema({
  profilePicture: { type: String },
  name: { type: String },
  email: { type: String, unique: true },
  phoneNumber: { type: Number },
  drivingLicenseNumber: { type: String },
  VehicleNumber: { type: String },
  rating: { type: Number },
  address: [AddressSchema],
  paymentInfo: [PaymentSchema],
  routes: [RouteSchema],
  rideHistory: [RideHistorySchema],
  credits: { type: Number },
  userType: { type: String },
  experience: { type: String },
});

const DriverModel = mongoose.model("Driver", DriverSchema);
module.exports = DriverModel;
