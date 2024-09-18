const express = require('express');
const mongoose = require('mongoose');
const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));


const cors = require('cors');
server.use(cors());

mongoose.connect('mongodb://localhost:27017/database');


require('./src/routes/routes')(server);

server.use(express.static('public'));

server.listen('4', () => {
    console.log('server is working');
})