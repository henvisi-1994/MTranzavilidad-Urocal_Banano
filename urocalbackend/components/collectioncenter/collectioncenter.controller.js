// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores
// collectioncenterDto = require('./collectioncenter.dao.js');
const collectioncenterModel = require('./collectioncenter.model');
const config = require('config');
const { getCollectioncenter } = require('./collectioncenter.dao');


module.exports = {

    // Crear un nuevo centro de acopio
    async createCollectioncenter(req, res) {

        // Añadir capa de validación
 //  "CentroAcopioId" Integer,  "CentroAcopioNombre" Text,  "ResponsableAcopioId" Integer
        const { centroacopioid, centroacopionombre, responsableacopioid } = req.body;

        try {
            await collectioncenterModel.createCollectioncenter({
                centroacopioid: centroacopioid,
                centroacopionombre: centroacopionombre,
                responsableacopioid: responsableacopioid
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Registro fallido" });
         }

        return res.status(201).send({ message: "Registro exitoso" });
    },


    // Obtener todos los centros de acopio
    async getCollectioncenters(req, res) {
        const collectioncenters = await collectioncenterModel.getCollectioncenters()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(collectioncenters); // <--
    },

    //  Obtener centro de acopio por id
    async getCollectioncenter(req, res) {
        const { id } = req.params;
        const rows = await collectioncenterModel.getCollectioncenter(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Centro de acopio no encontrado" });
    },

    // Actualiza informacion de un usuario
    async updateCollectioncenter(req, res) {
        const { id } = req.params;
        const { centroacopionombre, responsableacopioid} = req.body;

        const rowCount = await collectioncenterModel.updateUser(id, {
            centroacopionombre: centroacopionombre,
            responsableacopioid: responsableacopioid
        });
        
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });

    },
    // Elimina un centro de acopio
    async deleteCollectioncenter(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await collectioncenterModel.deleteCollectioncenter(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "Centro de acopio no registrado", 
            tipo: "error" });
            
        } catch (err) {
            return res.json({ message: "Error al tratar de eliminar un centro de acopio", tipo: "error" });
        }
    },
}

