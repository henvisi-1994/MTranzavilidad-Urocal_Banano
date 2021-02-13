const express = require('express');
const controlador = require('./OperarioPersona.controller');
//const authJWT = require('../../middlewares/authJWT');      

const router = express.Router();

router.get('/', controlador.obtenerOperarios);                          // Coleccion (plural)
router.post('/', controlador.crearOperario);                                 
router.put('/:id', controlador.actualizarOperario);        
router.delete('/:id', controlador.eliminarOperario);                     

module.exports = router;