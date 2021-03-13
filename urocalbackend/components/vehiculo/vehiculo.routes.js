const express = require('express');
const controller = require('./vehiculo.controller');

const router = express.Router();

router.get('/', controller.obtenerTodosVehiculos);                          // Obtiene lista de productos
module.exports = router;