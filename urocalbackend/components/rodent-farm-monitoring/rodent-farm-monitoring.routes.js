const express = require('express');
const controller = require('./rodent-farm-monitoring.controller');

const router = express.Router();

router.get('/', controller.getRodentFarmMonitorings);                                   // Coleccion (plural)
router.get('/:id', controller.getRodentFarmMonitoring);                                 // Documento (singular)        
router.post('/', controller.createRodentFarmMonitoring);                                 
router.put('/:id', controller.updateRodentFarmMonitoring);        
router.delete('/:id', controller.deleteRodentFarmMonitoring);

module.exports = router;