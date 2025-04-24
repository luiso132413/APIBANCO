const db = require("../models");
const Movimiento = db.movimiento;

// Crear un nuevo movimiento
exports.create = async (req, res) => {
    try {
        const nuevoMovimiento = await Movimiento.create(req.body);
        res.status(201).json(nuevoMovimiento);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el movimiento", error });
    }
};

// Obtener todos los movimientos
exports.findAll = async (req, res) => {
    try {
        const movimientos = await Movimiento.findAll();
        res.status(200).json(movimientos);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los movimientos", error });
    }
};

// Obtener un movimiento por ID
exports.findById = async (req, res) => {
    try {
        const movimiento = await Movimiento.findByPk(req.params.id);
        if (movimiento) {
            res.status(200).json(movimiento);
        } else {
            res.status(404).json({ message: "Movimiento no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al buscar el movimiento", error });
    }
};

// Actualizar un movimiento por ID
exports.updateById = async (req, res) => {
    try {
        const result = await Movimiento.update(req.body, {
            where: { id_movimiento: req.params.id }
        });
        if (result[0] === 1) {
            res.status(200).json({ message: "Movimiento actualizado correctamente" });
        } else {
            res.status(404).json({ message: "Movimiento no encontrado o sin cambios" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el movimiento", error });
    }
};

// Eliminar un movimiento por ID
exports.deleteById = async (req, res) => {
    try {
        const deleted = await Movimiento.destroy({
            where: { id_movimiento: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: "Movimiento eliminado correctamente" });
        } else {
            res.status(404).json({ message: "Movimiento no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el movimiento", error });
    }
};
