const express = require('express');
const server = express.Router();
const controller = require('../controller/controller')

module.exports = app => {

    server.post('/add', controller.create);
    server.get('/view', controller.view);
    server.put('/update/:id', controller.update);
    server.delete('/delete/:id', controller.deletes);
    server.post('/fetch', controller.fetchdatafromapi);

    app.use('/api', server);
}