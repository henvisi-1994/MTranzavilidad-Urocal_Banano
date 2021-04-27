const express = require('express');
const controlador = require('./productorreporte.controller');
//const authJWT = require('../../middlewares/authJWT');      

const router = express.Router();

router.get('/', controlador.obtenerProductores);                          // Coleccion (plural)
router.get('/:id', controlador.obtenerProductor);                         // Coleccion (singular) 

module.exports = router;
