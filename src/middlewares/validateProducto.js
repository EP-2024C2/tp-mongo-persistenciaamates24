function validateProducto(req, res, next) {
    const { nombre, precio, componentes } = req.body;
    if (!nombre || typeof nombre !== 'string') {
        return res.status(400).json({ error: "El campo 'nombre' es requerido y debe ser una cadena de texto." });
    }
    if (typeof precio !== 'number') {
        return res.status(400).json({ error: "El campo 'precio' es requerido y debe ser un número." });
    }
    if (componentes && !Array.isArray(componentes)) {
        return res.status(400).json({ error: "El campo 'componentes' debe ser un array si está presente." });
    }
    next();
}

module.exports = validateProducto;
