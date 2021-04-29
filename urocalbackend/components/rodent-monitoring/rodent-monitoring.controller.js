// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores

const rodentMonitoringModel = require('./rodent-monitoring.model');


module.exports = {

    // Crear un nuevo registro monitoreo roedor
    async createRodentMonitoring(req, res) {

        // Añadir capa de validación

        const { monfechatrampeo, montipotrampa, monnumerotrampas, monceboutilizado, monroedoresmuertos, monaccionestomadas, monoperario, moninspector } = req.body;

        try {
            await rodentMonitoringModel.createRodentMonitoring({
                monfechatrampeo: validarFecha(monfechatrampeo),
                montipotrampa: montipotrampa,
                monnumerotrampas: monnumerotrampas,
                monceboutilizado: monceboutilizado,
                monroedoresmuertos: monroedoresmuertos,
                monaccionestomadas: monaccionestomadas,
                monoperario: monoperario,
                moninspector: moninspector
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Registro fallido" });
         }

        return res.status(201).send({ message: "Registro exitoso" });
    },

    // Obtener todos los registros de monitoreo roedor
    async getRodentMonitorings(req, res) {
        const rodentMonitoring = await rodentMonitoringModel.getRodentMonitorings()
        return res.status(200).send(rodentMonitoring); // <--
    },

    //  Obtener registro de monitoreo roedor por id
    async getRodentMonitoring(req, res) {
        const { id } = req.params;
        const rows = await rodentMonitoringModel.getRodentMonitoring(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Registro no encontrado" });
    },

    // Actualiza informacion de un registro de monitoreo roedor
    async updateRodentMonitoring(req, res) {
        const { id } = req.params;
        const { monfechatrampeo, montipotrampa, monnumerotrampas, monceboutilizado, monroedoresmuertos, monaccionestomadas, monoperario, moninspector } = req.body;

        const rowCount = await rodentMonitoringModel.updateRodentMonitoring(id, {
            monfechatrampeo: validarFecha(monfechatrampeo),
            montipotrampa: montipotrampa,
            monnumerotrampas: monnumerotrampas,
            monceboutilizado: monceboutilizado,
            monroedoresmuertos: monroedoresmuertos,
            monaccionestomadas: monaccionestomadas,
            monoperario: monoperario,
            moninspector: moninspector
        });
        
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });

    },

    // Elimina un registro de monitoreo roedor
    async deleteRodentMonitoring(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await rodentMonitoringModel.deleteRodentMonitoring(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "No registrado", tipo: "error" });
            
        } catch (err) {
            return res.json({ message: "Error al tratar de eliminar registro", tipo: "error" });
        }
    }
}

function validarFecha(fecha) {     
    const [day, month, year] = fecha.split("/");
    return `${year}-${month}-${day}`;
}