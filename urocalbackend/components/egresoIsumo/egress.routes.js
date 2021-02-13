const express = require('express');
const controller = require('./egress.controller');
const router = express.Router();

router.get('/', controller.getAllegresss);                          // Obtiene lista de egressos
router.get('/:id', controller.getegress);                          // Obtiene egresso por id
router.post('/', controller.createegress);
router.delete('/:id', controller.deleteegress);
router.put('/:id', controller.updateegress);

module.exports = router;