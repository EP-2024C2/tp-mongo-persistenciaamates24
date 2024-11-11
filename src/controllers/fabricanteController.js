const Fabricante = require('../models/Fabricante');
const Producto = require('../models/Producto');

// Obtener todos los fabricantes
async function obtenerFabricantes(req, res) {
    try {
        const fabricantes = await Fabricante.find();
        res.status(200).json(fabricantes);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los fabricantes" });
    }
}

// Obtener un fabricante por ID
async function obtenerFabricantePorId(req, res) {
    try {
        const fabricante = await Fabricante.findById(req.params.id);
        if (!fabricante) return res.status(404).json({ error: "Fabricante no encontrado" });
        res.status(200).json(fabricante);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el fabricante" });
    }
}

// Crear un nuevo fabricante
async function crearFabricante(req, res) {
    try {
        const fabricante = new Fabricante(req.body);
        await fabricante.save();
        res.status(201).json(fabricante);
    } catch (error) {
        res.status(400).json({ error: "Error al crear el fabricante" });
    }
}

// Actualizar un fabricante existente
async function actualizarFabricante(req, res) {
    try {
        const fabricante = await Fabricante.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!fabricante) return res.status(404).json({ error: "Fabricante no encontrado" });
        res.status(200).json(fabricante);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el fabricante" });
    }
}

// Eliminar un fabricante
async function eliminarFabricante(req, res) {
    try {
        const fabricanteId = req.params.id;

        // Verificar si el fabricante está asociado a algún producto
        const productosAsociados = await Producto.find({ fabricantes: fabricanteId });
        if (productosAsociados.length > 0) {
            return res.status(400).json({ error: "No se puede eliminar un fabricante asociado a productos." });
        }

        const fabricante = await Fabricante.findByIdAndDelete(fabricanteId);
        if (!fabricante) return res.status(404).json({ error: "Fabricante no encontrado" });
        res.status(200).json({ message: "Fabricante eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el fabricante" });
    }
}

// Obtener todos los productos de un fabricante
async function obtenerProductosDeFabricante(req, res) {
    try {
        const { id } = req.params;
        const productos = await Producto.find({ fabricantes: id });
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos del fabricante" });
    }
}

// Desasociar un fabricante de un producto específico
async function desasociarFabricanteDeProducto(req, res) {
    try {
        const { id, productoId } = req.params;

        const producto = await Producto.findById(productoId);
        if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

        // Remover el fabricante de la lista de fabricantes del producto
        producto.fabricantes = producto.fabricantes.filter(f => f.toString() !== id);
        await producto.save();

        res.status(200).json({ message: "Fabricante desasociado del producto exitosamente", producto });
    } catch (error) {
        res.status(500).json({ error: "Error al desasociar el fabricante del producto" });
    }
}

module.exports = {
    obtenerFabricantes,
    obtenerFabricantePorId,
    crearFabricante,
    actualizarFabricante,
    eliminarFabricante,
    obtenerProductosDeFabricante,
    desasociarFabricanteDeProducto
};