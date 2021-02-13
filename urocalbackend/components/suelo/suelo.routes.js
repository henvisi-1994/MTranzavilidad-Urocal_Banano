const express = require('express');
const controller = require('./suelo.controller');

const router = express.Router();

router.get('/', controller.obtenerTodosSuelo);                          // Obtiene lista de productos
router.get('/:id', controller.obtenerSuelo);                          // Obtiene producto por id
router.post('/', controller.crearSuelo);
router.delete('/:id', controller.eliminarSuelo);
router.put('/:id', controller.actualizarSuelo);

module.exports = router;