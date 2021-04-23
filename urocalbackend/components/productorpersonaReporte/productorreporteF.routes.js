const express = require('express');
const controlador = require('./productorreporte.controller');
//const authJWT = require('../../middlewares/authJWT');      

const router = express.Router();

router.get('/', controlador.obtenerProductoresFemenino);                          // Coleccion (plural)

module.exports = router;
