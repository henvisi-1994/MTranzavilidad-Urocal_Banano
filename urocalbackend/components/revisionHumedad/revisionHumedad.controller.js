// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores

const nodemailer = require("nodemailer");
const revisionHumedadModel = require('./revisionHumedad.model');


module.exports = {
    // Obtener todos los revision humedad
    async getRevisionHumedadByAlmacenamientoID(req, res) {
        const { id } = req.params;
        const revisionHumedad = await revisionHumedadModel.getRevisionHumedadByAlmacenamientoID(id)
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(revisionHumedad);
    },
    //  Obtener revision humedad por su id
    async getRevisionHumedads(req, res) {
        const { id } = req.params;
        const rows = await revisionHumedadModel.getRevisionHumedads(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Revisión de Humedad no encontrado" });
    },
    // Elimina una revision humedad
    async deleteRevisionHumedad(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await revisionHumedadModel.deleteRevisionHumedad(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "Revisión Humedad no registrado", tipo: "error" });

        } catch (err) {
            return res.json({ message: "Error al tratar de eliminar la Revisión Humedad", tipo: "error" });
        }
    },
    // Crear un nuevo revision humedad
    async createRevisionHumedad(req, res) {
        // Añadir capa de validación

        const { revisionhumedadid, revporcentajehumedad, revfechaingresosecadora, revhoraingresosecadora,
            revfechasalidasecadora, revhorasalidasecadora, almacenamientoid } = req.body;
        try {
            await revisionHumedadModel.createRevisionHumedad({
                revisionhumedadid: revisionhumedadid,
                revporcentajehumedad: revporcentajehumedad,
                revfechaingresosecadora: revfechaingresosecadora,
                revhoraingresosecadora: revhoraingresosecadora,
                revfechasalidasecadora: revfechasalidasecadora,
                revhorasalidasecadora: revhorasalidasecadora,
                almacenamientoid: almacenamientoid,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Registro fallido" });
        }

        return res.status(201).send({ message: "Registro exitoso" });
    },
    // Actualiza informacion de una revision humedad
    async updateRevisionHumedad(req, res) {
        const { id } = req.params;
        const { revisionhumedadid, revporcentajehumedad, revfechaingresosecadora, revhoraingresosecadora,
            revfechasalidasecadora, revhorasalidasecadora, almacenamientoid } = req.body;
        try {
            const rowCount = await revisionHumedadModel.updateRevisionHumedad(id, {
                revisionhumedadid: revisionhumedadid,
                revporcentajehumedad: revporcentajehumedad,
                revfechaingresosecadora: revfechaingresosecadora,
                revhoraingresosecadora: revhoraingresosecadora,
                revfechasalidasecadora: revfechasalidasecadora,
                revhorasalidasecadora: revhorasalidasecadora,
                almacenamientoid: almacenamientoid,
            });
            return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });
        } catch (error) {
            return res.status(500).send({ message: "Registro fallido" });
        }

    },

}