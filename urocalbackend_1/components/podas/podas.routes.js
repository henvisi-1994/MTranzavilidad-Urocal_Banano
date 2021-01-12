const express = require('express');
const controller = require('./podas.controller');      

const router = express.Router();

router.get('/', controller.getPodas);
router.get('/:id', controller.getPoda);
router.post('/', controller.createPoda);
router.put('/:id', controller.updatePoda);
router.delete('/:id', controller.deletePoda);

module.exports = router;