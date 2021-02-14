const modeloConductor = require('./ConductorPersona.model');
const conductorDto = require('./ConductorPersona.dto');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {


    // INSERT: Agrega un registro
    async crearConductor(req, res) {
        
        const { percedula, perapellidos, pernombres, pergenero, perfechanacimiento, perdireccion, pertelefono, perwhatsapp, peremail, ciudadnacimiento, conductorlicencia } = req.body;

        try {
            await modeloConductor.crearConductor({
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
                conductorlicencia: parseInt(conductorlicencia)
            });
            return res.status(201).send({ message: "Registro exitoso" });
        } catch (error) {
            return res.status(500).send({ message: "Registro fallido" });
        }
    },


    // SELECT: Devuelve todos los registros
    async obtenerConductores(req, res) {
        const rowsConductorPersonas = await modeloConductor.obtenerConductores();         
        return res.status(200).send(conductorDto.multipleConductorPersona(rowsConductorPersonas)); 
    },


    // UPDATE: Actualiza un registro
    async actualizarConductor(req, res) {
        const { id } = req.params;
        const { perapellidos, pernombres, pergenero, perfechanacimiento, perdireccion, pertelefono, perwhatsapp, peremail, ciudadnacimiento, conductorlicencia } = req.body;

        const rowCount = await modeloConductor.actualizarConductor(id, {
            perapellidos: perapellidos,
            pernombres: pernombres,
            perdireccion: perdireccion,
            pertelefono: pertelefono,
            perwhatsapp: perwhatsapp,
            peremail: peremail,
            pergenero: pergenero,
            perfechanacimiento: perfechanacimiento,
            ciudadnacimientoid: ciudadnacimiento.ciudadid,
            conductorlicencia: conductorlicencia
        });
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });
    },


    // DELETE: Elimina un registro
    async eliminarConductor(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await modeloConductor.eliminarConductor(id);
            return rowCount == 1 ? res.status(200).send({ message: "Eliminado exitosamente"}) : res.status(404).send({ message: "Conductor no encontrado" });
            
        } catch (err) {
            return res.status(500).send({ message: "Error al tratar de eliminar conductor"});
        }
    },
}

