const mongoose = require('mongoose');
const {Schema} = mongoose;

const FtoSOrder = new Schema({
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    farmerid: {
        type: String,
    },
    sellerid: {
        type: String,
    },
    email: {
        type: String,
        require: true,
    },
    dilivery: {
        type: String,
    },
    address: {
        type: String,
        require: true,
    },
    zip: {
        type: String
    },
    price: {
        type: String,
    },
    quantity: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})


module.exports = mongoose.model('ftos_order', FtoSOrder)