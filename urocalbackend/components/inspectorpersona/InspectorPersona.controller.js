const modeloInspector = require('./InspectorPersona.model');
const inspectorDto = require('./InspectorPersona.dto');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {


    // INSERT: Agrega un registro
    async crearInspector(req, res) {
        
        const { percedula, perapellidos, pernombres, pergenero, perfechanacimiento, perdireccion, pertelefono, perwhatsapp, peremail, ciudadnacimiento } = req.body;

        try {
            await modeloInspector.crearInspector({
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
    async obtenerInspectores(req, res) {
        const rowsInspectorPersonas = await modeloInspector.obtenerInspectores();         
        return res.status(200).send(inspectorDto.multipleInspectorPersona(rowsInspectorPersonas)); 
    },


    // UPDATE: Actualiza un registro
    async actualizarInspector(req, res) {
        const { id } = req.params;
        const { perapellidos, pernombres, pergenero, perfechanacimiento, perdireccion, pertelefono, perwhatsapp, peremail, ciudadnacimiento } = req.body;

        const rowCount = await modeloInspector.actualizarInspector(id, {
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
    async eliminarInspector(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await modeloInspector.eliminarInspector(id);
            return rowCount == 1 ? res.status(200).send({ message: "Eliminado exitosamente"}) : res.status(404).send({ message: "Conductor no encontrado" });            
        } catch (err) {
            return res.status(500).send({ message: "Error al tratar de eliminar inspector"});
        }
    },
}

