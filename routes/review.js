const express = require('express');
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Review = require('../models/Review');


router.post("/send",fetchuser, async(req,res) =>{
    
    const {name, email, subject, description, rating} = req.body;

    const review = await Review.create({
        name, email, subject, description, rating
    })

    res.status(200).send({success: true, review})
})


router.get("/retrive",fetchuser, async(req,res) =>{
    
    
    const review = await Review.find({rating: 5});
    if(!review){
        res.status(400).send({success: false, msg: "not found"})
    }
    res.status(200).send({success: true, review})
})



module.exports = router;