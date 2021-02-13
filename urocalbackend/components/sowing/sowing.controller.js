const sowingModel = require('./sowing.model');
const validation = require('../../utils/validations');


module.exports = {

    // Crear una nueva Siembra
    async createSowing(req, res) {
        console.log(req.body);
        // Añadir capa de validación
        const { siefechacomprasemilla, sieproveedorsemilla, siefechasiembra, siecantidadplantas, siehectareas, sieoperario, cultivoid } = req.body;
        if (validation.emptyField(siefechacomprasemilla) || validation.emptyField(sieproveedorsemilla) || validation.emptyField(siefechasiembra)
        || validation.emptyField(siecantidadplantas) || validation.emptyField(siehectareas) || validation.emptyField(sieoperario) || validation.emptyField(cultivoid)) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            try {
                await sowingModel.createSowing({
                    siefechacomprasemilla: siefechacomprasemilla, 
                    sieproveedorsemilla: sieproveedorsemilla, 
                    siefechasiembra: siefechasiembra, 
                    siecantidadplantas: siecantidadplantas, 
                    siehectareas: siehectareas, 
                    sieoperario: sieoperario, 
                    cultivoid: cultivoid
                });
            } catch (error) {
                return res.status(500).send({ message: "Registro fallido" });
            }
            return res.status(201).send({ message: "Registro exitoso" });
        }
    },


    // Obtener todas las Siembras
    async getSowings(req, res) {
        const sowings = await sowingModel.getSowings()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(sowings); // <--
    },

    //  Obtener una Siembra por id
    async getSowing(req, res) {
        const { id } = req.params;
        const rows = await sowingModel.getSowing(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Registro de Siembra no encontrado" });
    },

    //Obtener datos adicionales para mostrar en el select de Maleza
    async getDatosDetalleSowing(req, res) {
        const result = await sowingModel.getDatosDetalleSowing()
        return res.status(200).send(result); // <--
    },

    // Actualiza informacion de una Siembra
    async updateSowing(req, res) {
        const { id } = req.params;
        const { siefechacomprasemilla, sieproveedorsemilla, siefechasiembra, siecantidadplantas, siehectareas, sieoperario, cultivoid } = req.body;
        if (validation.emptyField(siefechacomprasemilla) || validation.emptyField(sieproveedorsemilla) || validation.emptyField(siefechasiembra)
        || validation.emptyField(siecantidadplantas) || validation.emptyField(siehectareas) || validation.emptyField(sieoperario) || validation.emptyField(cultivoid)) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            const rowCount = await sowingModel.updateSowing(id, {
                siefechacomprasemilla: siefechacomprasemilla, 
                sieproveedorsemilla: sieproveedorsemilla, 
                siefechasiembra: siefechasiembra, 
                siecantidadplantas: siecantidadplantas, 
                siehectareas: siehectareas, 
                sieoperario: sieoperario, 
                cultivoid: cultivoid
            });
            return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });
        }
    },


    // Elimina una Siembra
    async deleteSowing(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await sowingModel.deleteSowing(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "Siembra no registrada", tipo: "error" });
            
        } catch (err) {
            return res.json({ message: "Error al tratar de eliminar una Siembra", tipo: "error" });
        }
    },

}