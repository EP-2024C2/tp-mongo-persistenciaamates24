const mongoose = require('mongoose');

const componenteSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String }
});

const Componente = mongoose.model('Componente', componenteSchema);
module.exports = Componente;
