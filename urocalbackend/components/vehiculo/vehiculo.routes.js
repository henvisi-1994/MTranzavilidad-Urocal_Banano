const express = require('express');
const controller = require('./vehiculo.controller');

const router = express.Router();

router.get('/', controller.obtenerTodosVehiculos);
router.get('/:id', controller.obtenerVehiculoFinca);
// Obtiene lista de productos
module.exports = router;