// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores

const sitioModel = require('./sitio.model');
const sitioDto = require('./sitio.dto');
const validation = require('../../utils/validations');

module.exports = {

    // Crear un nuevo registro Sitio
    async crearSitio(req, res) {

        // Añadir capa de validación

        const { sitionombre, sitiociudad } = req.body;
        if(validation.emptyField(sitionombre) || validation.emptyField(sitiociudad.ciudadid)){
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        }else{
            try {
                let result = await sitioModel.crearSitio({
                    sitionombre: sitionombre,
                    ciudadid: sitiociudad.ciudadid});
                return res.status(201).send({ message: 'Sitio registrado', sitioid: result.sitioid });
            } catch (error) {
                return res.status(500).send({ message: "Registro fallido" });
            }
        }
    },

    // Obtener todos los registros de Sitios
    async obtenerSitios(req, res) {
        const sitio = await sitioModel.obtenerSitios()
        return res.status(200).send(sitioDto.multipleSitio(sitio)); //<--
    },

    //  Obtener registro de Sitio por id
    async obtenerSitio(req, res) {
        const { id } = req.params;
        const rows = await sitioModel.obtenerSitio(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Registro no encontrado" });
    },

    // Actualiza informacion de un registro de Sitio
    async actualizarSitio(req, res) {
        const { id } = req.params;
        const { sitionombre, sitiociudad } = req.body;
        if(validation.emptyField(sitionombre) || validation.emptyField(sitiociudad.ciudadid)){
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        }else{
            const rowCount = await sitioModel.actualizarSitio(id, {
                sitionombre: sitionombre,
                ciudadid: sitiociudad.ciudadid});
            return rowCount == 1 ? res.status(200).send({ message: "Sitio actualizado" }) : res.status(400).send({ message: "Error al actualizar sitio" });
        }
    },

    // Elimina un registro de Sitio
    async eliminarSitio(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await sitioModel.eliminarSitio(id);
            if (rowCount == 1) {
                return res.status(200).send({ message: "Eliminado exitosamente" });
            } else {
                return res.status(400).send({ message: "Sitio no registrada" });
            }             
        } catch (err) {
            if (err.code == '23503') {
                res.status(400).send({ message: "Sitio a eliminar tiene relaciones con otros registros en la base de datos" });
            } else {
                return res.status(400).send({ message: "Error al eliminar sitio" });
            }         
        }
    }
}

