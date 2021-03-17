"use strict";
const serverless = require('serverless-http');
var express = require('express');
var app = express();
const mongoose = require('mongoose');
const api = require('./routes/api');
var express = require('express');
var passport = require('passport');
var cors = require('cors');
const router = express.Router();
require('./routes/config/passport-config');
require('dotenv').config();

const connectionString = "mongodb+srv://MuniBanks:225231@cluster0.j1t7o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(
    connectionString,

    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex:true
    },

);

const db = mongoose.connection;

db.once("open", () => {
    console.log("sucessfully connected to MongoDb");
});

app.use(cors());
app.use(passport.initialize());
app.use(passport.session({
    secret: process.env.ACCESS_TOKEN_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());

app.use('/api', api);

app.get('/', (req, res) => {
    res.send('availability service!')
})

module.exports.handler = serverless(app)
