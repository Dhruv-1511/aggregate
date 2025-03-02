const mongoose = require('mongoose');
const {Schema} = mongoose;

const ReviewSchema = new Schema({
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
    rating: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('worker_review',ReviewSchema)