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

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('../API/routes/router');
routes(server);

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log('Server Started'))
