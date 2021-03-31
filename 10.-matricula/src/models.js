const mongoose = require('mongoose');

const MatriculaSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    telefono: {
        type: String,
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

module.exports = mongoose.model('Matricula', MatriculaSchema);