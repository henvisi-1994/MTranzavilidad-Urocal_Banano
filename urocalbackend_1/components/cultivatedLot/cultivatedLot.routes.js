const express = require('express');
const controller = require('./cultivatedLot.controller');

const router = express.Router();

router.get('/', controller.getAllCultivatedLot);                          // Obtiene lista de lotes cultivados
router.get('/:id', controller.getCultivatedLot);                          // Obtiene lote cultivado por id
router.post('/', controller.createCultivatedLot);
router.delete('/:id', controller.deleteCultivatedLot);
router.put('/:id', controller.updateCultivatedLot);

module.exports = router;