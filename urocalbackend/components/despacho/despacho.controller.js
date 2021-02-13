// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores
//const userDto = require('./users.dto');

const despachoModel = require('./despacho.model');
const validation = require('../../utils/validations');

module.exports = {

    // Crear Nuevo Despacho
    async createDespacho(req, res) {
        const { desnumero, desfechasalida, desdestino, desmotivo, desorganico, desspp } = req.body;
        // Valida que las variables no esten vacias
        if (validation.emptyField(desnumero) || validation.emptyField(desfechasalida) || validation.emptyField(desdestino) ||
            validation.emptyField(desmotivo) || validation.emptyField(desorganico) || validation.emptyField(desspp)) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            try {
                let result = await despachoModel.createDespacho({ desnumero, desfechasalida, desdestino, desmotivo, desorganico, desspp })

                return res.status(201).send({ message: 'Despacho registrado', despachoid: result.despachoid });
            } catch (error) {
                return res.status(500).send({ message: "Error al registrar el Despacho" });
            }
        }
    },


    // Obtener todos los Despachos
    async getDespacho(req, res) {
        const result = await despachoModel.getDespacho()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(result); // <--
    },


    //  Obtener un Despacho por id
    async getIdDespacho(req, res) {
        const { id } = req.params;
        const despacho = await despachoModel.getIdDespacho(id);
        //return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Despacho no encontrado" });
        return despacho === undefined ? res.status(200).send({}) : res.status(200).send(despacho);
    },


    // Actualiza informacion de un Despacho
    async updateDespacho(req, res) {
        const { id } = req.params;
        const { desnumero, desfechasalida, desdestino, desmotivo, desorganico, desspp } = req.body;
        
        if (validation.emptyField(desnumero) || validation.emptyField(desfechasalida) || validation.emptyField(desdestino) ||
            validation.emptyField(desmotivo) || validation.emptyField(desorganico) || validation.emptyField(desspp)) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            const rowCount = await despachoModel.updateDespacho(id, { desnumero, desfechasalida, desdestino, desmotivo, desorganico, desspp })

            return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });
        }
    },

    
    // Elimina informacion de un Despacho
    async deleteDespacho(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await despachoModel.deleteDespacho(id);
            if(rowCount == 1){
                return res.status(200).send({ message: "Eliminado exitosamente" });
            } else {
                return res.status(400).send({ message: "Despacho no registrado" });
            }
        } catch (err) {
            if (err.code == '23503') {
                res.status(400).send({ message: "El Despacho a eliminar tiene relaciones con otros registros en la base de datos" });
            } else {
                return res.status(400).send({ message: "Error al tratar de eliminar el Despacho" });
            }
        }
    },
}
