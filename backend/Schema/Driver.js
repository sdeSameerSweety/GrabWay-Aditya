//User Schema is Defined here
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

const LocationSchema=new mongoose.Schema({
    text:{type:String},
    lat:{type:Number},
    long:{type:Number}
});

const RouteSchema=new mongoose.Schema({
    origin:{LocationSchema},
    destination:{LocationSchema},
    plan:{type:String},
    seats:{type:Number}
})


const RideHistorySchema=new mongoose.Schema({
    rideId:{type:String},
    origin:{LocationSchema},
    destination:{LocationSchema},
    otp:{type:Number}
})

const DriverSchema = new mongoose.Schema({
    profilePicture:{type:String, unique:true},//remove unique profile picture from here
    name:{type:String},
    email:{type:String,unique:true},
    phoneNumber:{type:Number},
    drivingLicenseNumber:{type:String},
    VehicleNumber:{type:String},
    rating:{type:Number},
    address:[AddressSchema],
    paymentInfo:[PaymentSchema],
    routes:[RouteSchema],
    rideHistory:[RideHistorySchema],
    credits:{type:Number},
    userType:{type:String},
    experience:{type:Number},
});

const DriverModel = mongoose.model('Driver', DriverSchema);
module.exports=DriverModel;