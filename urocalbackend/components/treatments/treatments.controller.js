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
        const { traobservacion, traubicacion, trafecha, cultivoid, productorid, fincaid, detalle } = req.body;

        try {
            await treatmentsModel.createTreatment({
                traobservacion: traobservacion,
                traubicacion: traubicacion,
                trafecha: trafecha,
                cultivoid: cultivoid,
                productorid: productorid,
                fincaid: fincaid,
                detalle: detalle
                
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Registro fallido" });
         }

        return res.status(201).send({ message: "Registro exitoso" });
    },


    // Obtener todos los tratamientos
    async getTreatments(req, res) {
        const treatments = await treatmentsModel.getTreatments()
        return res.status(200).send(treatments); // <--
    },
       //  Obtener detalletratamiento por id
       async getDetalleTreatment(req, res) {
        const { id } = req.params;
        const rows = await treatmentsModel.getDetalleTreatment(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Tratamiento no encontrado" });
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
        const { traobservacion, traubicacion, trafecha, cultivoid, productorid, fincaid, detalle } = req.body;

        const rowCount = await treatmentsModel.updateTreatment(id, {
            traobservacion: traobservacion,
            traubicacion: traubicacion,
            trafecha: trafecha,
            cultivoid: cultivoid,
            productorid: productorid,
            fincaid: fincaid,
            detalle: detalle
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
    },
    async deleteDetalleTreatment(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await treatmentsModel.deleteDetalleTreatment(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "Tratamiento no registrado", tipo: "error" });
            
        } catch (err) {
            return res.json({ message: "Error al tratar de eliminar el tratamiento", tipo: "error" });
        }
    }

}

