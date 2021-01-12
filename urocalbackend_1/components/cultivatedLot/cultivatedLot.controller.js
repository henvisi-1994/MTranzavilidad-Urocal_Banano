// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores
//const userDto = require('./users.dto');

const cultivatedLotModel = require('./cultivatedLot.model');
const validation = require('../../utils/validations');

module.exports = {
    // Agrega un nuevo lote cultivado
    async createCultivatedLot(req, res) {
        const { lotnumero, lotnumerohectareas, lotestado, lotobservacion, fincaid } = req.body;

        // Valida que las variables no esten vacias
        if (validation.emptyField(lotnumero) || validation.emptyField(lotnumerohectareas) || validation.emptyField(lotestado) ||
            validation.emptyField(lotobservacion) || validation.emptyField(fincaid)) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            try {
                await cultivatedLotModel.createCultivatedLot({ lotnumero, lotnumerohectareas, lotestado, lotobservacion, fincaid })
            } catch (error) {
                return res.status(500).send({ message: "Error al registrar lote cultivado" });
            }

            return res.status(201).send({ message: 'Lote cultivado registrado' });
        }
    },

    // Obtener todos los lotes cultivados
    async getAllCultivatedLot(req, res) {
        const result = await cultivatedLotModel.getAllCultivatedLot()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(result); // <--
    },

    // Obtener un lote cultivado por ID
    async getCultivatedLot(req, res) {
        const { id } = req.params;
        const cultivatedLot = await cultivatedLotModel.getCultivatedLot(id);
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return cultivatedLot === undefined ? res.status(200).send({}) : res.status(200).send(cultivatedLot);
    },

    // Actualiza un nuevo lote cultivado
    async updateCultivatedLot(req, res) {
        const { id } = req.params;
        const { lotnumero, lotnumerohectareas, lotestado, lotobservacion, fincaid } = req.body;

        if (validation.emptyField(lotnumero) || validation.emptyField(lotnumerohectareas) || validation.emptyField(lotestado) ||
            validation.emptyField(lotobservacion) || validation.emptyField(fincaid)) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            const rowCount = await cultivatedLotModel.updateCultivateLot(id, { lotnumero, lotnumerohectareas, lotestado, lotobservacion, fincaid })

            return rowCount == 1 ? res.status(200).send({ message: "Lote cultivado actualizado" }) : res.status(400).send({ message: "Error al actualizar lote cultivado" });
        }
    },

    // Elimina un lote cultivado
    async deleteCultivatedLot(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await cultivatedLotModel.deleteCultivatedLot(id);
            if (rowCount == 1) {
                return res.status(200).send({ message: "Eliminado exitosamente" });
            } else {
                return res.status(400).send({ message: "Lote cultivado no registrado" });
            }

        } catch (err) {
            if (err.code == '23503') {
                res.status(400).send({ message: "El lote cultivado a eliminar tiene relaciones con otros registros en la base de datos" });
            } else {
                return res.status(400).send({ message: "Error al eliminar lote cultivado" });
            }
        }
    }
}