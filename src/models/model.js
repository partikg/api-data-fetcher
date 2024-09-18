const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataschema = new Schema({

    name: {
        type: String,
    },
    price: {
        type: Number
    }
});

module.exports = mongoose.model('model', dataschema);