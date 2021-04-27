// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores
//const userDto = require('./users.dto');

const modeloLoteCultivado = require('./loteCultivado.model');
const validation = require('../../utils/validations');
const { obtenerTodosLoteCultivadoDeFinca } = require('./loteCultivado.dao');

module.exports = {
    // Agrega un nuevo lote cultivado
    async crearLoteCultivado(req, res) {
        const { lotnumero, lotnumerohectareas, lotestado, lotobservacion, fincaid } = req.body;

        // Valida que las variables no esten vacias
        if (validation.emptyField(lotnumero) || validation.emptyField(lotnumerohectareas) || validation.emptyField(lotestado) ||
            validation.emptyField(lotobservacion) || validation.emptyField(fincaid)) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            try {
                let result = await modeloLoteCultivado.crearLoteCultivado({ lotnumero, lotnumerohectareas, lotestado, lotobservacion, fincaid })

                return res.status(201).send({ message: 'Lote registrado', lotecultivadoid: result.lotecultivadoid });
            } catch (error) {
                return res.status(500).send({ message: "Error al registrar lote cultivado" });
            }
        }
    },

    // Obtener todos los lotes cultivados
    async obtenerTodosLoteCultivado(req, res) {
        const result = await modeloLoteCultivado.obtenerTodosLoteCultivado()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(result); // <--
    },

    async obtenerTodosLoteCultivadoDeFinca(req, res) {
        const { id } = req.params;
        const result = await modeloLoteCultivado.obtenerTodosLoteCultivadoDeFinca(id)
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(result); // <--
    },


    // Obtener un lote cultivado por ID
    async obtenerLoteCultivado(req, res) {
        const { id } = req.params;
        const loteCultivado = await modeloLoteCultivado.obtenerLoteCultivado(id);
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return loteCultivado === undefined ? res.status(200).send({}) : res.status(200).send(loteCultivado);
    },

    // Actualiza un nuevo lote cultivado
    async actualizarLoteCultivado(req, res) {
        const { id } = req.params;
        const { lotnumero, lotnumerohectareas, lotestado, lotobservacion, fincaid } = req.body;

        if (validation.emptyField(lotnumero) || validation.emptyField(lotnumerohectareas) || validation.emptyField(lotestado) ||
            validation.emptyField(lotobservacion) || validation.emptyField(fincaid)) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            const rowCount = await modeloLoteCultivado.actualizarLoteCultivado(id, { lotnumero, lotnumerohectareas, lotestado, lotobservacion, fincaid })

            return rowCount == 1 ? res.status(200).send({ message: "Lote cultivado actualizado" }) : res.status(400).send({ message: "Error al actualizar lote cultivado" });
        }
    },

    // Elimina un lote cultivado
    async eliminarLoteCultivado(req, res) {
        const { id } = req.params;
        try {
            let rowCount1 = await modeloLoteCultivado.eliminarLoteCultivadodeCultivo(id);
            let rowCount2 = await modeloLoteCultivado.eliminarLoteCultivadodemedioambiente(id);
            let rowCount3 = await modeloLoteCultivado.eliminarLoteCultivadodesuelo(id);
            
            let rowCount4 = await modeloLoteCultivado.eliminarLoteCultivado(id);
            
            if (rowCount1 == 1 || rowCount2==1 || rowCount3 ==1 || rowCount4 || 1) {
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