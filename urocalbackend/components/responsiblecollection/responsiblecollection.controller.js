// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores
// collectioncenterDto = require('./collectioncenter.dao.js');
const responsiblecollectionModel = require('./responsiblecollection.model');
const config = require('config');
const validation = require('../../utils/validations');
const resacopioDto = require('./responsiblecollection.dto');
const { getResponsiblecollection, getResponsiblecollections, updateResponsiblecollection, deleteResponsiblecollection } = require('./responsiblecollection.dao');


module.exports = {

    // Crear un nuevo centro de acopio
    async createResponsiblecollection(req, res) {

        // Añadir capa de validación
        //  ResponsableAcopioId" Integer
        const { percedula, perapellidos, pernombres, perdireccion, pertelefono, perwhatsapp, peremail, pergenero, perfechanacimiento, ciudadnacimiento } = req.body;

        try {
            await responsiblecollectionModel.createResponsiblecollection({
                percedula: percedula,
                perapellidos: perapellidos,
                pernombres: pernombres,
                perdireccion: perdireccion,
                pertelefono: pertelefono,
                perwhatsapp: perwhatsapp,
                peremail: peremail,
                pergenero: pergenero,
                perfechanacimiento: validation.validarFecha(perfechanacimiento),
                ciudadnacimientoid: ciudadnacimiento.ciudadid,
            });
        } catch (error) {
            //console.log(error);
            return res.status(500).send({ message: "Registro fallido" });
         }

        return res.status(201).send({ message: "Registro exitoso" });
    },


    // Obtener todos los centros de acopio
    async getResponsiblecollections(req, res) {
        const responsiblecollections = await responsiblecollectionModel.getResponsiblecollections()
        return res.status(200).send(resacopioDto.multipleRespacopio(responsiblecollections)); //<--
        //return res.status(200).send(responsiblecollections); // <--
    },

    //  Obtener centro de acopio por id
    async getResponsiblecollection(req, res) {
        const { id } = req.params;
        const rows = await responsiblecollectionModel.getResponsiblecollection(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Responsable de acopio no encontrado" });
    },

    // Actualiza informacion de un usuario
    async updateResponsiblecollection(req, res) {
        const { id } = req.params;
        const { perapellidos, pernombres, pergenero, perfechanacimiento, perdireccion, pertelefono, perwhatsapp, peremail, ciudadnacimiento } = req.body;

        const rowCount = await responsiblecollectionModel.updateResponsiblecollection(id, {
            perapellidos: perapellidos,
            pernombres: pernombres,
            perdireccion: perdireccion,
            pertelefono: pertelefono,
            perwhatsapp: perwhatsapp,
            peremail: peremail,
            pergenero: pergenero,
            perfechanacimiento: validation.validarFecha(perfechanacimiento),
            ciudadnacimientoid: ciudadnacimiento.ciudadid,
        });
        
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });

    },
    // Elimina un centro de acopio
    async deleteResponsiblecollection(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await responsiblecollectionModel.deleteResponsiblecollection(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "Responsable de acopio no registrado", tipo: "error" });
            
        } catch (err) {
            return res.json({ message: "Error al tratar de eliminar un responsable de acopio", tipo: "error" });
        }
    },
}

