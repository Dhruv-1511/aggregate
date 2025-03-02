const mongoose = require('mongoose');
const {Schema} = mongoose;

const JobSchema = new Schema({
    name:{
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    subject: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    pay_mode: {
        type: String,
        require: true,
    },
    fix_price: {
        type: Number,
    },
    hour_price: {
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('job',JobSchema)