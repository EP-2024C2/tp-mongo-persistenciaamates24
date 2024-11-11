const express = require('express');
const router = express.Router();
const {
    obtenerComponentes,
    obtenerComponentePorId,
    crearComponente,
    actualizarComponente,
    eliminarComponente,
    obtenerProductosDeComponente,
    desasociarComponenteDeProducto
} = require('../controllers/componenteController');

const validateComponente = require('../middlewares/validateComponente');

// CRUD de componentes
router.get('/', obtenerComponentes);
router.get('/:id', obtenerComponentePorId);
router.post('/', validateComponente, crearComponente);
router.put('/:id', validateComponente, actualizarComponente);
router.delete('/:id', eliminarComponente);

// Obtener productos de un componente
router.get('/:id/productos', obtenerProductosDeComponente);

module.exports = router;
