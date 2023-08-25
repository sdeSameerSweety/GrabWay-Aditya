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

const UserSchema = new mongoose.Schema({
    userName:{type:String,unique:true},
    profilePicture:{type:String, unique:true},
    name:{type:String},
    email:{type:String,unique:true},
    phoneNumber:{type:Number},
    address:[AddressSchema],
    paymentInfo:[PaymentSchema],
    credits:{type:Number},
    routes:[RouteSchema],
    rideHistory:[RideHistorySchema],
    userType:{type:String}
});

const UserModel=mongoose.model('User', UserSchema);
module.exports = UserModel;