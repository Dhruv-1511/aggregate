const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Worker = require('../models/Worker');


router.get("/gettopworker", fetchuser, async (req,res)=>{
    const worker = await Worker.find({rating: 5}).select("-password");
    
    if(!worker){
        res.status(400).send({success: false, msg: "not found"})
    }
    res.status(200).send(worker);
    

})

router.get("/getworkerdetail/:id", fetchuser,async (req,res)=>{
    const {id} = req.params;
    const worker = await Worker.find({_id: id}).select("-password");
    if(!worker){
        res.status(400).send({success: false, msg: "not found"})
    }
    res.status(200).send({success: true,worker});

} )



module.exports = router;