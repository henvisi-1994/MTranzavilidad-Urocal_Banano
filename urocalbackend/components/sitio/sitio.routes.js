const express = require('express');
const controller = require('./sitio.controller');

const router = express.Router();

router.get('/', controller.obtenerSitios);                                   // Coleccion (plural)
router.get('/:id', controller.obtenerSitio);                                 // Documento (singular)        
router.post('/', controller.crearSitio);                                 
router.put('/:id', controller.actualizarSitio);        
router.delete('/:id', controller.eliminarSitio);

module.exports = router;