module.exports = (sequelize, Sequelize) => {
    const Cuenta = sequelize.define('cuenta', {
        id_cuenta: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tipo_cuenta: {
            type: Sequelize.ENUM('Monetaria', 'Ahorro'),
            allowNull: false
        },
        estado: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        saldo: {
            type: Sequelize.DECIMAL(12, 2),
            defaultValue: 0.0
        }
    });

    return Cuenta;
};