//import dependencies
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
//buat manggil bodyparser.
const bodyParser = require('body-parser');

//buat manggil mongoDB
const MongoClient = require('mongodb').MongoClient; //manggil klien mongodb
const ObjectID = require('mongodb').ObjectID; //manggil objectID
const DBUrl = 'mongodb://127.0.0.1:27017/'; //URL lokasi database (beserta portnya)
const DBName = "FBComment"; //nama database yang mau dipanggil

let dbo = null;
MongoClient.connect(DBUrl, (err, db) => {
    if(err) throw err;  //cek kalo misal error
    dbo = db.db(DBName);
}); //koneksi database

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