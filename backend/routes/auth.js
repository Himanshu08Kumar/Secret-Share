const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();
const nodemailer = require('nodemailer')

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    if(password.length >= 6){
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  }else{
    return res.json({success:false, message: "Password must be at least 6 characters"});
  }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json({ error: "User not found!" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
    res.json({ token })
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});



module.exports = router;
