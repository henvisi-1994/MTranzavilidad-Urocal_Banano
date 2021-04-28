const express = require('express');
const controlador = require('./FacturaExport.controller');    

const router = express.Router();

router.get('/', controlador.obtenerFacturaExportes);
router.get('/detalle/:id', controlador.obtenerDetalleFacturaExportacion);  
router.get('/:id', controlador.obtenerFacturaExportacion);                           // Coleccion (plural)
router.post('/', controlador.crearFacturaExport);                                  
router.put('/:id', controlador.actualizarFacturaExport);        
router.delete('/:id', controlador.eliminarFacturaExport); 
router.delete('/detalle/:id', controlador.eliminarDetalleFacturaExport); 

module.exports = router;