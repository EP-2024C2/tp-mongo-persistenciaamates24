const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    precio: { type: Number, required: true },
    pathImg: { type: String },
    componentes: [
        {
            nombre: { type: String, required: true },
            descripcion: { type: String }
        }
    ],
    fabricantes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Fabricante'
        }
    ]
});

const Producto = mongoose.model('Producto', productoSchema);
module.exports = Producto;