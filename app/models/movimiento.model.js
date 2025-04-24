module.exports = (sequelize, Sequelize) => {
    const Movimiento = sequelize.define('movimiento', {
        id_movimiento: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        fecha: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        tipo_movimiento: {
            type: Sequelize.ENUM(
                'Deposito Efectivo', 
                'Deposito Cheque', 
                'Retiro Efectivo', 
                'Retiro Cheque', 
                'Cambio de Moneda', 
                'Pago de Servicio'
            ),
            allowNull: false
        },
        monto: {
            type: Sequelize.DECIMAL(12, 2),
            allowNull: false
        },
        descripcion: {
            type: Sequelize.TEXT
        },
        validado: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        limite_excedido: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    return Movimiento;
};