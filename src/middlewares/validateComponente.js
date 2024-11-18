function validateComponente(req, res, next) {
    const { nombre, descripcion } = req.body;
    if (!nombre || typeof nombre !== 'string') {
        return res.status(400).json({ error: "El campo 'nombre' es requerido y debe ser una cadena de texto." });
    }
    if (descripcion && typeof descripcion !== 'string') {
        return res.status(400).json({ error: "El campo 'descripcion' debe ser una cadena de texto si está presente." });
    }
    next();
}

module.exports = validateComponente;
