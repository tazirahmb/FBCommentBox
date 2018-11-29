//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const Comment = require('./models/comment');

const app = express();

//port
const API_PORT = process.env.API_PORT || 3001;

mongoose.connect('mongodb://localhost:27017/myapp');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB Connection Error:'));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

const router = express.Router();

//inisiasi API dan router start
router.get('/', (req, res) => {
    res.json({
        message: 'hello world!'
    });
});

router.get('/comments', (req, res) => {
    Comment.find((err, comments) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: comments });
    });
});

router.post('/comments', (req, res) => {
    const comment = new Comment();
    const {author, text} = req.body;

    if(!author || !text) {
        return res.json({
            success: false,
            error: 'you must provide an author and comment'
        });
    }
    comment.author = author;
    comment.text = text;
    comment.save(err => {
        if (err) return res.json({
            success: false,
            error: err
        });
        return res.json({ success: true });
    });
});

app.use('/api', router);

app.listen(API_PORT, () => console.log('listening on port ${API_PORT}'));