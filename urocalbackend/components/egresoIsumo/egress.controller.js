// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores
//const userDto = require('./users.dto');

const egressModel = require('./egress.model');
const validation = require('../../utils/validations');

module.exports = {
    // Agrega un nuevo egresso
    async createegress(req, res) {

        const params = req.body
        const { egrinsfechaegreso, egrinsparacontrolar, egrinsdosis,egrinscantidadentregada,egrencargado,ingresoinsumosid,fincaid } = req.body;

        // Valida que las variables no esten vacias

        console.log("Estos son los parametros", params)
        if (validation.emptyField(egrinsfechaegreso) || validation.emptyField(egrinsparacontrolar)
        || validation.emptyField(egrinsdosis) || validation.emptyField(egrinscantidadentregada) || validation.emptyField(egrencargado) 
        || validation.emptyField(ingresoinsumosid) || validation.emptyField(fincaid) ) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            try {
                await egressModel.createegress({ 
                    egrinsfechaegreso: egrinsfechaegreso, 
                    egrinsparacontrolar: egrinsparacontrolar, 
                    egrinsdosis: egrinsdosis,
                    egrinscantidadentregada: egrinscantidadentregada,
                    egrencargado: egrencargado,
                    ingresoinsumosid: ingresoinsumosid, 
                    fincaid: fincaid, 
                })

                return res.status(201).send({ message: 'Egreso registrado' });
            } catch (error) {
                console.log(error);
                if (error.code == '23505') {
                    res.status(400).send({ message: "Ya existe un egresso con el código que ha ingresado" });
                } else {
                    console.log("error en el catch: ", error)
                    return res.status(500).send({ message: "Error al registrar Egreso" });
                }
            }
        }
    },

    // Obtener todos los egressos
    async getAllegresss(req, res) {
        const result = await egressModel.getAllegresss()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(result); // <--
    },

    // Obtener un egresso por ID
    async getegress(req, res) {
        const { id } = req.params;
        const egress = await egressModel.getegress(id);
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return egress === undefined ? res.status(200).send({}) : res.status(200).send(egress);
    },

    // Actualiza un egresso
    async updateegress(req, res) {
        const { id } = req.params;
        const { egresoinsumosid, egrinsfechaegreso, egrinsparacontrolar, egrinsdosis,egrinscantidadentregada,egrencargado,ingresoinsumosid, fincaid } = req.body;

        if (validation.emptyField(egresoinsumosid) || validation.emptyField(egrinsfechaegreso) || validation.emptyField(egrinsparacontrolar)
        || validation.emptyField(egrinsdosis) || validation.emptyField(egrinscantidadentregada) || validation.emptyField(egrencargado) 
        || validation.emptyField(ingresoinsumosid) || validation.emptyField(fincaid)) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            try {
                const rowCount = await egressModel.updateegress(id, { egresoinsumosid, egrinsfechaegreso, egrinsparacontrolar, egrinsdosis,egrinscantidadentregada,egrencargado,ingresoinsumosid, fincaid })

                return rowCount == 1 ? res.status(200).send({ message: "Egreso actualizado" }) : res.status(400).send({ message: "Egreso no registrado" });
            } catch (error) {
                if (error.code == '23505') {
                    return res.status(400).send({ message: "Ya existe un Egreso con el código que ha ingresado" });
                }
                console.log("Esto contiene error ..", error)
                return res.status(400).send({ message: "Error al actualizar Egreso" });
            }
        }
    },

    // Elimina un egresso
    async deleteegress(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await egressModel.deleteegress(id);
            if (rowCount == 1) {
                return res.status(200).send({ message: "Egreso eliminado" });
            } else {
                return res.status(400).send({ message: "Egreso no registrado" });
            }

        } catch (err) {
            if (err.code == '23503') {
                res.status(400).send({ message: "El Egreso a eliminar tiene relaciones con otros registros en la base de datos" });
            } else {
                console.log("Esto contiene err ...", err)
                return res.status(400).send({ message: "Error al eliminar Egreso" });
            }
        }
    }
}