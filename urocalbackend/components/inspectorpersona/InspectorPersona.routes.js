const express = require('express');
const controlador = require('./InspectorPersona.controller');
//const authJWT = require('../../middlewares/authJWT');      

const router = express.Router();

router.get('/', controlador.obtenerInspectores);                          // Coleccion (plural)
router.post('/', controlador.crearInspector);                                 
router.put('/:id', controlador.actualizarInspector);        
router.delete('/:id', controlador.eliminarInspector);                     

module.exports = router;