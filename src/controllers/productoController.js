const Producto = require('../models/Producto');
const Fabricante = require('../models/Fabricante');
const Componente = require('../models/Componente');

// Obtener todos los productos
async function obtenerProductos(req, res) {
    try {
        const productos = await Producto.find().populate('fabricantes');
        res.status(200).json(productos);
    } catch (error) {
        res.status(204).json({ error: "Error al obtener los productos" });
    }
}

// Obtener un producto por ID
async function obtenerProductoPorId(req, res) {
    try {
        const producto = await Producto.findById(req.params.id).populate('fabricantes');
        if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
        res.status(200).json(producto);
    } catch (error) {
        res.status(204).json({ error: "Error al obtener el producto" });
    }
}

// Crear un nuevo producto
async function crearProducto(req, res) {
    try {
        const producto = new Producto(req.body);
        await producto.save();
        res.status(201).json(producto);
    } catch (error) {
        res.status(400).json({ error: "Error al crear el producto" });
    }
}

// Actualizar un producto existente
async function actualizarProducto(req, res) {
    try {
        const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
        res.status(200).json(producto);
    } catch (error) {
        res.status(400).json({ error: "Error al actualizar el producto" });
    }
}

// Eliminar un producto
async function eliminarProducto(req, res) {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

        // Verificar si el producto tiene asociaciones antes de eliminar
        if (producto.fabricantes.length > 0 || producto.componentes.length > 0) {
            return res.status(400).json({ error: "No se puede eliminar un producto que tiene fabricantes o componentes asociados." });
        }

        await Producto.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
        res.status(400).json({ error: "Error al eliminar el producto" });
    }
}

// Asociar uno o más fabricantes a un producto (evitando duplicados)
async function asociarFabricantesAProducto(req, res) {
    try {
        const { id } = req.params;
        const { fabricantes } = req.body; // Array de IDs de fabricantes

        const producto = await Producto.findById(id);
        if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

        // Verificar que los fabricantes no estén ya asociados
        const nuevosFabricantes = fabricantes.filter(
            (fabricanteId) => !producto.fabricantes.includes(fabricanteId)
        );

        if (nuevosFabricantes.length === 0) {
            return res.status(400).json({ error: "Los fabricantes ya están asociados al producto." });
        }

        producto.fabricantes.push(...nuevosFabricantes);
        await producto.save();

        res.status(201).json({ message: "Fabricantes asociados exitosamente", producto });
    } catch (error) {
        res.status(400).json({ error: "Error al asociar fabricantes al producto" });
    }
}

// Obtener todos los fabricantes de un producto
async function obtenerFabricantesDeProducto(req, res) {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id).populate('fabricantes');
        if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
        res.status(200).json(producto.fabricantes);
    } catch (error) {
        res.status(400).json({ error: "Error al obtener los fabricantes del producto" });
    }
}

// Asociar uno o más componentes a un producto (evitando duplicados)
async function asociarComponentesAProducto(req, res) {
    try {
        const { id } = req.params;
        const { componentes } = req.body; // Array de objetos de componentes

        const producto = await Producto.findById(id);
        if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

        // Verificar que los componentes no estén ya asociados
        const nuevosComponentes = componentes.filter(
            (nuevoComponente) => !producto.componentes.some(
                (compExistente) => compExistente._id.toString() === nuevoComponente._id
            )
        );

        if (nuevosComponentes.length === 0) {
            return res.status(400).json({ error: "Los componentes ya están asociados al producto." });
        }

        producto.componentes.push(...nuevosComponentes);
        await producto.save();

        res.status(201).json({ message: "Componentes asociados exitosamente", producto });
    } catch (error) {
        res.status(400).json({ error: "Error al asociar componentes al producto" });
    }
}

// Obtener todos los componentes de un producto
async function obtenerComponentesDeProducto(req, res) {
    try {
        const { id } = req.params;
        const producto = await Producto.findById(id);
        if (!producto) return res.status(404).json({ error: "Producto no encontrado" });
        res.status(200).json(producto.componentes);
    } catch (error) {
        res.status(400).json({ error: "Error al obtener los componentes del producto" });
    }
}

// Desasociar un fabricante de un producto
async function desasociarFabricanteDeProducto(req, res) {
    try {
        const { id, fabricanteId } = req.params;

        const producto = await Producto.findById(id);
        if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

        // Remover el fabricante de la lista de fabricantes del producto
        producto.fabricantes = producto.fabricantes.filter(f => f.toString() !== fabricanteId);
        await producto.save();

        res.status(200).json({ message: "Fabricante desasociado del producto exitosamente", producto });
    } catch (error) {
        res.status(400).json({ error: "Error al desasociar el fabricante del producto" });
    }
}

// Desasociar un componente de un producto
async function desasociarComponenteDeProducto(req, res) {
    try {
        const { id, componenteId } = req.params;

        const producto = await Producto.findById(id);
        if (!producto) return res.status(404).json({ error: "Producto no encontrado" });

        // Remover el componente de la lista de componentes del producto
        producto.componentes = producto.componentes.filter(c => c._id.toString() !== componenteId);
        await producto.save();

        res.status(200).json({ message: "Componente desasociado del producto exitosamente", producto });
    } catch (error) {
        res.status(400).json({ error: "Error al desasociar el componente del producto" });
    }
}

module.exports = {
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
};
