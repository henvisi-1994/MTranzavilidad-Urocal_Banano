const empresaModel = require('./empresa.model');
const validation = require('../../utils/validations');

module.exports = {
      // Agrega un nuevo empresao
      async createempresa(req, res) {
        const { emprazonsocial, empruc, emptipo, empdireccion, emptelefono, empemail, paisid } = req.body;
        // Valida que las variables no esten vacias
        if (validation.emptyField(emprazonsocial) || validation.emptyField(empruc)
        || validation.emptyField(emptipo) || validation.emptyField(empdireccion) || validation.emptyField(emptelefono) 
        || validation.emptyField(empemail) || validation.emptyField(paisid) ) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            try {
                await empresaModel.createempresa({ 
                    emprazonsocial, 
                    empruc, 
                    emptipo,
                    empdireccion,
                    emptelefono,
                    empemail, 
                    paisid, 
                })

                return res.status(201).send({ message: 'empresao registrado' });
            } catch (error) {
                if (error.code == '23505') {
                    res.status(400).send({ message: "Ya existe un empresao con el código que ha ingresado" });
                } else {
                    console.log("error en el catch: ", error)
                    return res.status(500).send({ message: "Error al registrar empresao" });
                }
            }
        }
    },

    // Obtener todos los empresaos
    async getAllempresas(req, res) {
        const result = await empresaModel.getAllempresas()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(result); // <--
    },

    // Obtener un empresao por ID
    async getempresa(req, res) {
        const { id } = req.params;
        const empresa = await empresaModel.getempresa(id);
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return empresa === undefined ? res.status(200).send({}) : res.status(200).send(empresa);
    },

    // Actualiza un empresao
    async updateempresa(req, res) {
        const { id } = req.params;
        const { emprazonsocial, empruc, emptipo, empdireccion, emptelefono, empemail, paisid } = req.body;

        if (validation.emptyField(emprazonsocial) || validation.emptyField(empruc)
        || validation.emptyField(emptipo) || validation.emptyField(empdireccion) || validation.emptyField(emptelefono) 
        || validation.emptyField(empemail) || validation.emptyField(paisid) ) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            try {
                const rowCount = await empresaModel.updateempresa(id, { emprazonsocial, empruc, emptipo, empdireccion, emptelefono, empemail, paisid })

                return rowCount == 1 ? res.status(200).send({ message: "empresao actualizado" }) : res.status(400).send({ message: "empresao no registrado" });
            } catch (error) {
                if (error.code == '23505') {
                    return res.status(400).send({ message: "Ya existe un empresao con el código que ha ingresado" });
                }
                console.log("Esto contiene error ..", error)
                return res.status(400).send({ message: "Error al actualizar empresao" });
            }
        }
    },

    // Elimina un empresao
    async deleteempresa(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await empresaModel.deleteempresa(id);
            if (rowCount == 1) {
                return res.status(200).send({ message: "empresao eliminado" });
            } else {
                return res.status(400).send({ message: "empresao no registrado" });
            }

        } catch (err) {
            if (err.code == '23503') {
                res.status(400).send({ message: "El empresao a eliminar tiene relaciones con otros registros en la base de datos" });
            } else {
                console.log("Esto contiene err ...", err)
                return res.status(400).send({ message: "Error al eliminar empresao" });
            }
        }
    }
}