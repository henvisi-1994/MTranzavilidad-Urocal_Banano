// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores

const asociacionModel = require('./asociacion.model');
const asociacionDto = require('./asociacion.dto');
const validation = require('../../utils/validations');

module.exports = {

    // Crear un nuevo registro Asociacion
    async crearAsociacion(req, res) {

        // Añadir capa de validación

        const { asonombre, asoabreviado, asoruc, asoobservacion, asonumerosocios, asonumerohombres, asonumeromujeres, personaid } = req.body;
        if(validation.emptyField(asonombre) || validation.emptyField(asoabreviado) || validation.emptyField(asoruc) || validation.emptyField(asoobservacion) || validation.emptyField(asonumerosocios) || 
            validation.emptyField(asonumerohombres) || validation.emptyField(asonumeromujeres) || validation.emptyField(personaid)){
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        }else{
            try {
                let result =  await asociacionModel.crearAsociacion({
                    asonombre: asonombre,
                    asoabreviado: asoabreviado,
                    asoruc: asoruc,
                    asoobservacion: asoobservacion,
                    asonumerosocios: asonumerosocios,
                    asonumerohombres: asonumerohombres,
                    asonumeromujeres: asonumeromujeres,
                    asoresponsableid: personaid });
                return res.status(201).send({ message: 'Asociación registrada', asociacionid: result.asociacionid });
            } catch (error) {
                return res.status(500).send({ message: "Registro fallido" });
            }
        }
    },

    // Obtener todos los registros de Asociación
    async obtenerAsociaciones(req, res) {
        const asociacion = await asociacionModel.obtenerAsociaciones()
        return res.status(200).send(asociacionDto.multipleAsociacion(asociacion)); //<--
    },

    //  Obtener registro de Asociación por id
    async obtenerResponsable(req, res) {
        const asociacion = await asociacionModel.obtenerResponsable()
        return res.status(200).send((asociacion)); //<--
    },

    // Actualiza informacion de un registro de Asociacion
    async actualizarAsociacion(req, res) {
        const { id } = req.params;
        const { asonombre, asoabreviado, asoruc, asoobservacion, asonumerosocios, asonumerohombres, asonumeromujeres, asociacionresponsable } = req.body;
        if(validation.emptyField(asonombre) || validation.emptyField(asoabreviado) || validation.emptyField(asoruc) || validation.emptyField(asoobservacion) || validation.emptyField(asonumerosocios) || 
            validation.emptyField(asonumerohombres) || validation.emptyField(asonumeromujeres) || validation.emptyField(asociacionresponsable.personaid)){
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        }else{
            const rowCount = await asociacionModel.actualizarAsociacion(id, {
                asonombre: asonombre,
                asoabreviado: asoabreviado,
                asoruc: asoruc,
                asoobservacion: asoobservacion,
                asonumerosocios: asonumerosocios,
                asonumerohombres: asonumerohombres,
                asonumeromujeres: asonumeromujeres,
                asoresponsableid: asociacionresponsable.personaid });
            return rowCount == 1 ? res.status(200).send({ message: "Asociación actualizada" }) : res.status(400).send({ message: "Error al actualizar asociación" });
        }
    },

    // Elimina un registro de Asociacion
    async eliminarAsociacion(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await asociacionModel.eliminarAsociacion(id);
            if (rowCount == 1) {
                return res.status(200).send({ message: "Eliminado exitosamente" });
            } else {
                return res.status(400).send({ message: "Asociación no registrado" });
            }             
        } catch (err) {
            if (err.code == '23503') {
                res.status(400).send({ message: "Asociación a eliminar tiene relaciones con otros registros en la base de datos" });
            } else {
                return res.status(400).send({ message: "Error al eliminar asociación" });
            }        
        }
    }
}

