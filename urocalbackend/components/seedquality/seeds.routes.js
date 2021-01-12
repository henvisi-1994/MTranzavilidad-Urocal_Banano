const express = require('express');
const controller = require('./seeds.controller');
//const authJWT = require('../../middlewares/authJWT');      

const router = express.Router();

router.get('/', controller.getSeeds);                               // Coleccion (plural)
router.get('/:id', controller.getSeed);                             // Documento (singular)        
router.post('/', controller.createSeed);                                 
router.put('/:id', controller.updateSeed);
//router.patch('/:id/update-passwd', controller.updatePasswd);        // (Controlador - verbos) POST /users/20/reset-password
router.delete('/:id', controller.deleteSeed);

module.exports = router;