//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

//port
const API_PORT = process.env.API_PORT || 3001;

app.unsubscribe(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));

//inisiasi API dan router start
router.get('/', (req, res) => {
    res.json({
        message: 'hello world!'
    });
});

app.use('/api', router);

app.listen(API_PORT, () => console.log('listening on port ${API_PORT}'));