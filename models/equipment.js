const mongoose = require('mongoose');
const {Schema} = mongoose;

const EquipmentSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    equipment_name: {
        type: String,
        require: true,
    },
    sellerid: {
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
    equipment_description: {
        type: String,
        require: true,
    },
    equipment_photo: {
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


module.exports = mongoose.model('seller_equipment', EquipmentSchema)