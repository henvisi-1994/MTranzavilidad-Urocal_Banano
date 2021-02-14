const express = require('express');
const controller = require('./ciudad.controller');

const router = express.Router();

router.get('/', controller.obtenerCiudades);                                   // Coleccion (plural)
router.get('/:id', controller.obtenerCiudad);                                 // Documento (singular)        
router.post('/', controller.crearCiudad);                                 
router.put('/:id', controller.actualizarCiudad);        
router.delete('/:id', controller.eliminarCiudad);

module.exports = router;