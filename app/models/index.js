Cliente.hasMany(Cuenta, { foreignKey: 'id_cliente' });
Cuenta.belongsTo(Cliente, { foreignKey: 'id_cliente' });

Cuenta.hasMany(Movimiento, { foreignKey: 'id_cuenta' });
Movimiento.belongsTo(Cuenta, { foreignKey: 'id_cuenta' });

Movimiento.hasOne(Transaccion, { foreignKey: 'id_movimiento' });
Transaccion.belongsTo(Movimiento, { foreignKey: 'id_movimiento' });