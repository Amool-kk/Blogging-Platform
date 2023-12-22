const express = require("express");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const auth = require("../middleware/authenticate");

const router = express.Router();

router.get('/posts', auth, async (req, res) => {
    const query = req.query;
    console.log(query)
    const filter = {
        author: req.user
    };

    if (query.public && query.public === 'true') {
        filter.public = true;
    } else if(query.public && query.public === 'false') {
        filter.public = false;
    }


    try {
        const posts = await Post.find(filter);
        res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving posts", error });
    }
});

router.get("/profile", auth, async (req, res) => {
    const user = req.user
    console.log(user)
    res.status(200).json({ message: "User is logged in.", user: user })
});

router.get('/logout', auth, (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' })
})

module.exports = router;