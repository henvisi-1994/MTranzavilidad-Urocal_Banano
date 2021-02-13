const express = require('express');
const controller = require('./limpiezacentroacopio.controller');
//const authJWT = require('../../middlewares/authJWT');      

const router = express.Router();

router.get('/', controller.getLimpiezaCA);                                   // Coleccion (plural)
router.get('/:id', controller.getIdLimpiezaCA);                                 // Documento (singular)        
router.post('/', controller.createLimpiezaCA);                                 
router.put('/:id', controller.updateLimpiezaCA);        
//router.patch('/:id/update-passwd', controller.updatePasswd);            // (Controlador - verbos) POST /users/20/reset-password
router.delete('/:id', controller.deleteLimpiezaCA);

module.exports = router;