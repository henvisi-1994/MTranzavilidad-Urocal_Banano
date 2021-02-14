const express = require('express');
const controlador = require('./ExportadorPersona.controller');
//const authJWT = require('../../middlewares/authJWT');      

const router = express.Router();

router.get('/', controlador.obtenerExportadores);                          // Coleccion (plural)
router.post('/', controlador.crearExportador);                                 
router.put('/:id', controlador.actualizarExportador);        
router.delete('/:id', controlador.eliminarExportador);                     

module.exports = router;