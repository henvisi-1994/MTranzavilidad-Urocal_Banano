// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores
//const userDto = require('./users.dto');

const environmentModel = require('./environment.model');
const validation = require('../../utils/validations');

module.exports = {
    // Agrega un nuevo medio ambiente
    async createEnvironment(req, res) {
        const { medtemperaturapromedio, medaltitud, medtopografia, medhumedadrelativa, medpluviosidad, medotros, medtomamuestra, lotecultivadoid } = req.body;

        // Valida que las variables no esten vacias
        if (validation.emptyField(medtemperaturapromedio) || validation.emptyField(medaltitud) || validation.emptyField(medtopografia) ||
            validation.emptyField(medhumedadrelativa) || validation.emptyField(medpluviosidad) || validation.emptyField(medotros) ||
            validation.emptyField(medtomamuestra) || validation.emptyField(lotecultivadoid)) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            try {
                await environmentModel.createEnvironment({
                    medtemperaturapromedio, medaltitud, medtopografia, medhumedadrelativa, medpluviosidad, medotros, medtomamuestra, lotecultivadoid
                })

                return res.status(201).send({ message: 'Medio ambiente registrado' });
            } catch (error) {
                if (error.code == '23505') {
                    return res.status(400).send({ message: "Ya existe un medio ambiente registrado con ese lote" });
                }
                if (error.code == '23503') {
                    return res.status(400).send({ message: "El lote seleccinado no existe" });
                }
                console.log(error);
                return res.status(500).send({ message: "Error al registrar medio ambiente" });
            }
        }
    },

    // Obtener todos los medio ambientes
    async getAllEnvironment(req, res) {
        const result = await environmentModel.getAllEnvironment()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(result); // <--
    },

    // Obtener un medio ambiente por ID
    async getEnvironment(req, res) {
        const { id } = req.params;
        const result = await environmentModel.getEnvironment(id);
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return result === undefined ? res.status(200).send({}) : res.status(200).send(result);
    },

    // Actualiza un medio ambiente
    async updateEnvironment(req, res) {
        const { id } = req.params;
        const { medtemperaturapromedio, medaltitud, medtopografia, medhumedadrelativa, medpluviosidad, medotros, medtomamuestra, lotecultivadoid } = req.body;

        // Valida que las variables no esten vacias
        if (validation.emptyField(medtemperaturapromedio) || validation.emptyField(medaltitud) || validation.emptyField(medtopografia) ||
            validation.emptyField(medhumedadrelativa) || validation.emptyField(medpluviosidad) || validation.emptyField(medotros) ||
            validation.emptyField(medtomamuestra) || validation.emptyField(lotecultivadoid)) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            try {
                const rowCount = await environmentModel.updateEnvironment(id, {
                    medtemperaturapromedio, medaltitud, medtopografia, medhumedadrelativa, medpluviosidad, medotros, medtomamuestra, lotecultivadoid
                })

                return rowCount == 1 ? res.status(200).send({ message: "Medio ambiente actualizado" }) : res.status(400).send({ message: "Medio ambiente no registrado" });
            } catch (error) {
                /*if (error.code == '23505') {
                    res.status(400).send({ message: "Ya existe un suelo con el código que ha ingresado" });
                } else {
                    return res.status(400).send({ message: "Error al actualizar producto" });
                }*/
                return res.status(400).send({ message: "Error al actualizar medio ambiente" });
            }
        }
    },

    // Elimina un medio ambiente
    async deleteEnvironment(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await environmentModel.deleteEnvironment(id);
            if (rowCount == 1) {
                return res.status(200).send({ message: "Medio ambiente eliminado" });
            } else {
                return res.status(400).send({ message: "Medio ambiente no registrado" });
            }

        } catch (err) {
            if (err.code == '23503') {
                res.status(400).send({ message: "El medio ambiente a eliminar tiene relaciones con otros registros en la base de datos" });
            } else {
                return res.status(400).send({ message: "Error al eliminar medio ambiente" });
            }
        }
    }
}