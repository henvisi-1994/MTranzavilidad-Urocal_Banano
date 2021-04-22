const express = require('express');
const controller = require('./producto.controller');

const router = express.Router();

router.get('/', controller.obtenerTodosProducto);                          // Obtiene lista de productos
router.get('/cacao', controller.obtenerDetallesCacao); 
router.get('/:id', controller.obtenerProducto);                          // Obtiene producto por id
router.post('/', controller.crearProducto);
router.delete('/:id', controller.eliminarProducto);
router.put('/:id', controller.actualizarProducto);
module.exports = router;