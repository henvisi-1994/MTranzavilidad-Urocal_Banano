const express = require('express');
const controller = require('./harvests.controller');
//const authJWT = require('../../middlewares/authJWT');      

const router = express.Router();

router.get('/', controller.getHarvests);                                   // Coleccion de todos las cosechas
router.get('/sin_detalle', controller.obtenerCosechasSinDetalleCompra);    // Coleccion de todos las cosechas sin detalle
router.get('/con_detalle', controller.obtenerCosechasConDetalleCompra);    // Coleccion de todos las cosechas con detalle
router.get('/:id', controller.getHarvest);                                 // devuelve una coleccion por id        
router.post('/', controller.createHarvest);                                // crea una Cosecha
router.put('/:id', controller.updateHarvest);                              // actualiza una cosecha
router.delete('/:id', controller.deleteHarvest);                           // elimina una cosecha

module.exports = router;