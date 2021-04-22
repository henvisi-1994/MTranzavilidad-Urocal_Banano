// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores
//const userDto = require('./users.dto');

const modeloCultivo = require('./cultivo.model');
const validation = require('../../utils/validations');

module.exports = {
    // Agrega un nuevo cultivo
    async crearCultivo(req, res) {
        const { lotecultivadoid, productoid } = req.body;

        // Valida que las variables no esten vacias
        if (validation.emptyField(lotecultivadoid) || validation.emptyField(productoid)) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            try {
                await modeloCultivo.crearCultivo({ lotecultivadoid, productoid })

                return res.status(201).send({ message: 'Cultivo registrado' });
            } catch (error) {
                return res.status(500).send({ message: "Error al registrar cultivo" });
            }
        }
    },

    // Obtener todos los cultivos
    async obtenerTodosCultivo(req, res) {
        const result = await modeloCultivo.obtenerTodosCultivo()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(result); // <--
    },

    async obtenerTodosCultivoDestalles(req, res) {
        const result = await modeloCultivo.obtenerTodosCultivoDetalles()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(result); // <--
    },

    async obtenerCultivoDestalles(req, res) {
        const { id } = req.params;
        const result = await modeloCultivo.obtenerCultivoDetalles(id)
        return res.status(200).send(result);
    },

    // Obtener un cultivo por ID
    async obtenerCultivo(req, res) {
        const { id } = req.params;
        const cultivo = await modeloCultivo.obtenerCultivo(id);
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return cultivo === undefined ? res.status(200).send({}) : res.status(200).send(cultivo);
    },

    // Actualiza un cultivo
    async actualizarCultivo(req, res) {
        const { id } = req.params;
        const { lotecultivadoid, productoid } = req.body;

        console.log("reqqqq"+productoid);
        console.log("res"+lotecultivadoid);

        if (validation.emptyField(lotecultivadoid) || validation.emptyField(productoid)) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            try {
                const rowCount = await modeloCultivo.actualizarCultivo(lotecultivadoid, { lotecultivadoid, productoid })

                return rowCount >= 1 ? res.status(200).send({ message: "Cultivo actualizado" }) : res.status(400).send({ message: "Cultivo no registrado" });
            } catch (error) {
                return res.status(400).send({ message: "Error al actualizar cultivo" });
            }
        }
    },

    // Elimina un cultivo
    async eliminarCultivo(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await modeloCultivo.eliminarCultivolotecultivadoid(id);
            if (rowCount == 1) {
                return res.status(200).send({ message: "Cultivo eliminado" });
            } else {
                return res.status(400).send({ message: "Cultivo no registrado" });
            }

        } catch (err) {
            if (err.code == '23503') {
                res.status(400).send({ message: "El cultivo a eliminar tiene relaciones con otros registros en la base de datos" });
            } else {
                return res.status(400).send({ message: "Error al eliminar cultivo" });
            }
        }
    }
}