// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores

const paisModel = require('./pais.model');
const validation = require('../../utils/validations');

module.exports = {

    // Crear un nuevo registro Pais
    async crearPais(req, res) {

        // Añadir capa de validación

        const { paisnombre } = req.body;
        if(validation.emptyField(paisnombre)){
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        }else{
            try {
                let result = await paisModel.crearPais({
                    paisnombre: paisnombre});
                return res.status(201).send({ message: 'País registrada', paisid: result.paisid });
            } catch (error) {
                return res.status(500).send({ message: "Registro fallido" });
            }
        }
    },

    // Obtener todos los registros de Pais
    async obtenerPaises(req, res) {
        const pais = await paisModel.obtenerPaises()
        return res.status(200).send(pais); // <--
    },

    //  Obtener registro de Pais por id
    async obtenerPais(req, res) {
        const { id } = req.params;
        const rows = await paisModel.obtenerPais(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Registro no encontrado" });
    },

    // Actualiza informacion de un registro de Pais
    async actualizarPais(req, res) {
        const { id } = req.params;
        const { paisnombre } = req.body;
        if(validation.emptyField(paisnombre)){
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        }else{
            const rowCount = await paisModel.actualizarPais(id, {
                paisnombre: paisnombre,});
            return rowCount == 1 ? res.status(200).send({ message: "País actualizado" }) : res.status(400).send({ message: "Error al actualizar país" });
        }
    },

    // Elimina un registro de Pais
    async eliminarPais(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await paisModel.eliminarPais(id);
            if (rowCount == 1) {
                return res.status(200).send({ message: "Eliminado exitosamente" });
            } else {
                return res.status(400).send({ message: "País no registrado" });
            }              
        } catch (err) {
            if (err.code == '23503') {
                res.status(400).send({ message: "País a eliminar tiene relaciones con otros registros en la base de datos" });
            } else {
                return res.status(400).send({ message: "Error al eliminar país" });
            }
        }
    }
}

