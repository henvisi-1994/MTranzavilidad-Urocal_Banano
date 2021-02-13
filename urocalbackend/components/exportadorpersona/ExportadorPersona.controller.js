const modeloExportador = require('./ExportadorPersona.model');
const exportadorDto = require('./ExportadorPersona.dto');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {


    // INSERT: Agrega un registro
    async crearExportador(req, res) {
        
        const { percedula, perapellidos, pernombres, perdireccion, pertelefono, perwhatsapp, peremail, pergenero, perfechanacimiento, ciudadnacimiento } = req.body;

        try {
            await modeloExportador.crearExportador({
                percedula: percedula,
                perapellidos: perapellidos,
                pernombres: pernombres,
                perdireccion: perdireccion,
                pertelefono: pertelefono,
                perwhatsapp: perwhatsapp,
                peremail: peremail,
                pergenero: pergenero,
                perfechanacimiento: perfechanacimiento,
                ciudadnacimientoid: ciudadnacimiento.ciudadid,
            });
            return res.status(201).send({ message: "Registro exitoso" });
        } catch (error) {
            return res.status(500).send({ message: "Registro fallido" });
        }
    },


    // SELECT: Devuelve todos los registros
    async obtenerExportadores(req, res) {
        const rowsExportadorPersonas = await modeloExportador.obtenerExportadores();         
        return res.status(200).send(exportadorDto.multipleExportadorPersona(rowsExportadorPersonas)); 
    },


    // UPDATE: Actualiza un registro
    async actualizarExportador(req, res) {
        const { id } = req.params;
        const { perapellidos, pernombres, pergenero, perfechanacimiento, perdireccion, pertelefono, perwhatsapp, peremail, ciudadnacimiento } = req.body;

        const rowCount = await modeloExportador.actualizarExportador(id, {
            perapellidos: perapellidos,
            pernombres: pernombres,
            perdireccion: perdireccion,
            pertelefono: pertelefono,
            perwhatsapp: perwhatsapp,
            peremail: peremail,
            pergenero: pergenero,
            perfechanacimiento: perfechanacimiento,
            ciudadnacimientoid: ciudadnacimiento.ciudadid,
        });
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });
    },


    // DELETE: Elimina un registro
    async eliminarExportador(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await modeloExportador.eliminarExportador(id);
            return rowCount == 1 ? res.status(200).send({ message: "Eliminado exitosamente"}) : res.status(404).send({ message: "Conductor no encontrado" });            
        } catch (err) {
            return res.status(500).send({ message: "Error al tratar de eliminar exportador"});
        }
    },
}

