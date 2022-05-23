const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const User = require("../models/User");

// Sign Up

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.fields;
  try {
    if (!req.fields.username) {
      res.status(400).json({ message: "Invalide username" });
    }
    const user = await User.findOne({ email: req.fields.email });
    if (user) {
      res.status(400).json({ message: "User already exists" });
    } else {
      // Password Generator
      const salt = uid2(64);
      const hash = SHA256(password + salt).toString(encBase64);
      const token = uid2(64);

      const newUser = new User({
        email,
        username,
        salt,
        hash,
        token,
      });
      await newUser.save();

      res.json({
        message: "Account created.",
        token: newUser.token,
        username: newUser.username,
      });
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
