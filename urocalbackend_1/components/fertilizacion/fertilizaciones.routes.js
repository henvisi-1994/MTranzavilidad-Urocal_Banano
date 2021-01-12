const express = require('express');
const controller = require('./fertilizaciones.controller');      

const router = express.Router();

router.get('/', controller.getFertilizaciones);
router.get('/:id', controller.getFertilizacion);
router.post('/', controller.createFertilizacion);
router.put('/:id', controller.updateFertilizacion);
router.delete('/:id', controller.deleteFertilizacion);

module.exports = router;