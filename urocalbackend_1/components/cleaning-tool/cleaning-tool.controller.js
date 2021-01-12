// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores

const cleaningToolModel = require('./cleaning-tool.model');


module.exports = {

    // Crear un nuevo registro limpieza herramienta
    async createCleaningTool(req, res) {

        // Añadir capa de validación

        const { limfecha, limproducto, limequipos, limmaquinaria, limherramientas, limcajones, limtendales, limoperario, cultivoid } = req.body;

        try {
            await cleaningToolModel.createCleaningTool({
                limfecha: limfecha,
                limproducto: limproducto,
                limequipos: limequipos,
                limmaquinaria: limmaquinaria,
                limherramientas: limherramientas,
                limcajones: limcajones,
                limtendales: limtendales,
                limoperario: limoperario,
                cultivoid: cultivoid
            });
        } catch (error) {
            return res.status(500).send({ message: "Registro fallido" });
        }

        return res.status(201).send({ message: "Registro exitoso" });
    },

    // Obtener todos los registros de limpieza herramienta
    async getCleaningTools(req, res) {
        const cleaningTool = await cleaningToolModel.getCleaningTools()
        return res.status(200).send(cleaningTool); // <--
    },

    //  Obtener registro de limpieza herramienta por id
    async getCleaningTool(req, res) {
        const { id } = req.params;
        const rows = await cleaningToolModel.getCleaningTool(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Registro no encontrado" });
    },

    // Actualiza informacion de un registro de limpieza herramienta
    async updateCleaningTool(req, res) {
        const { id } = req.params;
        const { limfecha, limproducto, limequipos, limmaquinaria, limherramientas, limcajones, limtendales, limoperario, cultivoid } = req.body;

        const rowCount = await cleaningToolModel.updateCleaningTool(id, {
            limfecha: limfecha,
            limproducto: limproducto,
            limequipos: limequipos,
            limmaquinaria: limmaquinaria,
            limherramientas: limherramientas,
            limcajones: limcajones,
            limtendales: limtendales,
            limoperario: limoperario,
            cultivoid: cultivoid
        });
        
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });

    },

    // Elimina un registro de limpieza herramienta
    async deleteCleaningTool(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await cleaningToolModel.deleteCleaningTool(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "No registrado", tipo: "error" });
            
        } catch (err) {
            return res.json({ message: "Error al tratar de eliminar registro", tipo: "error" });
        }
    }
}

