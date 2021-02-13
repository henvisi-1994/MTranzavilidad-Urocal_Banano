const express = require('express');
const controller = require('./provincia.controller');

const router = express.Router();

router.get('/', controller.obtenerProvincias);                                   // Coleccion (plural)
router.get('/:id', controller.obtenerProvincia);                                 // Documento (singular)        
router.post('/', controller.crearProvincia);                                 
router.put('/:id', controller.actualizarProvincia);        
router.delete('/:id', controller.eliminarProvincia);

module.exports = router;