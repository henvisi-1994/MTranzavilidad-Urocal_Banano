const express = require('express');
const controlador = require('./ConductorPersona.controller');
//const authJWT = require('../../middlewares/authJWT');      

const router = express.Router();

router.get('/', controlador.obtenerConductores);                          // Coleccion (plural)
router.post('/', controlador.crearConductor);                                 
router.put('/:id', controlador.actualizarConductor);        
router.delete('/:id', controlador.eliminarConductor);                     

module.exports = router;