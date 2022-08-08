
const mongoose = require('mongoose');


const orderSchema = mongoose.Schema({
    userId: String,
    userEmail: String,
    orderPlacedOn:{
        type:Date,
        default:Date.now
    },
    items:[String],
    total:Number,
    isDelivered:{
        type: Boolean,
        default:false
    },
    orderDeliveredOn:{
        type:Date,
        default:Date.now
    }
    
});


module.exports = mongoose.model('order', orderSchema);