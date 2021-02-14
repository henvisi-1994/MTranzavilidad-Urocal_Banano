// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores
//const userDto = require('./users.dto');

const detalledespachoModel = require('./detalledespacho.model');
const validation = require('../../utils/validations');

module.exports = {

    // Crear Nuevo Detalle Despacho
    async createDetalleDespacho(req, res) {
        const { despachoid, almacenamientoid, detdesnumerobultos, detdespesounitario, detdespesototal } = req.body;
        
        // Valida que las variables no esten vacias
        if (validation.emptyField(despachoid) || validation.emptyField(almacenamientoid) || validation.emptyField(detdesnumerobultos) ||
            validation.emptyField(detdespesounitario) || validation.emptyField(detdespesototal)) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            try {
                await detalledespachoModel.createDetalleDespacho({
                    despachoid, almacenamientoid, detdesnumerobultos, detdespesounitario, detdespesototal
                })
                return res.status(201).send({ message: 'Detalle registrado' });
            } catch (error) {
                if (error.code == '23505') {
                    return res.status(400).send({ message: "Ya existe un detalle registrado en ese Despacho" });
                }
                if (error.code == '23503') {
                    return res.status(400).send({ message: "El Despacho seleccinado no existe" });
                }
                console.log(error);
                return res.status(500).send({ message: "Error al registrar detalle" });
            }
        }
    },


    // Obtener todos los Despachos
    async getDetalleDespacho(req, res) {
        const result = await detalledespachoModel.getDetalleDespacho()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(result); // <--
    },


    //  Obtener un Despacho por id
    async getIdDetalleDespacho(req, res) {
        const { id } = req.params;
        const result = await detalledespachoModel.getIdDetalleDespacho(id);
        return result === undefined ? res.status(200).send({}) : res.status(200).send(result);
        //return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Despacho no encontrado" });
    },


    //Obtener datos adicionales para mostrar en el select de Centro de acopio
    async getDatosAcopio(req, res) {
        const result = await detalledespachoModel.getDatosAcopio()
        return res.status(200).send(result); // <--
    },


    // Actualiza informacion de un Despacho
    async updateDetalleDespacho(req, res) {
        const { id } = req.params;
        const { despachoid, almacenamientoid, detdesnumerobultos, detdespesounitario, detdespesototal } = req.body;
        
        if (validation.emptyField(despachoid) || validation.emptyField(almacenamientoid) || validation.emptyField(detdesnumerobultos) ||
            validation.emptyField(detdespesounitario) || validation.emptyField(detdespesototal)) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {

            try {
                const rowCount = await detalledespachoModel.updateDetalleDespacho(id, {
                    despachoid, almacenamientoid, detdesnumerobultos, detdespesounitario, detdespesototal
                })

                return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(400).send({ message: "Registro no encontrado" });
            } catch (error) {
                return res.status(400).send({ message: "Error al actualizar" });
            }
        }
    },

    
    // Elimina informacion de un Despacho
    async deleteDetalleDespacho(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await detalledespachoModel.deleteDetalleDespacho(id);
            if (rowCount == 1) {
                return res.status(200).send({ message: "Detalle eliminado" });
            } else {
                return res.status(400).send({ message: "Detalle no registrado" });
            }
            
        } catch (err) {
            if (err.code == '23503') {
                res.status(400).send({ message: "El Detalle del despacho a eliminar tiene relaciones con otros registros en la base de datos" });
            } else {
                return res.status(400).send({ message: "Error al eliminar Detalle" });
            }
        }
    }
}
