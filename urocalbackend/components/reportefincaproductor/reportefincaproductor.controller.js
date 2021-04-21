// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores

const fincaModel = require('./reportefincaproductor.model');
const fincaDto = require('./reportefincaproductor.dto');
const validation = require('../../utils/validations');

module.exports = {

    // Obtener todos los registros de finca
    async obtenerFincas(req, res) {
        const finca = await fincaModel.obtenerFincas()
        return res.status(200).send(fincaDto.multipleFinca(finca)); //<--
    },

    // Devuelve todos los productores
    async obtenerPropietario(req, res) {
        const propietario = await fincaModel.obtenerPropietario()
        return res.status(200).send((propietario)); //<--
    },

    // Devuelve todas las fincas por productor
    async obtenerFincasProductor(req, res) {
        const { id } = req.params;
        const finca = await fincaModel.obtenerFincasProductor(id);
        return res.status(200).send(fincaDto.multipleFinca(finca)); //<--
    },
}

