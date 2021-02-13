// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores
//const userDto = require('./users.dto');

const nodemailer = require("nodemailer");
const treatmentsModel = require('./treatments.model');
const config = require('config');


module.exports = {

    // Crear un nuevo tratamiento
    async createTreatment(req, res) {

        // Añadir capa de validación

        const { traFechaInicioFermentacion, traFechaFinFermentacion, traTipoSecado, traFechaInicioSecado, traFechaFinSecado, traVolumenSeco, traConversion, traObservacion, traOperario } = req.body;

        try {
            await treatmentsModel.createTreatment({
                traFechaInicioFermentacion: traFechaInicioFermentacion,
                traFechaFinFermentacion: traFechaFinFermentacion,
                traTipoSecado: traTipoSecado,
                traFechaInicioSecado: traFechaInicioSecado,
                traFechaFinSecado: traFechaFinSecado,
                traVolumenSeco: traVolumenSeco,
                traConversion: traConversion,
                traObservacion: traObservacion,
                traOperario: traOperario
                
            });
        } catch (error) {
            return res.status(500).send({ message: "Registro fallido" });
         }

        return res.status(201).send({ message: "Registro exitoso" });
    },


    // Obtener todos los tratamientos
    async getTreatments(req, res) {
        const treatments = await treatmentsModel.getTreatments()
        return res.status(200).send(treatments); // <--
    },

    //  Obtener tratamiento por id
    async getTreatment(req, res) {
        const { id } = req.params;
        const rows = await treatmentsModel.getTreatment(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Tratamiento no encontrado" });
    },

    // Actualiza informacion de un tratamiento
    async updateTreatment(req, res) {
        const { id } = req.params;
        const { traFechaInicioFermentacion, traFechaFinFermentacion, traTipoSecado, traFechaInicioSecado, traFechaFinSecado, traVolumenSeco, traConversion, traObservacion, traOperario } = req.body;

        const rowCount = await treatmentsModel.updateTreatment(id, {
            traFechaInicioFermentacion: traFechaInicioFermentacion,
            traFechaFinFermentacion: traFechaFinFermentacion,
            traTipoSecado: traTipoSecado,
            traFechaInicioSecado: traFechaInicioSecado,
            traFechaFinSecado: traFechaFinSecado,
            traVolumenSeco: traVolumenSeco,
            traConversion: traConversion,
            traObservacion: traObservacion,
            traOperario: traOperario
        });
        
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });

    },

        // Elimina un tratamiento
    async deleteTreatment(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await treatmentsModel.deleteTreatment(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "Tratamiento no registrado", tipo: "error" });
            
        } catch (err) {
            return res.json({ message: "Error al tratar de eliminar el tratamiento", tipo: "error" });
        }
    }

}

