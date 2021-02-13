const malezaModel = require('./maleza.model');
const validation = require('../../utils/validations');
const malezaDto = require('./maleza.dto');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {

    // Crear un nuevo Control de Maleza
    async createMaleza(req, res) {
        console.log(req.body);
        const { confecha, conhectareas, conmetodo, conoperario, cultivoid } = req.body;

        // Valida que las variables no esten vacias
        if (validation.emptyField(confecha) || validation.emptyField(conhectareas) || validation.emptyField(conmetodo) || validation.emptyField(cultivoid)) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
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
        }   
    },


    // SELECT: Devuelve todos los registros
    // Obtener todos los Controles de Maleza
    async getMaleza(req, res) {
        const malezacontrol = await malezaModel.getMaleza()
        return res.status(200).send(malezacontrol); // <--
        //return res.status(200).send(malezaDto.multipleMalezaControl(malezacontrol));
    },


    //Obtener datos adicionales para mostrar en el select de Maleza
    async getDatosAdicionalesMaleza(req, res) {
        const result = await malezaModel.getDatosAdicionalesMaleza()
        return res.status(200).send(result); // <--
    },


    //  Obtener un Control de Maleza realizado por id
    async getIdMaleza(req, res) {
        const { id } = req.params;
        const rows = await malezaModel.getIdMaleza(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Control de Maleza no encontrado" });
    },


    // UPDATE: Actualiza un registro
    // Actualiza informacion de un Control de Maleza
    async updateMaleza(req, res) {
        const { id } = req.params;
        //const { confecha, conhectareas, conmetodo, conoperario, centroacopiolista } = req.body;
        const { confecha, conhectareas, conmetodo, conoperario, cultivoid } = req.body;

        if (validation.emptyField(confecha) || validation.emptyField(conhectareas) || validation.emptyField(conmetodo) || validation.emptyField(cultivoid)) {
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        } else {
            const rowCount = await malezaModel.updateMaleza(id, {
                confecha: confecha,
                conhectareas: conhectareas,
                conmetodo: conmetodo,
                conoperario: conoperario, 
                //cultivoid: cultivolista.cultivoid
                cultivoid: cultivoid
            });     
            return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });    
        }
    },


    // DELETE: Elimina un registro
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
