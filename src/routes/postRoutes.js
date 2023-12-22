const express = require("express");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const auth = require("../middleware/authenticate");

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find({ public: true });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving public posts", error });
    }
})

router.post('/', auth, async (req, res) => {
    const { title, content, public } = req.body;
    const post = new Post({ title, content, author: req.user, public });

    try {
        await post.save();
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: "Error creating post", error });
    }
});

router.get('/:shareToken', async (req, res) => {
    const shareToken = req.params.shareToken;

    try {
        const post = await Post.findOne({ shareToken, public: false });
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Private post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving post', error });
    }
});

router.put('/:postId', auth, async (req, res) => {
    const postId = req.params.postId;
    const { title, content, public } = req.body;

    try {
        const post = await Post.findByIdAndUpdate(postId, { title, content, public }, { new: true });
        if (post && post.author === req.user) {
            res.json(post);
        } else {
            res.status(403).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error });
    }
});

router.delete("/:postId", auth, async (req, res) => {
    const postId = req.params.postId;

    try {
        const post = await Post.findByIdAndDelete(postId);
        if (post && post.author === req.user) {
            res.status(200).json(post);
        } else {
            res.status(403).json({ message: 'Unauthorized' });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting post", error });
    }
});

module.exports = router;