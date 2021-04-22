
const nuevoRegistroEnvioModel = require('./nuevoRegistroEnvio.model');

module.exports = {
    async getnuevoRegistroEnvios(req, res) {//obtener todos los registros
        const nuevoRegistroEnvios = await nuevoRegistroEnvioModel.getnuevoRegistroEnvios();
        return res.status(200).send(nuevoRegistroEnvios);
    },

    async getnuevoRegistroEnvio(req, res) {
        const { id } = req.params;
        const rows = await nuevoRegistroEnvioModel.getnuevoRegistroEnvio(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "nuevoRegistroEnvio no encontrada" });
    },
    async getDetalleEnvio(req, res) {
        const { id } = req.params;
        const rows = await nuevoRegistroEnvioModel.getDetalleEnvio(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "DetalleEnvio no encontrado" });
    },

    async createnuevoRegistroEnvio(req, res) {

        // Añadir capa de validación

        const { regfecha, reglote, regdestino, regtipo, regorganico, regspp, regdetalle } = req.body;

        try {
            await nuevoRegistroEnvioModel.createnuevoRegistroEnvio({
                regfecha: regfecha,
                reglote: reglote,
                regdestino: regdestino,
                regtipo: regtipo,
                regorganico: regorganico,
                regspp: regspp,
                regdetalle: regdetalle
            });
        } catch (error) {
            return res.status(500).send({ message: "Registro fallido" });
        }

        return res.status(201).send({ message: "Registro exitoso" });
    },

    async updatenuevoRegistroEnvio(req, res) {
        const { id } = req.params;
        const { regfecha, reglote, regdestino, regtipo, regorganico, regspp } = req.body;

        const rowCount = await nuevoRegistroEnvioModel.updatenuevoRegistroEnvio(id, {
            regfecha: regfecha,
            reglote: reglote,
            regdestino: regdestino,
            regtipo: regtipo,
            regorganico: regorganico,
            regspp: regspp
        });

        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });

    },

    async deletenuevoRegistroEnvio(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await nuevoRegistroEnvioModel.deletenuevoRegistroEnvio(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "Eliminado exitosamente", tipo: "error" });

        } catch (err) {
            return res.json({ message: "Error al tratar de eliminar RegistroEnvio", tipo: "error" });
        }
    },
    async getSeleccionDetalles(req, res) {
        const detalles = await nuevoRegistroEnvioModel.getSeleccionDetalles();
        return res.status(200).send(detalles);
    },
}