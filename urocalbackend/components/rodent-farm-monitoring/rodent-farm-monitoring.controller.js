// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores

const rodentFarmMonitoringModel = require('./rodent-farm-monitoring.model');
const rodentFarmMonitoringDto = require('./rodent-farm-monitoring.dto');
const validation = require('../../utils/validations');

module.exports = {

    // Crear un nuevo registro monitoreo roedor finca
    async createRodentFarmMonitoring(req, res) {

        // Añadir capa de validación

        const { monfechatrampeo, montipotrampa, monnumerotrampas, monceboutilizado, monroedoresmuertos, monaccionestomadas, monoperario, moninspector, fincaid } = req.body;

        if(validation.emptyField(monfechatrampeo) || validation.emptyField(montipotrampa) || validation.emptyField(monnumerotrampas) || validation.emptyField(monceboutilizado) || validation.emptyField(monroedoresmuertos) || 
            validation.emptyField(monaccionestomadas) || validation.emptyField(monoperario) || validation.emptyField(moninspector) || validation.emptyField(fincaid)){
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        }else{
            try {
                let result =  await rodentFarmMonitoringModel.createRodentFarmMonitoring({
                    monfechatrampeo: monfechatrampeo,
                    montipotrampa: montipotrampa,
                    monnumerotrampas: monnumerotrampas,
                    monceboutilizado: monceboutilizado,
                    monroedoresmuertos: monroedoresmuertos,
                    monaccionestomadas: monaccionestomadas,
                    monoperario: monoperario,
                    moninspector: moninspector,
                    fincaid: fincaid})
                return res.status(201).send({ message: 'Monitoreo roedor registrado', monitoreoroedorid: result.monitoreoroedorid });
            } catch (error) {
                return res.status(500).send({ message: "Error al registrar monitoreo roedor" });
            }
        }
    },

    // Obtener todos los registros de monitoreo roedor finca
    async getRodentFarmMonitorings(req, res) {
        const rodentFarmMonitoring = await rodentFarmMonitoringModel.getRodentFarmMonitorings()
        return res.status(200).send(rodentFarmMonitoringDto.multipleMonitoreoRoedor(rodentFarmMonitoring)); //<--
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
        const { monfechatrampeo, montipotrampa, monnumerotrampas, monceboutilizado, monroedoresmuertos, monaccionestomadas, monoperario, moninspector, monitoreoroedor } = req.body;
        
        if(validation.emptyField(monfechatrampeo) ||validation.emptyField(montipotrampa) ||validation.emptyField(monnumerotrampas) ||validation.emptyField(monceboutilizado) ||validation.emptyField(monroedoresmuertos) || 
            validation.emptyField(monaccionestomadas) ||validation.emptyField(monoperario) ||validation.emptyField(moninspector) ||validation.emptyField(monitoreoroedor.fincaid)){
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        }else{
            const rowCount = await rodentFarmMonitoringModel.updateRodentFarmMonitoring(id, {
                monfechatrampeo: monfechatrampeo,
                montipotrampa: montipotrampa,
                monnumerotrampas: monnumerotrampas,
                monceboutilizado: monceboutilizado,
                monroedoresmuertos: monroedoresmuertos,
                monaccionestomadas: monaccionestomadas,
                monoperario: monoperario,
                moninspector: moninspector,
                fincaid: monitoreoroedor.fincaid});
            return rowCount == 1 ? res.status(200).send({ message: "Monitoreo roedor actualizado" }) : res.status(400).send({ message: "Error al actualizar monitoreo roedor" });
        }
    },

    // Elimina un registro de monitoreo roedor finca
    async deleteRodentFarmMonitoring(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await rodentFarmMonitoringModel.deleteRodentFarmMonitoring(id);
            if (rowCount == 1) {
                return res.status(200).send({ message: "Eliminado exitosamente" });
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

