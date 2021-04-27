// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores

const certificacionModel = require('./certificaciones.model');
const validation = require('../../utils/validations');

module.exports = {

    // Crear un nuevo registro Certificacion
    async crearCertificacion(req, res) {

        // Añadir capa de validación
        const { certificacionnombre, certificacion } = req.body;
        if(validation.emptyField(certificacionnombre) || validation.emptyField(certificacion)){
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        }else{
            try {
                let result = await certificacionModel.crearCertificacion({
                    certificacionnombre: certificacionnombre,
                    certificacion: certificacion});
                return res.status(201).send({ message: 'Certificacion registrada', certificacionid: result.certificacionid });
            } catch (error) {
                console.log(error);
                return res.status(500).send({ message: "Registro fallido" });
            }
        }
    },

    // Obtener todos los registros de Certificaciones
    async obtenerCertificaciones(req, res) {
        const certificacion = await certificacionModel.obtenerCertificaciones()
        return res.status(200).send(certificacion); //<--
    },

    //  Obtener registro de Certificacion por id
    async obtenerCertificacion(req, res) {
        const { id } = req.params;
        const rows = await certificacionModel.obtenerCertificacion(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Registro no encontrado" });
    },

    // Actualiza informacion de un registro de Certificacion
    async actualizarCertificacion(req, res) {
        const { id } = req.params;
        const { certificacionnombre, certificacion } = req.body;

        if(validation.emptyField(certificacionnombre) || validation.emptyField(certificacion)){
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        }else{
            const rowCount = await certificacionModel.actualizarCertificacion(id, {
                certificacionnombre: certificacionnombre,
                certificacion: certificacion});
            return rowCount == 1 ? res.status(200).send({ message: "Certificacion actualizada" }) : res.status(400).send({ message: "Error al actualizar certificacion" });
        }
    },

    // Elimina un registro de Certificacion
    async eliminarCertificacion(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await certificacionModel.eliminarCertificacion(id);
            if (rowCount == 1) {
                return res.status(200).send({ message: "Eliminado exitosamente" });
            } else {
                return res.status(400).send({ message: "Certificacion no registrada" });
            }              
        } catch (err) {
            if (err.code == '23503') {
                res.status(400).send({ message: "Certificacion a eliminar tiene relaciones con otros registros en la base de datos" });
            } else {
                return res.status(400).send({ message: "Error al eliminar certificacion" });
            } 
        }
    }
}

