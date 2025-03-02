const express = require("express");
const router = express.Router();
const Worker = require("../models/Worker");
const Farmer = require("../models/Farmer");
const Seller = require("../models/Seller");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const JWT_SECRET = "renidh";
var fetchuser = require("../middleware/fetchuser");

router.post(
  "/register",

  body("email").isEmail(),
  body("password").isLength({ min: 5 }),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, phone, occupation } = req.body;

    if (occupation == "worker") {
      const worker = await Worker.findOne({ email });
      if (worker) {
        res.status(400).send({ success: false, msg: "Email Already taken!" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        const newWorker = await Worker.create({
          name,
          email,
          password: secPass,
          phone,
          occupation,
        });

        const data = {
          user: {
            id: newWorker.id,
          },
        };

        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(authToken);
        res.json({ success: true, authToken, newWorker });
      }
    } else if (occupation == "farmer") {
      const farmer = await Farmer.findOne({ email });
      if (farmer) {
        res.status(400).send({ success: false, msg: "Email Already taken!" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        const newFarmer = await Farmer.create({
          name,
          email,
          password: secPass,
          phone,
          occupation,
        });

        const data = {
          user: {
            id: newFarmer.id,
          },
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(authToken);
        res.json({ success: true, authToken, newFarmer });
      }
    }else if (occupation == "seller") {
      const seller = await Seller.findOne({ email });
      if (seller) {
        res.status(400).send({ success: false, msg: "Email Already taken!" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);

        const newSeller = await Seller.create({
          name,
          email,
          password: secPass,
          phone,
          occupation,
        });

        const data = {
          user: {
            id: newSeller.id,
          },
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(authToken);
        res.json({ success: true, authToken, newSeller });
      }
    } else {
      res.status({ success: false, msg: "internal error" });
    }
  }
);

router.post(
  "/login",
  body("email", "Enter a valid Email").isEmail(),
  body("password", "Password cannot be blank").exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password, occupation } = req.body;

    if (occupation == "worker") {
      try {
        let worker = await Worker.findOne({ email });
        if (!worker) {
          success = false;
          return res.status(400).json({ success, msg: "Invalid credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, worker.password);
        if (!passwordCompare) {
          success = false;
          return res.status(400).json({ success, msg: "Invalid credentials" });
        }

        const data = {
          user: {
            id: worker.id,
          },
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(authToken);
        const occ = worker.occupation;
        success = true;
        res.json({ success, authToken, obj: worker });
      } catch (err) {
        console.error(err.message);
        res.status(500).send({ success: false, msg: "Internal server error" });
      }
    } else if (occupation == "farmer") {
      try {
        let farmer = await Farmer.findOne({ email });
        if (!farmer) {
          success = false;
          return res.status(400).json({ success, msg: "Invalid credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, farmer.password);
        if (!passwordCompare) {
          success = false;
          return res.status(400).json({ success, msg: "Invalid credentials" });
        }

        const data = {
          user: {
            id: farmer.id,
          },
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(authToken);
        const occ = farmer.occupation;
        success = true;
        res.json({ success, authToken, obj: farmer });
      } catch (err) {
        console.error(err.message);
        res.status(500).send({ success: false, msg: "Internal server error" });
      }
    }
    else if (occupation == "seller") {
      try {
        let seller = await Seller.findOne({ email });
        if (!seller) {
          success = false;
          return res.status(400).json({ success, msg: "Invalid credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, seller.password);
        if (!passwordCompare) {
          success = false;
          return res.status(400).json({ success, msg: "Invalid credentials" });
        }

        const data = {
          user: {
            id: seller.id,
          },
        };
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(authToken);
        const occ = seller.occupation;
        success = true;
        res.json({ success, authToken, obj: seller });
      } catch (err) {
        console.error(err.message);
        res.status(500).send({ success: false, msg: "Internal server error" });
      }
    }
  }
);

router.get("/getuser", fetchuser, async (req, res) => {
  try {
    userId = req.user.id;
    const worker = await Worker.findById(userId).select("-password");
    const farmer = await Farmer.findById(userId).select("-password");
    if(farmer){
      res.send(farmer);
    }else if(worker){
      res.send(worker);
    }else{
      const seller = await Seller.findById(userId).select("-password");
      res.send(seller);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
});

router.put("/updateuser", fetchuser, async (req, res) => {
  const { name, address, gender, age, work_hour, occupation, profile_picture, rating, about } =  req.body;
  try {
    const updatedUser = {};
    if (name) {
      updatedUser.name = name;
    }
    if (address) {
      updatedUser.address = address;
    }
    if (gender) {
      updatedUser.gender = gender;
    }
    if (age) {
      updatedUser.age = age;
    }
    if (work_hour) {
      updatedUser.work_hour = work_hour;
    }
    if (occupation) {
      updatedUser.occupation = occupation;
    }
    if (profile_picture) {
      updatedUser.profile_picture = profile_picture;
    }
    if (rating) {
      updatedUser.rating = rating;
    }
    if (about) {
      updatedUser.about = about;
    }

    if(occupation == "farmer"){
      const farmer = await Farmer.findByIdAndUpdate(
        req.user.id,
        { $set: updatedUser },
        { new: true }
      );
      res.status(200).send({ success: true, farmer });
    }else if(occupation == "seller"){
      const seller = await Seller.findByIdAndUpdate(
        req.user.id,
        { $set: updatedUser },
        { new: true }
      );
      res.status(200).send({ success: true, seller });
    }else{
      const worker = await Worker.findByIdAndUpdate(
        req.user.id,
        { $set: updatedUser },
        { new: true }
      );
      res.status(200).send({ success: true, worker });
    }



  } catch (err) {
    console.error(err.message);
    res.status(500).send({ success: false, msg: "Internal server error" });
  }
});

module.exports = router;
