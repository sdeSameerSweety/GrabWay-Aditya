//USer Schema is Defined here
const mongoose = require('mongoose');

const PaymentSchema= new mongoose.Schema({
    nameOnCard:{type:String},
    cardNumber:{type:Number},
    expiryMonth:{type:String},
    expiryYear:{type:String},
    cvv:{type:Number},
});

const AddressSchema=new mongoose.Schema({
    addressName:{type:String},
    addressLine1:{type:String},
    addressLine2:{type:String},
    phone:{type:Number},
    city:{type:String},
    state:{type:String},
    pincode:{type:Number},
    isDefault:{type:Boolean}
})

const RouteSchema=new mongoose.Schema({
    origin:{type:String},
    destination:{type:String},
    plan:{type:String},
})

const RideHistorySchema=new mongoose.Schema({
    rideId:{type:String},
    origin:{type:String},
    destination:{type:String},
    otp:{type:Number}
})

const DriverSchema = new mongoose.Schema({
    userName:{type:String,unique:true},
    profilePicture:{type:String, unique:true},
    name:{type:String},
    email:{type:String},
    phoneNumber:{type:Number},
    drivingLicenseNumber:{type:String},
    VehicleNumber:{type:String},
    rating:{type:Number},
    address:[AddressSchema],
    paymentInfo:[PaymentSchema],
    routes:[RouteSchema],
    rideHistory:[RideHistorySchema],
    credits:{type:Number},
    userType:{type:String}
});

const DriverModel = mongoose.model('Driver', DriverSchema);
module.exports=DriverModel;