//USer Schema is Defined here
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    
});

const OrderModel = mongoose.model('Orders', OrderSchema);
module.exports=OrderModel;