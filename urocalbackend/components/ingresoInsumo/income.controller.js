// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores
//const userDto = require('./users.dto');

const incomeModel = require('./income.model');
const validation = require('../../utils/validations');

module.exports = {
    // Agrega un nuevo income
    async createincome(req, res) {
        const { ingresoinsumosid, inginsfechaingreso, inginsproducto, inginsfactura,inginsproveedor,inginscantidadingreso,inginsunidad,inginssaldo, ingencargado, centroacopioid } = req.body;
        //console.log(req.body);

        // Valida que las variables no esten vacias validation.emptyField(ingresoinsumosid) || 
        if (validation.emptyField(inginsfechaingreso) || validation.emptyField(inginsproducto)
        || validation.emptyField(inginsfactura) || validation.emptyField(inginsproveedor) || validation.emptyField(inginscantidadingreso)
        || validation.emptyField(inginsunidad) || validation.emptyField(inginssaldo) || validation.emptyField(ingencargado) || validation.emptyField(centroacopioid)) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            try {
                await incomeModel.createincome({ inginsfechaingreso, inginsproducto, inginsfactura,inginsproveedor,inginscantidadingreso,inginsunidad,inginssaldo, ingencargado, centroacopioid })

                return res.status(201).send({ message: 'Ingreso de insumo registrado' });
            } catch (error) {
                if (error.code == '23505') {
                    res.status(400).send({ message: "Ya existe un Ingreso de insumo con el código que ha ingresado" });
                } else {
                    console.log("error en el catch: ", error)
                    return res.status(500).send({ message: "Error al registrar un Ingreso de insumo" });
                }
            }
        }
    },

    // Obtener todos los incomes
    async getAllincomes(req, res) {
        const result = await incomeModel.getAllincomes()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(result); // <--
    },

    // Obtener un income por ID
    async getincome(req, res) {
        const { id } = req.params;
        const income = await incomeModel.getincome(id);
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return income === undefined ? res.status(200).send({}) : res.status(200).send(income);
    },

    // Actualiza un income
    async updateincome(req, res) {
        const { id } = req.params;
        const { ingresoinsumosid, inginsfechaingreso, inginsproducto, inginsfactura,inginsproveedor,inginscantidadingreso,inginsunidad,inginssaldo, ingencargado, centroacopioid } = req.body;

        if (validation.emptyField(inginsfechaingreso) || validation.emptyField(inginsproducto)
        || validation.emptyField(inginsfactura) || validation.emptyField(inginsproveedor) || validation.emptyField(inginscantidadingreso)
        || validation.emptyField(inginsunidad) || validation.emptyField(inginssaldo) || validation.emptyField(ingencargado) || validation.emptyField(centroacopioid) ) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            try {
                const rowCount = await incomeModel.updateincome(id, { inginsfechaingreso, inginsproducto, inginsfactura,inginsproveedor,inginscantidadingreso,inginsunidad,inginssaldo, ingencargado, centroacopioid })

                return rowCount == 1 ? res.status(200).send({ message: "Ingreso de insumo actualizado" }) : res.status(400).send({ message: "Ingreso de insumo no registrado" });
            } catch (error) {
                if (error.code == '23505') {
                    return res.status(400).send({ message: "Ya existe un Ingreso de insumo con el código que ha ingresado" });
                }

                return res.status(400).send({ message: "Error al actualizar Ingreso de insumo" });
            }
        }
    },

    // Elimina un income
    async deleteincome(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await incomeModel.deleteincome(id);
            if (rowCount == 1) {
                return res.status(200).send({ message: "Ingreso de insumo eliminado" });
            } else {
                return res.status(400).send({ message: "Ingreso de insumo no registrado" });
            }

        } catch (err) {
            if (err.code == '23503') {
                res.status(400).send({ message: "El Ingreso de insumo a eliminar tiene relaciones con otros registros en la base de datos" });
            } else {
                return res.status(400).send({ message: "Error al eliminar Ingreso de insumo" });
            }
        }
    }
}