let express = require('express');
let router = express.Router();

const cliente = require('../controllers/cliente.controller');

// Rutas de los Clientes
router.post('/api/cliente/create', cliente.create);
router.get('/api/cliente/all', cliente.findAll);
router.get('/api/cliente/onebyid/:id', cliente.findById);
router.put('/api/cliente/update/:id', cliente.updateById);
router.delete('/api/cliente/delete/:id', cliente.deleteById);

module.exports = router;
