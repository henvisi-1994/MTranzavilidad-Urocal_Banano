// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores

const ciudadModel = require('./ciudad.model');
const ciudadDto = require('./ciudad.dto');
const validation = require('../../utils/validations');

module.exports = {

    // Crear un nuevo registro Ciudad
    async crearCiudad(req, res) {

        // Añadir capa de validación

        const { ciudadnombre, ciudadprovincia } = req.body;
        if(validation.emptyField(ciudadnombre) || validation.emptyField(ciudadprovincia.provinciaid)){
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        }else{
            try {
                let result = await ciudadModel.crearCiudad({
                    ciudadnombre: ciudadnombre,
                    provinciaid: ciudadprovincia.provinciaid});
                return res.status(201).send({ message: 'Ciudad registrada', ciudadid: result.ciudadid });
            } catch (error) {
                return res.status(500).send({ message: "Registro fallido" });
            }
        }
    },

    // Obtener todos los registros de Ciudades
    async obtenerCiudades(req, res) {
        const ciudad = await ciudadModel.obtenerCiudades()
        return res.status(200).send(ciudadDto.multipleCiudad(ciudad)); //<--
    },

    //  Obtener registro de Ciudad por id
    async obtenerCiudad(req, res) {
        const { id } = req.params;
        const rows = await ciudadModel.obtenerCiudad(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Registro no encontrado" });
    },

    // Actualiza informacion de un registro de Ciudad
    async actualizarCiudad(req, res) {
        const { id } = req.params;
        const { ciudadnombre, ciudadprovincia } = req.body;
        if(validation.emptyField(ciudadnombre) || validation.emptyField(ciudadprovincia.provinciaid)){
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        }else{
            const rowCount = await ciudadModel.actualizarCiudad(id, {
                ciudadnombre: ciudadnombre,
                provinciaid: ciudadprovincia.provinciaid});
            return rowCount == 1 ? res.status(200).send({ message: "Ciudad actualizada" }) : res.status(400).send({ message: "Error al actualizar ciudad" });
        }
    },

    // Elimina un registro de Ciudad
    async eliminarCiudad(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await ciudadModel.eliminarCiudad(id);
            if (rowCount == 1) {
                return res.status(200).send({ message: "Eliminado exitosamente" });
            } else {
                return res.status(400).send({ message: "Ciudad no registrada" });
            }              
        } catch (err) {
            if (err.code == '23503') {
                res.status(400).send({ message: "Ciudad a eliminar tiene relaciones con otros registros en la base de datos" });
            } else {
                return res.status(400).send({ message: "Error al eliminar ciudad" });
            } 
        }
    }
}

