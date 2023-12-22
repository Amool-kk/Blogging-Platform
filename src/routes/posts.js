const express = require("express");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const auth = require("../middleware/authenticate");

const router = express.Router();

router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find({ public: true });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving public posts", error });
    }
})

router.get('/user/posts', auth, async (req, res) => {
    const query = req.query;
    const filter = {
        author: req.user._id
    };

    if (query.public && query.public === 'true') {
        filter.public = true;
    } else {
        filter.public = false;
    }


    try {
        const posts = Post.find(filter);
        res.json(posts);
    } catch (error) {
        return res.status(500).json({ message: "Error retrieving posts", error })
    }
});

router.post('/posts', auth, async (req, res) => {
    const { title, content, public } = req.body;
    const post = new Post({ title, content, author: req.user._id, public });

    try {
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: "Error creating post", error });
    }
});