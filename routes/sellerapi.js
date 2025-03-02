const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Equipment = require('../models/equipment');
const Order = require('../models/order');
const Seller = require('../models/Seller');


router.post("/addequipment", fetchuser,async (req,res)=>{
        

    const { name, equipment_name, price, sellerid, location, phone, equipment_description, equipment_photo, quantity} = req.body;

    const equipment = await Equipment.create({name, equipment_name, price, sellerid, location, phone, equipment_description, equipment_photo, quantity});

    res.status(200).send({ success: true, equipment });

} )
router.get("/getequipment", fetchuser,async (req,res)=>{
        

    const equipment = await Equipment.find();

    res.status(200).send({ success: true, equipment });

} )
router.get("/getequipmentbyid", fetchuser,async (req,res)=>{
    const {id} = req.user;

    const equipment = await Equipment.find({sellerid: id});

    res.status(200).send({ success: true, equipment });

} )
router.get("/getmyorder", fetchuser,async (req,res)=>{
    const {id} = req.user;

    const order = await Order.find({sellerid: id});

    res.status(200).send({ success: true, order });

} )


router.get("/getsellerdetail/:id", fetchuser,async (req,res)=>{
    const {id} = req.params;
    const seller = await Seller.find({_id: id}).select("-password");
    if(!seller){
        res.status(400).send({success: false, msg: "not found"})
    }
    res.status(200).send({success: true,seller});

} )


module.exports = router;