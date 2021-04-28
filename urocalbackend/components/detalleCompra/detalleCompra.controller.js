// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores

const nodemailer = require("nodemailer");
const detalleCompraModel = require('./detalleCompra.model');


module.exports = {
    // Obtener todos los detalles de compra
    async getTodosDetalleCompra(req, res) {
        const detalleCompra = await detalleCompraModel.getTodosDetalleCompra()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(detalleCompra);  // <--
    },

    //  Obtener detalle de compra por su id de compra
    async getDetalleCompra(req, res) {
        const { id } = req.params;
        const rows = await detalleCompraModel.getDetalleCompra(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Detalle de compra no encontrado" });
    },

    //  Obtener datos detalleCompra por su detallecompraid
    async getDatosDetalleCompra(req, res) {
        const { id } = req.params;
        const rows = await detalleCompraModel.getDatosDetalleCompra(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Detalle de compra no encontrado" });
    },

    // Crear un nuevo detalle de compra
    async createDetalleCompra(req, res) {
        // Añadir capa de validación
        const { detallecompraid, detporcentajefermentacion, detporcentajehumedad, detporcentajeimpurezas,
            detmoho, detpizarra, detvioleta, detsemivioleta, detoptimio, detpenalidad, detestimulo, dettara,
            detestado, detunidad, detpreciounidad, detcantidadunidades, detpreciototal, compraid } = req.body;
        try {
            await detalleCompraModel.createDetalleCompra({
                detallecompraid: detallecompraid,
                detporcentajefermentacion: detporcentajefermentacion,
                detporcentajehumedad: detporcentajehumedad,
                detporcentajeimpurezas: detporcentajeimpurezas,
                detmoho: detmoho,
                detpizarra: detpizarra,
                detvioleta: detvioleta,
                detsemivioleta: detsemivioleta,
                detoptimio: detoptimio,
                detpenalidad: detpenalidad,
                detestimulo: detestimulo,
                dettara: dettara,
                detestado: detestado,
                detunidad: detunidad,
                detpreciounidad: detpreciounidad,
                detcantidadunidades: detcantidadunidades,
                detpreciototal: detpreciototal,
                compraid: compraid
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Registro fallido" });
        }

        return res.status(201).send({ message: "Registro exitoso" });
    },



    // Actualiza informacion de un detalle de compra
    async updateDetalleCompra(req, res) {
        const { id } = req.params;
        const { detallecompraid, detporcentajefermentacion, detporcentajehumedad, detporcentajeimpurezas,
            detmoho, detpizarra, detvioleta, detsemivioleta, detoptimio, detpenalidad, detestimulo, dettara,
            detestado, detunidad, detpreciounidad, detcantidadunidades, detpreciototal, compraid } = req.body;
        try {
            const rowCount = await detalleCompraModel.updateDetalleCompra(id, {
                detallecompraid: detallecompraid,
                detporcentajefermentacion: detporcentajefermentacion,
                detporcentajehumedad: detporcentajehumedad,
                detporcentajeimpurezas: detporcentajeimpurezas,
                detmoho: detmoho,
                detpizarra: detpizarra,
                detvioleta: detvioleta,
                detsemivioleta: detsemivioleta,
                detoptimio: detoptimio,
                detpenalidad: detpenalidad,
                detestimulo: detestimulo,
                dettara: dettara,
                detestado: detestado,
                detunidad: detunidad,
                detpreciounidad: detpreciounidad,
                detcantidadunidades: detcantidadunidades,
                detpreciototal: detpreciototal,
                compraid: compraid
            });
            return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });
        } catch (error) {
            return res.status(500).send({ message: "Registro fallido" });
        }

    },
    async deleteDetalleCompra(req, res) {
        try {
        const { id } = req.params;
        const rowCount = await detalleCompraModel.deleteDetalleCompra(id);
        return rowCount == 1 ? res.status(200).send({ message: "Eliminado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });
        }catch(error){
            return res.status(500).send({ message: "Eliminacion fallido" });
        }
    }

}