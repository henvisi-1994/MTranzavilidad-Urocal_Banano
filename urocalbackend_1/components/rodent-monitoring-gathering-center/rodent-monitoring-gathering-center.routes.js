const express = require('express');
const controller = require('./rodent-monitoring-gathering-center.controller');

const router = express.Router();

router.get('/', controller.getRodentMonitoringGatheringCenters);                                   // Coleccion (plural)
router.get('/:id', controller.getRodentMonitoringGatheringCenter);                                 // Documento (singular)        
router.post('/', controller.createRodentMonitoringGatheringCenter);                                 
router.put('/:id', controller.updateRodentMonitoringGatheringCenter);        
router.delete('/:id', controller.deleteRodentMonitoringGatheringCenter);

module.exports = router;