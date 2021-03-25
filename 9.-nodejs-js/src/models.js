const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    precio: {
        type: String,
        require: true
    },
    categoria: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Product', ProductSchema);