const express = require('express');
const controller = require('./finca.controller');

const router = express.Router();

router.get('/', controller.obtenerFincas);                                   // Coleccion (plural)
router.get('/propietario', controller.obtenerPropietario);                                 // Documento (singular)        
router.post('/', controller.crearFinca);                                 
router.put('/:id', controller.actualizarFinca);        
router.delete('/:id', controller.eliminarFinca);
router.get('/:id', controller.obtenerFincaProductor);


module.exports = router;