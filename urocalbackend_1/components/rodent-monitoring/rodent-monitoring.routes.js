const express = require('express');
const controller = require('./rodent-monitoring.controller');

const router = express.Router();

router.get('/', controller.getRodentMonitorings);                                   // Coleccion (plural)
router.get('/:id', controller.getRodentMonitoring);                                 // Documento (singular)        
router.post('/', controller.createRodentMonitoring);                                 
router.put('/:id', controller.updateRodentMonitoring);        
router.delete('/:id', controller.deleteRodentMonitoring);

module.exports = router;