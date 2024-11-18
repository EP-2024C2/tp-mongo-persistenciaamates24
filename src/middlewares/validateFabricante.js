function validateFabricante(req, res, next) {
    const { nombre, direccion, contacto } = req.body;
    if (!nombre || typeof nombre !== 'string') {
        return res.status(400).json({ error: "El campo 'nombre' es requerido y debe ser una cadena de texto." });
    }
    if (direccion && typeof direccion !== 'string') {
        return res.status(400).json({ error: "El campo 'direccion' debe ser una cadena de texto si está presente." });
    }
    if (contacto && typeof contacto !== 'string') {
        return res.status(400).json({ error: "El campo 'contacto' debe ser una cadena de texto si está presente." });
    }
    next();
}

module.exports = validateFabricante;
