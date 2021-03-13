const express = require('express');
const controlador = require('./ProductorPersona.controller');
//const authJWT = require('../../middlewares/authJWT');      

const router = express.Router();

router.get('/', controlador.obtenerProductores);                          // Coleccion (plural)
router.get('/:id', controlador.obtenerProductor);   
router.post('/', controlador.crearProductor);                                 
router.put('/:id', controlador.actualizarProductor);        
router.delete('/:id', controlador.eliminarProductor);                     

module.exports = router;