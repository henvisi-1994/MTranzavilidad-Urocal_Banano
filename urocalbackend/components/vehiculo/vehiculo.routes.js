const express = require('express');
const controller = require('./vehiculo.controller');

const router = express.Router();

router.get('/', controller.obtenerTodosVehiculos);
router.get('/finca/:id', controller.obtenerVehiculoFinca);
router.get('/:id', controller.obtenerVehiculo);
router.post('/', controller.createVehiculo);
router.put('/:id', controller.updateVehiculo);
router.delete('/:id', controller.deleteVehiculo);

// Obtiene lista de productos
module.exports = router;