"use strict";
const serverless = require('serverless-http');
var express = require('express');
var app = express();
const mongoose = require('mongoose');
const api = require('./routes/api');
var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser')
const router = express.Router();
require('./routes/config/passport-config');
require('dotenv').config();

mongoose.connect(
    'mongodb://MuniBanks:<insertYourPassword>@docdb-2021-03-15-14-02-48.cluster-calvsd7c3i7n.us-east-1.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false', 
{ 
        sslValidate: true,
        sslCA:ca,
        useNewUrlParser: true
},

    
);


const db = mongoose.connection;

db.once("open", () => {
    console.log("sucessfully connected to MongoDb");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized:false
}));

app.use(express.json());

    


app.use('/api',api);

app.get('/', (req, res) => {
  res.send('availability service!')
})
// const port = process.env.Port || 5000;

// app.listen(port);

module.exports.handler = serverless(app)
