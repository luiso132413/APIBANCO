const { password } = require("../config/env");

module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define('cliente', {    
        id_cliente: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nombres: {
            type: Sequelize.STRING(20)
        },
        apellidos: {
            type: Sequelize.STRING(20)
        },
        // En cliente.model.js
        dpi: {
            type: Sequelize.BIGINT,  // Cambiado de INTEGER a BIGINT
            unique: true,
            allowNull: false
        },
        nit: {
            type: Sequelize.INTEGER
        },
        recibo_luz: {
            type: Sequelize.STRING(20)
        },
        beneficiario: {
            type: Sequelize.STRING(100)
        },
        fecha_registro: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    });
    
    return Cliente;
}