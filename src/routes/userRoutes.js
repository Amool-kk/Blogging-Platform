const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email && !password) {
            return res.status(400).json({ message: "Both fields are required" });
        }
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = new User({ email, password });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email && !password) {
            return res.status(400).json({ message: "Both fields are required" });
        }
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "10h" });

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router;