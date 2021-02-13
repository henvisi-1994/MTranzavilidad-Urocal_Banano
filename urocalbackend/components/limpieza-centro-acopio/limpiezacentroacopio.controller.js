const limpiezacaModel = require('./limpiezacentroacopio.model');
const validation = require('../../utils/validations');
const limpiezaCADto = require('./limpiezacentroacopio.dto');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {

    // Crear Nueva Limpieza del centro de acopio
    async createLimpiezaCA(req, res) {
        console.log(req.body);
        const { limcenfecha, limcenareas, limcenmateriales, limcenproductos, limcenmotivo, centroacopiolista } = req.body;

        // Valida que las variables no esten vacias
        if (validation.emptyField(limcenfecha) || validation.emptyField(limcenareas) || validation.emptyField(limcenmateriales) ||
            validation.emptyField(limcenproductos) || validation.emptyField(limcenmotivo)) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            try {
                await limpiezacaModel.createLimpiezaCA({
                    limcenfecha: limcenfecha,
                    limcenareas: limcenareas,
                    limcenmateriales: limcenmateriales,
                    limcenproductos: limcenproductos, 
                    limcenmotivo: limcenmotivo,
                    centroacopioid: centroacopiolista.centroacopioid,
                });
            } catch (error) {
                return res.status(500).send({ message: "Registro fallido" });
            }
            return res.status(201).send({ message: "Registro exitoso" });
        }
    },


    // SELECT: Devuelve todos los registros
    
    // Obtener todas las Limpiezas del centro de acopio
    async getLimpiezaCA(req, res) {
        const limpiezacentroacopio = await limpiezacaModel.getLimpiezaCA()
        //return res.status(200).send(userDto.multiple(users, req.user)); 
        //return res.status(200).send(limpiezacentroacopio); // 
        return res.status(200).send(limpiezaCADto.multipleLimpiezaCentroAcopio(limpiezacentroacopio)); 
    },


    //  Obtener una Limpieza del centro de acopio, por id
    async getIdLimpiezaCA(req, res) {
        const { id } = req.params;
        const rows = await limpiezacaModel.getIdLimpiezaCA(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Limpieza del centro de acopio no encontrado" });
    },

    // UPDATE: Actualiza un registro

    // Actualiza informacion de una Limpieza del centro de acopio
    async updateLimpiezaCA(req, res) {
        const { id } = req.params;
        const { limcenfecha, limcenareas, limcenmateriales, limcenproductos, limcenmotivo, centroacopiolista } = req.body;

        if (validation.emptyField(limcenfecha) || validation.emptyField(limcenareas) || validation.emptyField(limcenmateriales) ||
            validation.emptyField(limcenproductos) || validation.emptyField(limcenmotivo)) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            const rowCount = await limpiezacaModel.updateLimpiezaCA(id, {
                limcenfecha: limcenfecha,
                limcenareas: limcenareas,
                limcenmateriales: limcenmateriales,
                limcenproductos: limcenproductos, 
                limcenmotivo: limcenmotivo,
                centroacopioid: centroacopiolista.centroacopioid,
            });    
            return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });
        }
    },

    
    // DELETE: Elimina un registro
    
    // Elimina informacion de una Limpieza del centro de acopio
    async deleteLimpiezaCA(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await limpiezacaModel.deleteLimpiezaCA(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "Limpieza del centro de acopio no registrado", tipo: "error" });
            
        } catch (err) {
            return res.json({ message: "Error al tratar de eliminar la Limpieza del centro de acopio", tipo: "error" });
        }
    },
}
