const limpiezaVModel = require('./limpiezaV.model');
const limpiezaVeh = require('./limpiezaV.dto');

module.exports = {
    async getLimpiezasV(req, res) {
        const limpiezasV = await limpiezaVModel.getLimpiezasV();
        return res.status(200).send(limpiezaVeh.LimpiezaVe(limpiezasV)); //<--
    },

    async getLimpiezasVProductor(req, res) {
        const { id } = req.params;
        const limpiezasV = await limpiezaVModel.getLimpiezasVProductor(id);
        return res.status(200).send(limpiezaVeh.LimpiezaVe(limpiezasV)); //<--
    },

    async getLimpiezaV(req, res) {
        const { id } = req.params;
        const rows = await limpiezaVModel.getLimpiezaV(id);
        //return res.status(200).send(limpiezaVeh.LimpiezaVe(limpiezasV)); 
        return rows != null ? res.status(200).send(limpiezaVeh.LimpiezaVe(limpiezasV)): res.status(404).send({ message: "Limpieza de Vehiculo no encontrada" });
    },

    async createLimpiezaV(req, res) {

        // Añadir capa de validación

        const { limvehfecha, limvehproductoutilizado, limvehescobillon, limvehescoba, limvehagua, limvehaspiradora, vehiculoid,fincaid } = req.body;

        try {
            await limpiezaVModel.createLimpiezaV({
                limvehfecha: limvehfecha,
                limvehproductoutilizado: limvehproductoutilizado,
                limvehescobillon: limvehescobillon,
                limvehescoba: limvehescoba,
                limvehagua: limvehagua,
                limvehaspiradora: limvehaspiradora,
                vehiculoid: vehiculoid,
                fincaid:fincaid,
            });
        } catch (error) {
            return res.status(500).send({ message: "Registro fallido" });
        }

        return res.status(201).send({ message: "Registro exitoso" });
    },

    async updateLimpiezaV(req, res) {
        const { id } = req.params;
        const { limvehfecha, limvehproductoutilizado, limvehescobillon, limvehescoba, limvehagua, limvehaspiradora, vehiculoid,fincaid } = req.body;

        const rowCount = await limpiezaVModel.updateLimpiezaV(id, {
            limvehfecha: limvehfecha,
            limvehproductoutilizado: limvehproductoutilizado,
            limvehescobillon: limvehescobillon,
            limvehescoba: limvehescoba,
            limvehagua: limvehagua,
            limvehaspiradora: limvehaspiradora,
            vehiculoid: vehiculoid,
            fincaid:fincaid,
        });
        
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });

    },

    async deleteLimpiezaV(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await limpiezaVModel.deleteLimpiezaV(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "Eliminado exitosamente", tipo: "error" });
            
        } catch (err) {
            console.log(err);
            return res.json({ message: "Error al tratar de eliminar Limpieza de Vehiculo", tipo: "error" });
        }
    },
}