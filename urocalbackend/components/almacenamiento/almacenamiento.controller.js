// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores
const AlmacenamientoModel = require('./almacenamiento.model');


module.exports = {
    // Obtener todos los almacenaientos
    async getAlmacenamiento(req, res) {
        const almacenamiento = await AlmacenamientoModel.getAlmacenamiento()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(almacenamiento);  // <--
    },
    //  Obtener almacenamiento por contrato
    async getAlmacenamientos(req, res) {
        const { id } = req.params;
        const rows = await AlmacenamientoModel.getAlmacenamientos(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Almacenamiento no encontrado" });
    },
    // Elimina un almacenamiento
    async deleteAlmacenamiento(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await AlmacenamientoModel.deleteAlmacenamiento(id);
            return rowCount == 1 ? res.status(200).send({ message: "Eliminado exitosamente" }) : res.status(500).send({ message: "Almacenamiento no registrado" });
        } catch (err) {
            return res.status(200).send({ message: "Almacenamiento Eliminado parcialmente" });
        }
    },
    // Crear un nuevo almacenamiento
    async createAlmacenamiento(req, res) {
        // Añadir capa de validación

        const { almacenamientoid, almcontrato, almfechaacopio, almfechaingresobodega, almnumerobultos, almpesobulto,
            almpesototalingreso, almsaldo, almobservaciones, tratamientoid, centroacopioid } = req.body;

        try {
            let resultado = await AlmacenamientoModel.createAlmacenamiento({
                almcontrato: almcontrato,
                almfechaacopio: almfechaacopio,
                almfechaingresobodega: almfechaingresobodega,
                almnumerobultos: almnumerobultos,
                almpesobulto: almpesobulto,
                almpesototalingreso: almpesototalingreso,
                almsaldo: almsaldo,
                almobservaciones: almobservaciones,
                tratamientoid: tratamientoid,
                centroacopioid: centroacopioid
            });

            return res.status(201).send({ message: "Registro exitoso", almacenamientoid: resultado.almacenamientoid });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Registro fallido" });
        }


    },
    // Actualiza informacion de un almacenamiento
    async updateAlmacenamiento(req, res) {
        const { id } = req.params;
        const { almacenamientoid, almcontrato, almfechaacopio, almfechaingresobodega, almnumerobultos, almpesobulto,
            almpesototalingreso, almsaldo, almobservaciones, tratamientoid, centroacopioid } = req.body;
        try {
            const rowCount = await AlmacenamientoModel.updateAlmacenamiento(id, {
                almacenamientoid: almacenamientoid,
                almcontrato: almcontrato,
                almfechaacopio: almfechaacopio,
                almfechaingresobodega: almfechaingresobodega,
                almnumerobultos: almnumerobultos,
                almpesobulto: almpesobulto,
                almpesototalingreso: almpesototalingreso,
                almsaldo: almsaldo,
                almobservaciones: almobservaciones,
                tratamientoid: tratamientoid,
                centroacopioid: centroacopioid
            });
            return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });
        } catch (error) {
            return res.status(500).send({ message: "Registro fallido" });
        }

    },

}