'use strict';
require('dotenv').config();

const express = require("express");
const app = express();
const server = express();
const http         = require('http');
const mongoose = require("mongoose");
const bodyParser   = require('body-parser');
const company = require('../API/model/company');

mongoose.connect(process.env.DATABASE_URL,{ useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.log('Connected to Database'))

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

const routes = require('../API/routes/router');
routes(server);

//app.use(express.json())

const PORT = process.env.PORT || 3000;
server.listen(PORT, ()=> console.log('Server Started'))