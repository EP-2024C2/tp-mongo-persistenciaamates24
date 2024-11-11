const express = require('express');
const router = express.Router();
const {
    obtenerProductos,
    obtenerProductoPorId,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    asociarFabricantesAProducto,
    obtenerFabricantesDeProducto,
    asociarComponentesAProducto,
    obtenerComponentesDeProducto,
    desasociarFabricanteDeProducto,
    desasociarComponenteDeProducto
} = require('../controllers/productoController');

const validateProducto = require('../middlewares/validateProducto');

// CRUD de productos
router.get('/', obtenerProductos);
router.get('/:id', obtenerProductoPorId);
router.post('/', validateProducto, crearProducto);
router.put('/:id', validateProducto, actualizarProducto);
router.delete('/:id', eliminarProducto);

// Asociaciones de Fabricantes y Componentes con Productos
router.post('/:id/fabricantes', asociarFabricantesAProducto);
router.get('/:id/fabricantes', obtenerFabricantesDeProducto);
router.delete('/:id/fabricantes/:fabricanteId', desasociarFabricanteDeProducto);

router.post('/:id/componentes', asociarComponentesAProducto);
router.get('/:id/componentes', obtenerComponentesDeProducto);
router.delete('/:id/componentes/:componenteId', desasociarComponenteDeProducto);

module.exports = router;
