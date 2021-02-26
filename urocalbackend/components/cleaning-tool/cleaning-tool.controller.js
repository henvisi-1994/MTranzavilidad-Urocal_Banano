// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores

const cleaningToolModel = require('./cleaning-tool.model');
const cleaningToolDto = require('./cleaning-tool.dto');
const validation = require('../../utils/validations');

module.exports = {

    // Crear un nuevo registro limpieza herramienta
    async createCleaningTool(req, res) {

        // Añadir capa de validación
        const { limfecha, limproducto, limequipos, limmaquinaria, limherramientas, limcajones, limtendales, limoperario, cultivoproducto } = req.body;
        
        if(validation.emptyField(limfecha) || validation.emptyField(limproducto) || validation.emptyField(limequipos) || validation.emptyField(limmaquinaria) || validation.emptyField(limherramientas) || 
            validation.emptyField(limcajones) || validation.emptyField(limtendales) || validation.emptyField(limoperario) || validation.emptyField(cultivoproducto.cultivoid)){
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        }else{
            try {
                let result =  await cleaningToolModel.createCleaningTool({
                    limfecha: limfecha,
                    limproducto: limproducto,
                    limequipos: limequipos,
                    limmaquinaria: limmaquinaria,
                    limherramientas: limherramientas,
                    limcajones: limcajones,
                    limtendales: limtendales,
                    limoperario: limoperario,
                    cultivoid: cultivoproducto.cultivoid})
                return res.status(201).send({ message: 'Limpieza Herramienta registrado', limpiezaherramientaid: result.limpiezaherramientaid });
            } catch (error) {
                return res.status(500).send({ message: "Error al registrar limpieza herramienta" });
            }
        }
    },

    // Obtener todos los registros de limpieza herramienta
    async getCleaningTools(req, res) {
        const cleaningTool = await cleaningToolModel.getCleaningTools()
        return res.status(200).send(cleaningToolDto.multipleLimHerr(cleaningTool)); //<--
    },

    //  Obtener registro de limpieza herramienta por id
    async getProduct(req, res) {
        const { id } = req.params;
        const cleaningTool = await cleaningToolModel.getProduct();
        return res.status(200).send((cleaningTool)); //<-
    },

    // Actualiza informacion de un registro de limpieza herramienta
    async updateCleaningTool(req, res) {
        const { id } = req.params;
        const { limfecha, limproducto, limequipos, limmaquinaria, limherramientas, limcajones, limtendales, limoperario, cultivoproducto } = req.body;

        if(validation.emptyField(limfecha) || validation.emptyField(limproducto) || validation.emptyField(limequipos) || validation.emptyField(limmaquinaria) || validation.emptyField(limherramientas) || 
            validation.emptyField(limcajones) || validation.emptyField(limtendales) || validation.emptyField(limoperario) || validation.emptyField(cultivoproducto.cultivoid)){
            return res.status(400).send({ message: 'Llene todos los campos del formulario!' });
        }else{
            const rowCount = await cleaningToolModel.updateCleaningTool(id, {
                limfecha: limfecha,
                limproducto: limproducto,
                limequipos: limequipos,
                limmaquinaria: limmaquinaria,
                limherramientas: limherramientas,
                limcajones: limcajones,
                limtendales: limtendales,
                limoperario: limoperario,
                cultivoid: cultivoproducto.cultivoid})
            return rowCount == 1 ? res.status(200).send({ message: "Limpieza herramienta actualizado" }) : res.status(400).send({ message: "Error al actualizar limpieza herramienta" });
        }
    },

    // Elimina un registro de limpieza herramienta
    async deleteCleaningTool(req, res) {
        const { id } = req.params;
        try {
            let rowCount = await cleaningToolModel.deleteCleaningTool(id);
            if (rowCount == 1) {
                return res.status(200).send({ message: "Eliminado exitosamente" });
            } else {
                return res.status(400).send({ message: "Limpieza herramienta no registrado" });
            }            
        } catch (err) {
            if (err.code == '23503') {
                res.status(400).send({ message: "Herramienta limpieza  a eliminar tiene relaciones con otros registros en la base de datos" });
            } else {
                return res.status(400).send({ message: "Error al eliminar  herramienta limpieza" });
            }
        }
    }
}

