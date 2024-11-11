const mongoose = require('mongoose');

const fabricanteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    direccion: { type: String },
    contacto: { type: String },
    pathImgPerfil: { type: String }
});

const Fabricante = mongoose.model('Fabricante', fabricanteSchema);
module.exports = Fabricante;