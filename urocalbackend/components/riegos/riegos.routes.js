const express = require('express');
const controller = require('./riegos.controller');      

const router = express.Router();

router.get('/', controller.getRiegos);
router.get('/:id', controller.getRiego);
router.post('/', controller.createRiego);
router.put('/:id', controller.updateRiego);
router.delete('/:id', controller.deleteRiego);

module.exports = router;