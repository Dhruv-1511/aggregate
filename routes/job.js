const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Job = require("../models/Job");
const Farmer = require("../models/Farmer");

router.post("/send", fetchuser, async (req, res) => {
  const { name, email, subject, description, pay_mode, fix_price, hour_price } =
    req.body;

  const newJob = {};
  newJob.name = name;
  newJob.email = email;
  newJob.subject = subject;
  newJob.description = description;
  newJob.pay_mode = pay_mode;
  if (pay_mode == "fix") {
    if (fix_price) {
      newJob.fix_price = fix_price;
    }
  } else if (pay_mode == "hour") {
    if (hour_price) {
      newJob.hour_price = hour_price;
    }
  }

  const job = await Job.create(newJob);

  res.status(200).send({ success: true, job });
});

router.get("/latestjob", fetchuser, async (req, res) => {
  const jobs = await Job.find();
  res.status(200).send({ success: true,jobs  });
});

router.post("/getjobbyid", fetchuser, async (req, res) => {
  const  { jobid } = req.body;
  const jobs = await Job.find({_id: jobid});
  if(!jobs){
    res.status(500).send({ success: false,msg: "Not found"  });
  }
  res.status(200).send({ success: true,jobs  });
});

router.post("/getfarmer",fetchuser, async(req,res) => {
  const {email} = req.body;
  const farmer = await Farmer.find({email: email}).select("-password");;
  if(!farmer){
    res.status(500).send({success: false,msg: "not found"});
  }
  res.status(200).send({success: true, farmer});
})
router.post("/getworkerbyjob",fetchuser, async(req,res) => {
  const {id} = req.body;
  const job = await Job.find({_id: id});
  w_email = job.email;
  const worker = await Job.find({email: w_email});
  res.status(200).send({success: true, worker});
})

module.exports = router;
