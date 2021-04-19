// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores

const rodentMonitoringGatheringCenterModel = require('./rodent-monitoring-gathering-center.model');
const rodentMonitoringGatheringCenterDto = require('./rodent-monitoring-gathering-center.dto');
const validation = require('../../utils/validations');

module.exports = {

    // Crear un nuevo registro monitoreo roedor centro acopio
    async createRodentMonitoringGatheringCenter(req, res) {

        // Añadir capa de validación

        const { monfechatrampeo, montipotrampa, monnumerotrampas, monceboutilizado, monroedoresmuertos, monaccionestomadas, monoperario, moninspector, centroacopioid } = req.body;
        if(validation.emptyField(monfechatrampeo) ||validation.emptyField(montipotrampa) ||validation.emptyField(monnumerotrampas) ||validation.emptyField(monceboutilizado) ||validation.emptyField(monroedoresmuertos) || 
            validation.emptyField(monaccionestomadas) ||validation.emptyField(monoperario) ||validation.emptyField(moninspector) ||validation.emptyField(centroacopioid)){
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        }else{
            try {
                let result = await rodentMonitoringGatheringCenterModel.createRodentMonitoringGatheringCenter({
                    monfechatrampeo: monfechatrampeo,
                    montipotrampa: montipotrampa,
                    monnumerotrampas: monnumerotrampas,
                    monceboutilizado: monceboutilizado,
                    monroedoresmuertos: monroedoresmuertos,
                    monaccionestomadas: monaccionestomadas,
                    monoperario: monoperario,
                    moninspector: moninspector,
                    centroacopioid: centroacopioid});
                return res.status(201).send({ message: 'Monitoreo roedor registrado', monitoreoroedorid: result.monitoreoroedorid });
            } catch (error) {
                console.log(error)
                return res.status(500).send({ message: "Registro fallido" });
            }
        }
    },

    // Obtener todos los registros de monitoreo roedor centro acopio
    async getRodentMonitoringGatheringCenters(req, res) {
        const rodentMonitoringGatheringCenter = await rodentMonitoringGatheringCenterModel.getRodentMonitoringGatheringCenters()
        return res.status(200).send(rodentMonitoringGatheringCenterDto.multipleMonitoreoRoedor(rodentMonitoringGatheringCenter)); //<--
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
        const { monfechatrampeo, montipotrampa, monnumerotrampas, monceboutilizado, monroedoresmuertos, monaccionestomadas, monoperario, moninspector, monitoreoroedor } = req.body;

        if(validation.emptyField(monfechatrampeo) ||validation.emptyField(montipotrampa) ||validation.emptyField(monnumerotrampas) ||validation.emptyField(monceboutilizado) ||validation.emptyField(monroedoresmuertos) || 
            validation.emptyField(monaccionestomadas) ||validation.emptyField(monoperario) ||validation.emptyField(moninspector) ||validation.emptyField(monitoreoroedor.centroacopioid)){
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        }else{
            const rowCount = await rodentMonitoringGatheringCenterModel.updateRodentMonitoringGatheringCenter(id, {
                monfechatrampeo: monfechatrampeo,
                montipotrampa: montipotrampa,
                monnumerotrampas: monnumerotrampas,
                monceboutilizado: monceboutilizado,
                monroedoresmuertos: monroedoresmuertos,
                monaccionestomadas: monaccionestomadas,
                monoperario: monoperario,
                moninspector: moninspector,
                centroacopioid: monitoreoroedor.centroacopioid})
            return rowCount == 1 ? res.status(200).send({ message: "Monitoreo roedor actualizado" }) : res.status(400).send({ message: "Error al actualizar monitoreo roedor" });
        }
    },

    // Elimina un registro de monitoreo roedor centro acopio
    async deleteRodentMonitoringGatheringCenter(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await rodentMonitoringGatheringCenterModel.deleteRodentMonitoringGatheringCenter(id);
            if (rowCount == 1) {
                return res.status(400).send({ message: "Eliminado exitosamente" });
            } else {
                return res.status(400).send({ message: "Monitoreo roedor no registrado" });
            }               
        } catch (err) {
            if (err.code == '23503') {
                res.status(400).send({ message: "Monitoreo roedor  a eliminar tiene relaciones con otros registros en la base de datos" });
            } else {
                return res.status(400).send({ message: "Error al eliminar Monitoreo roedor" });
            }
        }
    }
}

