const limpiezaVModel = require('./limpiezaV.model');

module.exports = {
    async getLimpiezasV(req, res) {
        const limpiezasV = await limpiezaVModel.getLimpiezasV();
        return res.status(200).send(limpiezasV);
    },

    async getLimpiezaV(req, res) {
        const { id } = req.params;
        const rows = await limpiezaVModel.getLimpiezaV(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Limpieza de Vehiculo no encontrada" });
    },

    async createLimpiezaV(req, res) {

        // Añadir capa de validación

        const { limvehfecha, limvehproductoutilizado, limvehescobillon, limvehescoba, limvehagua, limvehaspiradora, vehiculoid } = req.body;

        try {
            await limpiezaVModel.createLimpiezaV({
                limvehfecha: limvehfecha,
                limvehproductoutilizado: limvehproductoutilizado,
                limvehescobillon: limvehescobillon,
                limvehescoba: limvehescoba,
                limvehagua: limvehagua,
                limvehaspiradora: limvehaspiradora,
                vehiculoid: vehiculoid,
            });
        } catch (error) {
            return res.status(500).send({ message: "Registro fallido" });
        }

        return res.status(201).send({ message: "Registro exitoso" });
    },

    async updateLimpiezaV(req, res) {
        const { id } = req.params;
        const { limvehfecha, limvehproductoutilizado, limvehescobillon, limvehescoba, limvehagua, limvehaspiradora, vehiculoid } = req.body;

        const rowCount = await limpiezaVModel.updateLimpiezaV(id, {
            limvehfecha: limvehfecha,
            limvehproductoutilizado: limvehproductoutilizado,
            limvehescobillon: limvehescobillon,
            limvehescoba: limvehescoba,
            limvehagua: limvehagua,
            limvehaspiradora: limvehaspiradora,
            vehiculoid: vehiculoid,
        });
        
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });

    },

    async deleteLimpiezaV(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await limpiezaVModel.deleteLimpiezaV(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "Eliminado exitosamente", tipo: "error" });
            
        } catch (err) {
            return res.json({ message: "Error al tratar de eliminar Limpieza de Vehiculo", tipo: "error" });
        }
    },
}