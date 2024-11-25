const Componente = require('../models/Componente');
const Producto = require('../models/Producto');

// Obtener todos los componentes
async function obtenerComponentes(req, res) {
    try {
        const componentes = await Componente.find();
        res.status(200).json(componentes);
    } catch (error) {
        res.status(204).json({ error: "Error al obtener los componentes" });
    }
}

// Obtener un componente por ID
async function obtenerComponentePorId(req, res) {
    try {
        const componente = await Componente.findById(req.params.id);
        if (!componente) return res.status(404).json({ error: "Componente no encontrado" });
        res.status(200).json(componente);
    } catch (error) {
        res.status(204).json({ error: "Error al obtener el componente" });
    }
}

// Crear un nuevo componente
async function crearComponente(req, res) {
    try {
        const componente = new Componente(req.body);
        await componente.save();
        res.status(201).json(componente);
    } catch (error) {
        res.status(400).json({ error: "Error al crear el componente" });
    }
}

// Actualizar un componente existente
async function actualizarComponente(req, res) {
    try {
        const componente = await Componente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!componente) return res.status(404).json({ error: "Componente no encontrado" });
        res.status(200).json(componente);
    } catch (error) {
        res.status(400).json({ error: "Error al actualizar el componente" });
    }
}

// Eliminar un componente
async function eliminarComponente(req, res) {
    try {
        const componenteId = req.params.id;

        // Verificar si el componente está asociado a algún producto
        const productosAsociados = await Producto.find({ "componentes._id": componenteId });
        if (productosAsociados.length > 0) {
            return res.status(400).json({ error: "No se puede eliminar un componente asociado a productos." });
        }

        const componente = await Componente.findByIdAndDelete(componenteId);
        if (!componente) return res.status(404).json({ error: "Componente no encontrado" });
        res.status(200).json({ message: "Componente eliminado exitosamente" });
    } catch (error) {
        res.status(400).json({ error: "Error al eliminar el componente" });
    }
}

// Obtener todos los productos de un componente
async function obtenerProductosDeComponente(req, res) {
    try {
        const { id } = req.params;
        const productos = await Producto.find({ "componentes._id": id });
        res.status(200).json(productos);
    } catch (error) {
        res.status(400).json({ error: "Error al obtener los productos del componente" });
    }
}

// Desasociar un componente de un producto específico
async function desasociarComponenteDeProducto(req, res) {
    try {
        const { id, productoId } = req.params;

        const producto = await Producto.findById(productoId);
        if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

        // Remover el componente de la lista de componentes del producto
        producto.componentes = producto.componentes.filter(c => c._id.toString() !== id);
        await producto.save();

        res.status(200).json({ message: "Componente desasociado del producto exitosamente", producto });
    } catch (error) {
        res.status(400).json({ error: "Error al desasociar el componente del producto" });
    }
}

module.exports = {
    obtenerComponentes,
    obtenerComponentePorId,
    crearComponente,
    actualizarComponente,
    eliminarComponente,
    obtenerProductosDeComponente,
    desasociarComponenteDeProducto
};