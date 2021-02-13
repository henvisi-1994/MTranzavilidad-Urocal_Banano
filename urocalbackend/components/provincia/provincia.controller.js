// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores

const provinciaModel = require('./provincia.model');
const provinciaDto = require('./provincia.dto');
const validation = require('../../utils/validations');

module.exports = {

    // Crear un nuevo registro Provincia
    async crearProvincia(req, res) {

        // Añadir capa de validación

        const { provincianombre, provinciapais } = req.body;
        if(validation.emptyField(provincianombre) || validation.emptyField(provinciapais.paisid)){
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        }else{
            try {
                let result =  await provinciaModel.crearProvincia({
                    provincianombre: provincianombre,
                    paisid: provinciapais.paisid});
                return res.status(201).send({ message: 'Provincia registrada', provinciaid: result.provinciaid });
            } catch (error) {
                return res.status(500).send({ message: "Registro fallido" });
             }
        }
    },

    // Obtener todos los registros de Provincias
    async obtenerProvincias(req, res) {
        const provincia = await provinciaModel.obtenerProvincias()
        return res.status(200).send(provinciaDto.multipleProvincia(provincia)); //<--
    },

    //  Obtener registro de Provincia por id
    async obtenerProvincia(req, res) {
        const { id } = req.params;
        const rows = await provinciaModel.obtenerProvincia(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Registro no encontrado" });
    },

    // Actualiza informacion de un registro de Provincia
    async actualizarProvincia(req, res) {
        const { id } = req.params;
        const { provincianombre, provinciapais } = req.body;
        if(validation.emptyField(provincianombre) || validation.emptyField(provinciapais.paisid)){
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        }else{
            const rowCount = await provinciaModel.actualizarProvincia(id, {
                provincianombre: provincianombre,
                paisid: provinciapais.paisid});
            return rowCount == 1 ? res.status(200).send({ message: "Provincia actualizada" }) : res.status(400).send({ message: "Error al actualizar provincia" });
        }
    },

    // Elimina un registro de Provincia
    async eliminarProvincia(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await provinciaModel.eliminarProvincia(id);
            if (rowCount == 1) {
                return res.status(200).send({ message: "Eliminado exitosamente" });
            } else {
                return res.status(400).send({ message: "Provincia no registrada" });
            }  
        } catch (err) {
            if (err.code == '23503') {
                res.status(400).send({ message: "Provincia a eliminar tiene relaciones con otros registros en la base de datos" });
            } else {
                return res.status(400).send({ message: "Error al eliminar provincia" });
            }        
        }
    }
}

