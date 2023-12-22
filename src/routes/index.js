const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");

router.use("/auth", userRoutes);

router.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running" })
})

module.exports = router