const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const authRoutes = require("./authRoutes");

router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/auth", authRoutes);

router.get("/", (req, res) => {
    res.status(200).json({ message: "Server is running" })
})



module.exports = router