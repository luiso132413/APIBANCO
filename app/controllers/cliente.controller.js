const db = require('../config/db.config.js');
const Cliente = db.Cliente;

// Crear un nuevo cliente
exports.create = async (req, res) => {
    try {
        const nuevoCliente = await Cliente.create({
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            dpi: req.body.dpi,
            nit: req.body.nit,
            recibo_luz: req.body.recibo_luz,
            beneficiario: req.body.beneficiario
        });

        res.status(200).json({
            message: "Cliente creado exitosamente con id = " + nuevoCliente.id_cliente,
            cliente: nuevoCliente
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al crear el cliente",
            error: error.message
        });
    }
};

// Obtener todos los clientes
exports.findAll = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.status(200).json({
            message: "Clientes obtenidos exitosamente",
            clientes: clientes
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al obtener los clientes",
            error: error.message
        });
    }
};

// Obtener un cliente por ID
exports.findById = async (req, res) => {
    const id = req.params.id;

    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            res.status(404).json({ message: "Cliente no encontrado con id = " + id });
        } else {
            res.status(200).json({ message: "Cliente encontrado", cliente });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error al buscar el cliente",
            error: error.message
        });
    }
};

// Actualizar cliente por ID
exports.updateById = async (req, res) => {
    const id = req.params.id;

    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado con id = " + id });
        }

        await Cliente.update(req.body, { where: { id_cliente: id } });

        res.status(200).json({
            message: "Cliente actualizado correctamente",
            clienteActualizado: req.body
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar el cliente",
            error: error.message
        });
    }
};

// Eliminar cliente por ID
exports.deleteById = async (req, res) => {
    const id = req.params.id;

    try {
        const cliente = await Cliente.findByPk(id);
        if (!cliente) {
            return res.status(404).json({ message: "Cliente no encontrado con id = " + id });
        }

        await cliente.destroy();
        res.status(200).json({ message: "Cliente eliminado correctamente", cliente });
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar el cliente",
            error: error.message
        });
    }
};
