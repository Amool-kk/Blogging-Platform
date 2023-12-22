const mongoose = require('mongoose');
const crypto = require('crypto');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    public: {
        type: Boolean,
        default: true
    },
    shareToken: {
        type: String,
        unique: true,
        sparse: true
    }
});

postSchema.pre('save', async function (next) {
    const post = this;
    if (!post.public && !post.shareToken) {
        post.shareToken = crypto.randomBytes(20).toString('hex');
    }
    next();
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;