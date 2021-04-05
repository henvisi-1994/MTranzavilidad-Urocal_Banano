// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores

const nodemailer = require("nodemailer");
const compraModel = require('./compra.model');
module.exports = {
    // Obtener todos las compras
    async getCompra(req, res) {
        const compra = await compraModel.getCompra()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(compra);  // <--
    },
    //  Obtener compras por su id
    async getCompras(req, res) {
        const { id } = req.params;
        const rows = await compraModel.getCompras(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Compra no encontrado" });
    },
    // Elimina una compra
    async deleteCompra(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await compraModel.deleteCompra(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "Compra no registrado", tipo: "error" });

        } catch (err) {
            return res.json({ message: "Error al tratar de eliminar la compra", tipo: "error" });
        }
    },
    // Crear un nuevo revision humedad
    async createCompra(req, res) {
        // Añadir capa de validación
        const { compraid, comnumero, comfechaemision, comsubtotal, comdescuentos, comotrosvalores,
            comtotal, comobservaciones, guiaremisionid } = req.body;
        try {
            let result = await compraModel.createCompra({
                comnumero: comnumero,
                comfechaemision: comfechaemision,
                comsubtotal: comsubtotal,
                comdescuentos: comdescuentos,
                comotrosvalores: comotrosvalores,
                comtotal: comtotal,
                comobservaciones: comobservaciones,
                guiaremisionid: guiaremisionid
            });

            return res.status(201).send({ message: "Compra registrada", compraid: result.compraid });
            
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Registro fallido" });
        }
    },
    // Actualiza informacion de una revision humedad
    async updateCompra(req, res) {
        const { id } = req.params;
        const { compraid, comnumero, comfechaemision, comsubtotal, comdescuentos, comotrosvalores,
            comtotal, comobservaciones, guiaremisionid, productor, organizacion, cod, transporte, lugar } = req.body;
        try {
            const rowCount = await compraModel.updateCompra(id, {
                compraid: compraid,
                comnumero: comnumero,
                comfechaemision: comfechaemision,
                comsubtotal: comsubtotal,
                comdescuentos: comdescuentos,
                comotrosvalores: comotrosvalores,
                comtotal: comtotal,
                comobservaciones: comobservaciones,
                guiaremisionid: guiaremisionid,
                productor,
                organizacion,
                cod,
                transporte: transporte.vehplaca,
                lugar
            });
            return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Registro fallido" });
        }

    },

}