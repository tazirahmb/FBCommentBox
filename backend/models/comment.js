const mongoose = require('mongoose');
const schema = mongoose.Schema;

const commentSchema = new schema({
    author: String,
    text: String,
}, {timestamps: true });
module.exports =  mongoose.model('comment', commentSchema);