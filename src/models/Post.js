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
        type: String,
        default: true
    },
    shareToken: {
        type: String,
        unique: true
    }
});

postSchema.pre('save', (next) => {
    if (!this.public) {
        this.shareToken = crypto.randomBytes(20).toString('hex');
    }
    next();
});


const Post = mongoose.model("Post", postSchema);

module.exports = Post;