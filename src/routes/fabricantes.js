const express = require('express');
const router = express.Router();
const {
    obtenerFabricantes,
    obtenerFabricantePorId,
    crearFabricante,
    actualizarFabricante,
    eliminarFabricante,
    obtenerProductosDeFabricante,
    desasociarFabricanteDeProducto
} = require('../controllers/fabricanteController');

const validateFabricante = require('../middlewares/validateFabricante');

// CRUD de fabricantes
router.get('/', obtenerFabricantes);
router.get('/:id', obtenerFabricantePorId);
router.post('/', validateFabricante, crearFabricante);
router.put('/:id', validateFabricante, actualizarFabricante);
router.delete('/:id', eliminarFabricante);

// Obtener productos de un fabricante
router.get('/:id/productos', obtenerProductosDeFabricante);

module.exports = router;
