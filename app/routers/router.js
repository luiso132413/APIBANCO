let express = require('express');
let router = express.Router();

const cliente = require('../controllers/cliente.controller');
const cuenta = require('../controllers/cuenta.controller');
const movimiento = require('../controllers/movimiento.controller');
const transaccion = require('../controllers/transaccion.controller');

// Rutas de los Clientes
router.post('/api/cliente/create', cliente.create);
router.get('/api/cliente/all', cliente.findAll);
router.get('/api/cliente/onebyid/:id', cliente.findById);
router.put('/api/cliente/update/:id', cliente.updateById);
router.delete('/api/cliente/delete/:id', cliente.deleteById);

// Rutas de cuenta
router.post('/api/cuenta/create', cuenta.create);
router.get('/api/cuenta/all', cuenta.findAll);
router.get('/api/cuenta/onebyid/:id', cuenta.findById);
router.put('/api/cuenta/update/:id', cuenta.updateById);
router.delete('/api/cuenta/delete/:id', cuenta.deleteById);

//ruta de movimiento
router.post('/api/movimiento/create', movimiento.create);
router.get('/api/movimiento/all', movimiento.findAll);
router.get('/api/movimiento/onebyid/:id', movimiento.findById);
router.put('/api/movimiento/update/:id', movimiento.updateById);
router.delete('/api/movimiento/delete/:id', movimiento.deleteById);

//ruta de transaccion

router.post('/api/transaccion/create', transaccion.create);
router.get('/api/transaccion/all', transaccion.findAll);
router.get('/api/transaccion/onebyid/:id', transaccion.findById);
router.put('/api/movimiento/update/:id', movimiento.updateById);
router.delete('/api/movimiento/delete/:id', movimiento.deleteById);

module.exports = router;
