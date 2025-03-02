const mongoose = require('mongoose');
const {Schema} = mongoose;

const CropSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    crop_name: {
        type: String,
        require: true,
    },
    farmerid: {
        type: String,
        require: true,
    },
    location: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    crop_description: {
        type: String,
        require: true,
    },
    crop_photo: {
        type: String
    },
    state: {
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


module.exports = mongoose.model('farmer_crop', CropSchema)