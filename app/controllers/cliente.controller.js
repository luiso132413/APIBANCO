const db = require('../config/db.config.js');
const Cliente = db.Clientes;

// Crear un nuevo cliente
exports.create = async (req, res) => {
    try {
        // Validar campos obligatorios
        if (!req.body.dpi) {
            return res.status(400).json({
                success: false,
                message: "El DPI es un campo obligatorio"
            });
        }

        if (!req.body.nombres || !req.body.apellidos) {
            return res.status(400).json({
                success: false,
                message: "Los nombres y apellidos son campos obligatorios"
            });
        }

        // Construir objeto Cliente
        const cliente = {
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            dpi: req.body.dpi,
            nit: req.body.nit || null,
            recibo_luz: req.body.recibo_luz || null,
            beneficiario: req.body.beneficiario || null,
            fecha_registro: req.body.fecha_registro || new Date()
        };

        // Verificar si el DPI ya existe
        const existeCliente = await Cliente.findOne({ where: { dpi: cliente.dpi } });
        if (existeCliente) {
            return res.status(409).json({
                success: false,
                message: "Ya existe un cliente con este DPI"
            });
        }

        // Guardar en la base de datos
        const result = await Cliente.create(cliente);
        
        res.status(201).json({
            success: true,
            message: "Cliente creado exitosamente",
            data: {
                id_cliente: result.id_cliente,
                nombres: result.nombres,
                apellidos: result.apellidos,
                dpi: result.dpi
            }
        });

    } catch (error) {
        console.error("Error al crear cliente:", error);
        res.status(500).json({
            success: false,
            message: "Error al crear el cliente",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Obtener todos los clientes (con paginación)
exports.retrieveAllClientes = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Cliente.findAndCountAll({
            attributes: ['id_cliente', 'nombres', 'apellidos', 'dpi', 'fecha_registro'],
            limit: limit,
            offset: offset,
            order: [['fecha_registro', 'DESC']]
        });

        const totalPages = Math.ceil(count / limit);

        res.status(200).json({
            success: true,
            data: rows,
            pagination: {
                totalItems: count,
                totalPages: totalPages,
                currentPage: page,
                itemsPerPage: limit
            }
        });

    } catch (error) {
        console.error("Error al obtener clientes:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener clientes",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Obtener un cliente por su id
exports.getClienteById = async (req, res) => {
    try {
        const clienteId = req.params.id;
        const cliente = await Cliente.findByPk(clienteId, {
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (!cliente) {
            return res.status(404).json({
                success: false,
                message: `Cliente no encontrado con id = ${clienteId}`
            });
        }

        res.status(200).json({
            success: true,
            data: cliente
        });

    } catch (error) {
        console.error(`Error al buscar cliente con id ${req.params.id}:`, error);
        res.status(500).json({
            success: false,
            message: "Error al buscar cliente",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Actualizar un cliente por su id
exports.updateById = async (req, res) => {
    try {
        const clienteId = req.params.id;
        const cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            return res.status(404).json({
                success: false,
                message: `No se encontró el cliente con id = ${clienteId}`
            });
        }

        // Validar que no se intente modificar el DPI
        if (req.body.dpi && req.body.dpi !== cliente.dpi) {
            return res.status(400).json({
                success: false,
                message: "El DPI no puede ser modificado"
            });
        }

        const updatedData = {
            nombres: req.body.nombres || cliente.nombres,
            apellidos: req.body.apellidos || cliente.apellidos,
            nit: req.body.nit !== undefined ? req.body.nit : cliente.nit,
            recibo_luz: req.body.recibo_luz !== undefined ? req.body.recibo_luz : cliente.recibo_luz,
            beneficiario: req.body.beneficiario !== undefined ? req.body.beneficiario : cliente.beneficiario
        };

        await Cliente.update(updatedData, {
            where: { id_cliente: clienteId }
        });

        const updatedCliente = await Cliente.findByPk(clienteId);
        
        res.status(200).json({
            success: true,
            message: "Cliente actualizado exitosamente",
            data: updatedCliente
        });

    } catch (error) {
        console.error(`Error al actualizar cliente con id ${req.params.id}:`, error);
        res.status(500).json({
            success: false,
            message: "Error al actualizar el cliente",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Eliminar un cliente por su id
exports.deleteById = async (req, res) => {
    try {
        const clienteId = req.params.id;
        const cliente = await Cliente.findByPk(clienteId);

        if (!cliente) {
            return res.status(404).json({
                success: false,
                message: `No existe un cliente con id = ${clienteId}`
            });
        }

        // Verificar si el cliente tiene cuentas asociadas antes de eliminar
        const cuentas = await cliente.getCuentas();
        if (cuentas && cuentas.length > 0) {
            return res.status(400).json({
                success: false,
                message: "No se puede eliminar el cliente porque tiene cuentas asociadas"
            });
        }

        await cliente.destroy();
        
        res.status(200).json({
            success: true,
            message: `Cliente eliminado exitosamente con id = ${clienteId}`,
            data: {
                id_cliente: cliente.id_cliente,
                nombres: cliente.nombres,
                apellidos: cliente.apellidos
            }
        });

    } catch (error) {
        console.error(`Error al eliminar cliente con id ${req.params.id}:`, error);
        res.status(500).json({
            success: false,
            message: "Error al eliminar el cliente",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Buscar cliente por DPI
exports.getClienteByDpi = async (req, res) => {
    try {
        const dpi = req.params.dpi;
        const cliente = await Cliente.findOne({ 
            where: { dpi: dpi },
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });

        if (!cliente) {
            return res.status(404).json({
                success: false,
                message: `Cliente no encontrado con DPI = ${dpi}`
            });
        }

        res.status(200).json({
            success: true,
            data: cliente
        });

    } catch (error) {
        console.error(`Error al buscar cliente con DPI ${req.params.dpi}:`, error);
        res.status(500).json({
            success: false,
            message: "Error al buscar cliente por DPI",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}

// Búsqueda avanzada de clientes
exports.searchClientes = async (req, res) => {
    try {
        const { nombres, apellidos, dpi } = req.query;
        const where = {};

        if (nombres) where.nombres = { [db.Sequelize.Op.like]: `%${nombres}%` };
        if (apellidos) where.apellidos = { [db.Sequelize.Op.like]: `%${apellidos}%` };
        if (dpi) where.dpi = dpi;

        const clientes = await Cliente.findAll({
            where: where,
            attributes: ['id_cliente', 'nombres', 'apellidos', 'dpi', 'fecha_registro'],
            limit: 50
        });

        res.status(200).json({
            success: true,
            data: clientes
        });

    } catch (error) {
        console.error("Error en búsqueda de clientes:", error);
        res.status(500).json({
            success: false,
            message: "Error en búsqueda de clientes",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
}