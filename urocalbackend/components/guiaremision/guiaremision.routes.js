const express = require('express');
const controller = require('./guiaremision.controller');      

const router = express.Router();

router.get('/', controller.getGuiaRemisiones);
router.get('/:id', controller.getGuiaRemision);
router.post('/', controller.createGuiaRemision);
router.put('/:id', controller.updateGuiaRemision);
router.delete('/:id', controller.deleteGuiaRemision);
router.delete('/carga/:id', controller.deleteCarga);

module.exports = router;