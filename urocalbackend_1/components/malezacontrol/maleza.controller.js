// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores
//const userDto = require('./users.dto');

const malezaModel = require('./maleza.model');


module.exports = {

    // Crear un nuevo Control de Maleza
    async createMaleza(req, res) {

        // Añadir capa de validación

        const { confecha, conhectareas, conmetodo, conoperario, cultivoid } = req.body;

        try {
            await malezaModel.createMaleza({
                confecha: confecha,
                conhectareas: conhectareas,
                conmetodo: conmetodo,
                conoperario: conoperario, 
                cultivoid: cultivoid
            });
        } catch (error) {
            return res.status(500).send({ message: "Registro fallido" });
         }

        return res.status(201).send({ message: "Registro exitoso" });
    },


    // Obtener todos los Controles de Maleza
    async getMaleza(req, res) {
        const malezacontrol = await malezaModel.getMaleza()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(malezacontrol); // <--
    },


    //  Obtener un Control de Maleza realizado por id
    async getIdMaleza(req, res) {
        const { id } = req.params;
        const rows = await malezaModel.getIdMaleza(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Control de Maleza no encontrado" });
    },


    // Actualiza informacion de un Control de Maleza
    async updateMaleza(req, res) {
        const { id } = req.params;
        const { confecha, conhectareas, conmetodo, conoperario, cultivoid } = req.body;

        const rowCount = await malezaModel.updateMaleza(id, {
            confecha: confecha,
            conhectareas: conhectareas,
            conmetodo: conmetodo,
            conoperario: conoperario, 
            cultivoid: cultivoid
        });
        
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });

    },

    
    // Elimina informacion de un Control de Maleza
    async deleteMaleza(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await malezaModel.deleteMaleza(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "Control de Maleza no registrado", tipo: "error" });
            
        } catch (err) {
            return res.json({ message: "Error al tratar de eliminar el control de maleza", tipo: "error" });
        }
    },
}
