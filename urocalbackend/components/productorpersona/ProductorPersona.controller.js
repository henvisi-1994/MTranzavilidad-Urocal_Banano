const modeloProductor = require('./ProductorPersona.model');
const productorDto = require('./ProductorPersona.dto');

// CRUD: Create (Insert) - Read (Select) - Update (Update) - Delete (Delete)
module.exports = {


    // INSERT: Agrega un registro
    async crearProductor(req, res) {

        const { percedula, perapellidos, pernombres, perdireccion, pertelefono, perwhatsapp, peremail, pergenero, perfechanacimiento, productoridioma, ciudadnacimiento } = req.body;

        try {
            await modeloProductor.crearProductor({
                percedula: percedula,
                perapellidos: perapellidos,
                pernombres: pernombres,
                perdireccion: perdireccion,
                pertelefono: pertelefono,
                perwhatsapp: perwhatsapp,
                peremail: peremail,
                pergenero: pergenero,
                perfechanacimiento: perfechanacimiento,
                productoridioma: productoridioma,
                ciudadnacimientoid: ciudadnacimiento.ciudadid,
            });
            return res.status(201).send({ message: "Registro exitoso" });
        } catch (error) {
            return res.status(500).send({ message: "Registro fallido" });
        }
    },


    // SELECT: Devuelve todos los registros
    async obtenerProductores(req, res) {
        const rowsProductorPersonas = await modeloProductor.obtenerProductores();
        return res.status(200).send(productorDto.multipleProductorPersona(rowsProductorPersonas));
    },

    // SELECT: Devuelve todos los registros
    async obtenerProductor(req, res) {
        const { id } = req.params;
        const rowsProductorPersonas = await modeloProductor.obtenerProductor(id);
        return res.status(200).send(productorDto.multipleProductorPersona(rowsProductorPersonas));
    },

    // UPDATE: Actualiza un registro
    async actualizarProductor(req, res) {
        const { id } = req.params;
        const { perapellidos, pernombres, pergenero, perfechanacimiento, perdireccion, pertelefono, perwhatsapp, peremail, productoridioma, ciudadnacimiento } = req.body;

        const rowCount = await modeloProductor.actualizarProductor(id, {
            perapellidos: perapellidos,
            pernombres: pernombres,
            perdireccion: perdireccion,
            pertelefono: pertelefono,
            perwhatsapp: perwhatsapp,
            peremail: peremail,
            pergenero: pergenero,
            perfechanacimiento: perfechanacimiento,
            productoridioma: productoridioma,
            ciudadnacimientoid: ciudadnacimiento.ciudadid,
        });
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });
    },


    // DELETE: Elimina un registro
    async eliminarProductor(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await modeloProductor.eliminarProductor(id);
            return rowCount == 1 ? res.status(200).send({ message: "Eliminado exitosamente" }) : res.status(404).send({ message: "Conductor no encontrado" });
        } catch (err) {
            return res.status(500).send({ message: "Error al tratar de eliminar productor" });
        }
    },
}

