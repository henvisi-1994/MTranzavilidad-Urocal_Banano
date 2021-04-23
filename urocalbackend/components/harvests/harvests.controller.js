// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores
//const userDto = require('./users.dto');

const nodemailer = require("nodemailer");
const harvestsModel = require('./harvests.model');
const config = require('config');


module.exports = {

    // Crear un nuevo cosecha
    async createHarvest(req, res) {

        // Añadir capa de validación
        //cosechaid, cosfecha, coscantidad, cosunidad, cospesototal, cosobservacion, coscodigo, tratamientoid, cultivoid)
        const { cosfecha, coscantidad, cosunidad, cospesototal, cosobservacion, coscodigo, cultivoid } = req.body;

        try {
            await harvestsModel.createHarvest({
                cosfecha: cosfecha,
                coscantidad: coscantidad,
                cosunidad: cosunidad,
                cospesototal: cospesototal,
                cosobservacion: cosobservacion,
                coscodigo: coscodigo,                
                cultivoid: cultivoid
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Registro fallido/ Codigo de Cosecha Repetido" });
        }

        return res.status(201).send({ message: "Registro exitoso" });
    },


    // Obtener todos las cosechas
    async getHarvests(req, res) {
        const harvests = await harvestsModel.getHarvests()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(harvests); // <--
    },

    // Obtener todos las cosechas que no estan en un detalleCompra
    async obtenerCosechasSinDetalleCompra(req, res) {
        const harvests = await harvestsModel.obtenerCosechasSinDetalleCompra()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(harvests); // <--
    },

    // Obtener todos las cosechas que estan en un detalleCompra
    async obtenerCosechasConDetalleCompra(req, res) {
        const harvests = await harvestsModel.obtenerCosechasConDetalleCompra()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(harvests); // <--
    },

    //  Obtener cosecha por id
    async getHarvest(req, res) {
        const { id } = req.params;
        const rows = await harvestsModel.getHarvest(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Cosecha no encontrada" });
    },

    // Actualiza informacion de una cosecha
    async updateHarvest(req, res) {
        const { id } = req.params;
        const { cosfecha, coscantidad, cosunidad, cospesototal, cosobservacion, coscodigo, cultivoid } = req.body;

        const rowCount = await harvestsModel.updateHarvest(id, {
            cosfecha: cosfecha,
            coscantidad: coscantidad,
            cosunidad: cosunidad,
            cospesototal: cospesototal,
            cosobservacion: cosobservacion,
            coscodigo: coscodigo,            
            cultivoid: cultivoid
        });

        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });

    },

    // Elimina una cosecha
    async deleteHarvest(req, res) {
        const { id } = req.params;
        
        try {
            let rowCount = await harvestsModel.deleteHarvest(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "Cosecha no registrado", tipo: "error" });

        } catch (err) {
            
            return res.json({ message: "Error al tratar de eliminar la cosecha", tipo: "error" });
        }
    }

}

