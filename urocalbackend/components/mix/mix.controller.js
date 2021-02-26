// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores

const nodemailer = require("nodemailer");
const mixModel = require('./mix.model');


module.exports = {
    // Obtener todos los mix
    async getMix(req, res) {
        const mix = await mixModel.getMix()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(mix);  // <--
    },
    //  Obtener mix por su id
    async getMixs(req, res) {
        const { id } = req.params;
        const rows = await mixModel.getMixs(id);
        return rows != null ? res.status(200).send(rows) : res.status(200).send([]);
    },

    // Elimina una mix
    async deleteMix(req, res) {
        const { id } = req.params;
        try {
            let rowCount = await mixModel.deleteMix(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "Mix no registrado", tipo: "error" });

        } catch (err) {
            console.log(err);
            return res.json({ message: "Error al tratar de eliminar el mix", tipo: "error" });
        }
    },

    // Crear un nuevo mix
    async createMix(req, res) {
        // Añadir capa de validación

        const { almacenamientoid, cosechaid } = req.body;
        try {
            await mixModel.createMix({
                almacenamientoid,
                cosechaid
            });

            return res.status(201).send({ message: "Registro exitoso" });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Registro fallido" });
        }
    },

    // Actualiza informacion de un mix
    async updateMix(req, res) {
        const { id } = req.params;
        const { mixid, almacenamientoid, cosechaid } = req.body;
        try {
            const rowCount = await mixModel.updateMix(id, {
                mixid: mixid,
                almacenamientoid: almacenamientoid,
                cosechaid: cosechaid
            });
            return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });
        } catch (error) {
            return res.status(500).send({ message: "Registro fallido" });
        }

    },

}