
const podasModel = require('./podas.model');

module.exports = {
    async getPodas(req, res) {
        const podas = await podasModel.getPodas();
        return res.status(200).send(podas);
    },

    async getPoda(req, res) {
        const { id } = req.params;
        const rows = await podasModel.getPoda(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Poda no encontrada" });
    },

    async createPoda(req, res) {

        // Añadir capa de validación

        const { podfecha, podtipo, podhectareas, podcantidadplantas, podherramienta, podoperario, cultivoid } = req.body;

        try {
            await podasModel.createPoda({
                podfecha: podfecha,
                podtipo: podtipo,
                podhectareas: podhectareas,
                podcantidadplantas: podcantidadplantas,
                podherramienta: podherramienta,
                podoperario: podoperario,
                cultivoid: cultivoid
            });
        } catch (error) {
            return res.status(500).send({ message: "Registro fallido" });
        }

        return res.status(201).send({ message: "Registro exitoso" });
    },

    async updatePoda(req, res) {
        const { id } = req.params;
        const { podfecha, podtipo, podhectareas, podcantidadplantas, podherramienta, podoperario, cultivoid } = req.body;

        const rowCount = await podasModel.updatePoda(id, {
            podfecha: podfecha,
            podtipo: podtipo,
            podhectareas: podhectareas,
            podcantidadplantas: podcantidadplantas,
            podherramienta: podherramienta,
            podoperario: podoperario,
            cultivoid: cultivoid
        });
        
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });

    },

    async deletePoda(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await podasModel.deletePoda(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "Poda no registrada", tipo: "error" });
            
        } catch (err) {
            return res.json({ message: "Error al tratar de eliminar poda", tipo: "error" });
        }
    },
}