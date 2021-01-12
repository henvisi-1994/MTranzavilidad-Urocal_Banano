// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores

const rodentFarmMonitoringModel = require('./rodent-farm-monitoring.model');


module.exports = {

    // Crear un nuevo registro monitoreo roedor finca
    async createRodentFarmMonitoring(req, res) {

        // Añadir capa de validación

        const { monitoreoroedorid, fincaid } = req.body;

        try {
            await rodentFarmMonitoringModel.createRodentFarmMonitoring({
                monitoreoroedorid: monitoreoroedorid,
                fincaid: fincaid
            });
        } catch (error) {
            return res.status(500).send({ message: "Registro fallido" });
         }

        return res.status(201).send({ message: "Registro exitoso" });
    },

    // Obtener todos los registros de monitoreo roedor finca
    async getRodentFarmMonitorings(req, res) {
        const rodentFarmMonitoring = await rodentFarmMonitoringModel.getRodentFarmMonitorings()
        return res.status(200).send(rodentFarmMonitoring); // <--
    },

    //  Obtener registro de monitoreo roedor finca por id
    async getRodentFarmMonitoring(req, res) {
        const { id } = req.params;
        const rows = await rodentFarmMonitoringModel.getRodentFarmMonitoring(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Registro no encontrado" });
    },

    // Actualiza informacion de un registro de monitoreo roedor finca
    async updateRodentFarmMonitoring(req, res) {
        const { id } = req.params;
        const { monitoreoroedorid, fincaid } = req.body;

        const rowCount = await rodentFarmMonitoringModel.updateRodentFarmMonitoring(id, {
            monitoreoroedorid: monitoreoroedorid,
            fincaid: fincaid
        });
        
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });

    },

    // Elimina un registro de monitoreo roedor finca
    async deleteRodentFarmMonitoring(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await rodentFarmMonitoringModel.deleteRodentFarmMonitoring(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "No registrado", tipo: "error" });
            
        } catch (err) {
            return res.json({ message: "Error al tratar de eliminar registro", tipo: "error" });
        }
    }
}

