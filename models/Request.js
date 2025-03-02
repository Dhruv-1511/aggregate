const mongoose = require('mongoose');
const {Schema} = mongoose;

const RequestSchema = new Schema({
    sendingid:{
        type: String,
        require: true,
    },
    receivingid: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        require: true,
    },
    fullname: {
        type: String,
    },
    picture: {
        type: String,
    },
    occupation: {
        type: String,
    },
    isread: {
        type: Boolean,
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('request',RequestSchema)