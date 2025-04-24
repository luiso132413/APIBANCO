const db = require("../models");
const Transaccion = db.transaccion;

// Crear una nueva transacción
exports.create = async (req, res) => {
    try {
        const nuevaTransaccion = await Transaccion.create(req.body);
        res.status(201).json(nuevaTransaccion);
    } catch (error) {
        res.status(500).json({ message: "Error al crear la transacción", error });
    }
};

// Obtener todas las transacciones
exports.findAll = async (req, res) => {
    try {
        const transacciones = await Transaccion.findAll();
        res.status(200).json(transacciones);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las transacciones", error });
    }
};

// Obtener una transacción por ID
exports.findById = async (req, res) => {
    try {
        const transaccion = await Transaccion.findByPk(req.params.id);
        if (transaccion) {
            res.status(200).json(transaccion);
        } else {
            res.status(404).json({ message: "Transacción no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al buscar la transacción", error });
    }
};

// Actualizar una transacción por ID
exports.updateById = async (req, res) => {
    try {
        const result = await Transaccion.update(req.body, {
            where: { id_transaccion: req.params.id }
        });
        if (result[0] === 1) {
            res.status(200).json({ message: "Transacción actualizada correctamente" });
        } else {
            res.status(404).json({ message: "Transacción no encontrada o sin cambios" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar la transacción", error });
    }
};

// Eliminar una transacción por ID
exports.deleteById = async (req, res) => {
    try {
        const deleted = await Transaccion.destroy({
            where: { id_transaccion: req.params.id }
        });
        if (deleted) {
            res.status(200).json({ message: "Transacción eliminada correctamente" });
        } else {
            res.status(404).json({ message: "Transacción no encontrada" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la transacción", error });
    }
};
