const mongoose = require('mongoose');

const RopaSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    fabricante: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    estado: {
        type: Boolean,
        require: true
    },
    fecha: {
        type: Date,
        require: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },

});

module.exports = mongoose.model('Ropa', RopaSchema);