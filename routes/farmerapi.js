const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Request = require('../models/Request');
const Order = require('../models/order');
const Farmer = require('../models/Farmer');
const Crop = require('../models/crop');


router.post("/getalljob", fetchuser,async (req,res)=>{
        
    const { myid,status} = req.body;

    const request = await Request.find({receivingid: myid, status: status});
    res.status(200).send({ success: true,request  });

} )
router.get("/getfarmerdetail/:id", fetchuser,async (req,res)=>{
        
    const {id} = req.params;
    const farmer = await Farmer.find({_id: id}).select("-password");
    if(!farmer){
        res.status(400).send({success: false, msg: "not found"})
    }
    res.status(200).send({success: true,farmer});
    

} )
router.post("/getallujob", fetchuser,async (req,res)=>{
        
    const { myid,status, isread} = req.body;

    const request = await Request.find({receivingid: myid, status: status, isread : isread});
    res.status(200).send({ success: true,request  });

} )
router.post("/getallcrop", fetchuser,async (req,res)=>{
        
    const { myid } = req.body;

    const crop = await Crop.find({farmerid: myid});
    res.status(200).send({ success: true,crop  });

} )
router.post("/sendorder", fetchuser,async (req,res)=>{
    try{
    
        const { firstname,lastname, phone, email, dilivery,sellerid,  address, zip, price, farmerid} = req.body;
        const quantity = 1;

        const order = await Order.create({firstname,lastname, phone, email, dilivery, address, zip, price, quantity, farmerid, sellerid});
        res.status(200).send({ success: true,order  });
        
    }catch(err){
        res.status(500).send({ success: false,msg: "Fill all item"  });
    }
} )
router.post("/uploadcrop", fetchuser,async (req,res)=>{
    try{
    
        const { name,crop_name, farmerid, location, phone, crop_description, crop_photo, price, quantity, state} = req.body;

        const crop = await Crop.create({name,crop_name, farmerid, location, phone, crop_description, crop_photo, price, quantity, state});
        res.status(200).send({ success: true,crop  });
        
    }catch(err){
        res.status(500).send({ success: false,msg: "Fill all item"  });
    }
} )

router.delete("/:id", fetchuser,async (req,res)=>{
    try{
    
        const { id } = req.params;
        const request = await Order.findByIdAndDelete(id);
        if(!request){
            return res.status(404).send({ success: false,msg: "not found"  });
        }
        res.status(200).send({ success: true,msg: "deleted"  });
        
    }catch(err){
        res.status(500).send({ success: false,msg: "Fill all item"  });
    }
} )




module.exports = router;