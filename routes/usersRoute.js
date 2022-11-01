const express = require("express");
const User = require("../models/User"); // import User model
// This helps use to create and find a user
const router = express.Router();

router.post("/login", async function (req, res) {
  try {
    const result = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if (result) {
      console.log("result from login route", result);
      res.send(result);
    } else {
      res.status(500).json("Error");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/register", async function (req, res) {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    // console.log('new user stored to database',newUser);
    res.send("User registered successfully");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
