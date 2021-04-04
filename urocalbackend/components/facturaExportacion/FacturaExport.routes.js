const express = require('express');
const controlador = require('./FacturaExport.controller');    

const router = express.Router();

router.get('/', controlador.obtenerFacturaExportes);                          // Coleccion (plural)
router.post('/', controlador.crearFacturaExport);                                 
router.put('/:id', controlador.actualizarFacturaExport);        
router.delete('/:id', controlador.eliminarFacturaExport); 

module.exports = router;