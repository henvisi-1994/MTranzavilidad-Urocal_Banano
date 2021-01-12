
const riegosModel = require('./riegos.model');

module.exports = {
    async getRiegos(req, res) {
        const riegos = await riegosModel.getRiegos();
        return res.status(200).send(riegos);
    },

    async getRiego(req, res) {
        const { id } = req.params;
        const rows = await riegosModel.getRiego(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Riego no encontrado" });
    },

    async createRiego(req, res) {

        // Añadir capa de validación

        const { riesuperficie, riemodulos, riesemana, rieanio, riehorasregadas, rieporcentajeeficiencia, rievolumenutilizado, rieoperario, cultivoid } = req.body;

        try {
            await riegosModel.createRiego({
                riesuperficie: riesuperficie,
                riemodulos: riemodulos,
                riesemana: riesemana,
                rieanio: rieanio,
                riehorasregadas: riehorasregadas,
                rieporcentajeeficiencia: rieporcentajeeficiencia,
                rievolumenutilizado: rievolumenutilizado,
                rieoperario: rieoperario,
                cultivoid: cultivoid,
            });
        } catch (error) {
            return res.status(500).send({ message: "Registro fallido" });
        }

        return res.status(201).send({ message: "Registro exitoso" });
    },

    async updateRiego(req, res) {
        const { id } = req.params;
        const { riesuperficie, riemodulos, riesemana, rieanio, riehorasregadas, rieporcentajeeficiencia, rievolumenutilizado, rieoperario, cultivoid } = req.body;

        const rowCount = await riegosModel.updateRiego(id, {
            riesuperficie: riesuperficie,
            riemodulos: riemodulos,
            riesemana: riesemana,
            rieanio: rieanio,
            riehorasregadas: riehorasregadas,
            rieporcentajeeficiencia: rieporcentajeeficiencia,
            rievolumenutilizado: rievolumenutilizado,
            rieoperario: rieoperario,
            cultivoid: cultivoid,
        });
        
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });

    },

    async deleteRiego(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await riegosModel.deleteRiego(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "Riego no registrado", tipo: "error" });
            
        } catch (err) {
            return res.json({ message: "Error al tratar de eliminar riego", tipo: "error" });
        }
    },
}