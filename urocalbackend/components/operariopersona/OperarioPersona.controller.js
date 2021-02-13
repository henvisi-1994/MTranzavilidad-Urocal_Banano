const modeloOperario = require('./OperarioPersona.model');
const operarioDto = require('./OperarioPersona.dto');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {


    // INSERT: Agrega un registro
    async crearOperario(req, res) {
        
        const { percedula, perapellidos, pernombres, perdireccion, pertelefono, perwhatsapp, peremail, pergenero, perfechanacimiento, opecargo, finca, ciudadnacimiento } = req.body;

        try {
            await modeloOperario.crearOperario({
                percedula: percedula,
                perapellidos: perapellidos,
                pernombres: pernombres,
                perdireccion: perdireccion,
                pertelefono: pertelefono,
                perwhatsapp: perwhatsapp,
                peremail: peremail,
                pergenero: pergenero,
                perfechanacimiento: perfechanacimiento,
                opecargo : opecargo,
                fincaid: finca.fincaid,
                ciudadnacimientoid: ciudadnacimiento.ciudadid,
            });
            return res.status(201).send({ message: "Registro exitoso" });
        } catch (error) {
            return res.status(500).send({ message: "Registro fallido" });
        }
    },


    // SELECT: Devuelve todos los registros
    async obtenerOperarios(req, res) {
        const rowsOperarioPersonas = await modeloOperario.obtenerOperarios();         
        return res.status(200).send(operarioDto.multipleOperarioPersona(rowsOperarioPersonas)); 
    },


    // UPDATE: Actualiza un registro
    async actualizarOperario(req, res) {
        const { id } = req.params;
        const { perapellidos, pernombres, pergenero, perfechanacimiento, perdireccion, pertelefono, perwhatsapp, peremail, opecargo, finca, ciudadnacimiento } = req.body;

        const rowCount = await modeloOperario.actualizarOperario(id, {
            perapellidos: perapellidos,
            pernombres: pernombres,
            perdireccion: perdireccion,
            pertelefono: pertelefono,
            perwhatsapp: perwhatsapp,
            peremail: peremail,
            pergenero: pergenero,
            perfechanacimiento: perfechanacimiento,
            opecargo: opecargo,
            fincaid: finca.fincaid,
            ciudadnacimientoid: ciudadnacimiento.ciudadid,
        });
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });
    },


    // DELETE: Elimina un registro
    async eliminarOperario(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await modeloOperario.eliminarOperario(id);
            return rowCount == 1 ? res.status(200).send({ message: "Eliminado exitosamente"}) : res.status(404).send({ message: "Conductor no encontrado" });            
        } catch (err) {
            return res.status(500).send({ message: "Error al tratar de eliminar operario"});
        }
    },
}

