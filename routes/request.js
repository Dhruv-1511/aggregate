const express = require('express');
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Request = require('../models/Request');
const Farmer = require('../models/Farmer');
const Worker = require('../models/Worker');

router.post("/send",fetchuser, async(req,res) =>{
    
   const  {sendingid, receivingid, status, fullname, picture, occupation} = req.body;
   const request = await Request.create({
        sendingid, receivingid, status, fullname, picture, occupation, isread: false
    })

    res.status(200).send({success: true, request})
})
router.post("/getstatus",fetchuser, async(req,res) =>{
    
   const {sendingid, receivingid} = req.body;

   const request = await Request.find({sendingid: sendingid, receivingid: receivingid});
    if(!request){
        res.status(500).send({success: false,msg: "not found"});
    }
    res.status(200).send({success: true, request});
})
router.get("/getfriends",fetchuser, async(req,res) =>{
    
   const {id} = req.user;
   const request = await Request.find({sendingid: id, status: 'accept'});

    if(request.length == 0){
        const request = await Request.find({receivingid: id, status: 'accept'});
        var i=0;
        const myArray = [];
        for(i=0;i<request.length;i++){
    
            const farmer = await Worker.find({_id: request[i].sendingid}).select("-password");
            if(!farmer){
                res.status(500).send({success: false, msg: "not found"})
            }
            myArray.push(farmer);
        }
        res.status(200).send({success: true, myArray: myArray[0]});
    
    }else{

    
    var i=0;
    const myArray = [];


    for(i=0;i<request.length;i++){

        const farmer = await Farmer.find({_id: request[i].receivingid}).select("-password");
        if(!farmer){
            res.status(500).send({success: false, msg: "not found"})
        }
        myArray.push(farmer);
    }
    res.status(200).send({success: true, myArray: myArray[0]});
    }
})
router.post("/getmyreq",fetchuser, async(req,res) =>{
    
   const {receivingid, status} = req.body;

   const request = await Request.find({receivingid: receivingid, status: status});
    if(!request){
        res.status(500).send({success: false,msg: "not found"});
    }
    res.status(200).send({success: true, request});

})
router.post("/updatestatus",fetchuser, async(req,res) =>{
    
    const {sendingid, receivingid, status} = req.body;
    const request = await Request.findOneAndUpdate({sendingid: sendingid, receivingid: receivingid}, {status : status}, {new: true})
    res.status(200).send({success: true, request});

})

router.post("/updateisread",fetchuser, async(req,res) =>{
    
    const { receivingid, isread} = req.body;
    const request = await Request.findOneAndUpdate({ receivingid: receivingid}, {isread : isread}, {new: true})
    res.status(200).send({success: true, request});

})



module.exports = router;