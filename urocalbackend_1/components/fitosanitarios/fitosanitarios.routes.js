const express = require('express');
const controller = require('./fitosanitarios.controller');      

const router = express.Router();

router.get('/', controller.getFitosanitarios);
router.get('/:id', controller.getFitosanitario);
router.post('/', controller.createFitosanitario);
router.put('/:id', controller.updateFitosanitario);
router.delete('/:id', controller.deleteFitosanitario);

module.exports = router;