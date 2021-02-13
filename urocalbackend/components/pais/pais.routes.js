const express = require('express');
const controller = require('./pais.controller');

const router = express.Router();

router.get('/', controller.obtenerPaises);                                   // Coleccion (plural)
router.get('/:id', controller.obtenerPais);                                 // Documento (singular)        
router.post('/', controller.crearPais);                                 
router.put('/:id', controller.actualizarPais);        
router.delete('/:id', controller.eliminarPais);

module.exports = router;