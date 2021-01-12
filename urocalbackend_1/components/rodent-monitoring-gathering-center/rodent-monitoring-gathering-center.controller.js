// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores

const rodentMonitoringGatheringCenterModel = require('./rodent-monitoring-gathering-center.model');


module.exports = {

    // Crear un nuevo registro monitoreo roedor centro acopio
    async createRodentMonitoringGatheringCenter(req, res) {

        // Añadir capa de validación

        const { monitoreoroedorid, centroacopioid } = req.body;

        try {
            await rodentMonitoringGatheringCenterModel.createRodentMonitoringGatheringCenter({
                monitoreoroedorid: monitoreoroedorid,
                centroacopioid: centroacopioid
            });
        } catch (error) {
            return res.status(500).send({ message: "Registro fallido" });
         }

        return res.status(201).send({ message: "Registro exitoso" });
    },

    // Obtener todos los registros de monitoreo roedor centro acopio
    async getRodentMonitoringGatheringCenters(req, res) {
        const rodentMonitoringGatheringCenter = await rodentMonitoringGatheringCenterModel.getRodentMonitoringGatheringCenters()
        return res.status(200).send(rodentMonitoringGatheringCenter); // <--
    },

    //  Obtener registro de monitoreo roedor centro acopio por id
    async getRodentMonitoringGatheringCenter(req, res) {
        const { id } = req.params;
        const rows = await rodentMonitoringGatheringCenterModel.getRodentMonitoringGatheringCenter(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Registro no encontrado" });
    },

    // Actualiza informacion de un registro de monitoreo roedor centro acopio
    async updateRodentMonitoringGatheringCenter(req, res) {
        const { id } = req.params;
        const { monitoreoroedorid, centroacopioid } = req.body;

        const rowCount = await rodentMonitoringGatheringCenterModel.updateRodentMonitoringGatheringCenter(id, {
                monitoreoroedorid: monitoreoroedorid,
                centroacopioid: centroacopioid
        });
        
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });

    },

    // Elimina un registro de monitoreo roedor centro acopio
    async deleteRodentMonitoringGatheringCenter(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await rodentMonitoringGatheringCenterModel.deleteRodentMonitoringGatheringCenter(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "No registrado", tipo: "error" });
            
        } catch (err) {
            return res.json({ message: "Error al tratar de eliminar registro", tipo: "error" });
        }
    }
}

