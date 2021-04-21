const express = require('express');
const controller = require('./reportefincaproductor.controller');

const router = express.Router();

router.get('/', controller.obtenerFincas);                                   // Coleccion (plural)
router.get('/:id', controller.obtenerFincasProductor);                                 // Documento (singular)        

module.exports = router;