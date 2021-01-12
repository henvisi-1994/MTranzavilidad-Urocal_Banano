// Une varias capas
// Se comunica con el modelo
// *Pendiente: Añadir capa de validación a todos los controladores
const nodemailer = require("nodemailer");
const usersModel = require('./users.model');
const config = require('config');


module.exports = {

    // Crear un nuevo usuario
    async createUser(req, res) {

        // Añadir capa de validación

        const { percedula, perapellidos, pernombres, pergenero, perfechanacimiento, perdireccion, pertelefono, perwhatsapp, peremail, ciudadnacimientoid, usutipo } = req.body;

        try {
            await usersModel.createUser({
                percedula: percedula,
                perapellidos: perapellidos,
                pernombres: pernombres,
                perdireccion: perdireccion,
                pertelefono: pertelefono,
                perwhatsapp: perwhatsapp,
                peremail: peremail,
                pergenero: pergenero,
                perfechanacimiento: perfechanacimiento,
                ciudadnacimientoid: ciudadnacimientoid,
                usutipo: usutipo
            });
        } catch (error) {
            return res.status(500).send({ message: "Registro fallido" });
        }

        return res.status(201).send({ message: "Registro exitoso" });
    },


    // Obtener todos los usuarios
    async getUsers(req, res) {
        const users = await usersModel.getUsers()
        //return res.status(200).send(userDto.multiple(users, req.user)); //<--
        return res.status(200).send(users); // <--
    },

    //  Obtener usuario por id
    async getPersona(req, res) {
        const { id } = req.params;
        const rows = await usersModel.getPersona(id);
        return rows != null ? res.status(200).send(rows) : res.status(404).send({ message: "Usuario no encontrado" });
    },

    // Actualiza informacion de un usuario
    async updateUser(req, res) {
        const { id } = req.params;
        const { perapellidos, pernombres, pergenero, perfechanacimiento, perdireccion, pertelefono, perwhatsapp, peremail, ciudadnacimientoid } = req.body;

        const rowCount = await usersModel.updateUser(id, {
            perapellidos: perapellidos,
            pernombres: pernombres,
            perdireccion: perdireccion,
            pertelefono: pertelefono,
            perwhatsapp: perwhatsapp,
            peremail: peremail,
            pergenero: pergenero,
            perfechanacimiento: perfechanacimiento,
            ciudadnacimientoid: ciudadnacimientoid
        });
        
        return rowCount == 1 ? res.status(200).send({ message: "Actualizado con éxito" }) : res.status(404).send({ message: "Registro no encontrado" });

    },

    // Actualiza contrasenia de un usuario
    async updatePasswd(req, res) {
        const { id } = req.params;
        const { oldpasswd, newpasswd } = req.body;
        console.log("old: " + oldpasswd + " - new: " + newpasswd);

        try {
            let isUpdated = await usersModel.updatePasswd(id, oldpasswd, newpasswd);
            console.log("Valor de contraseña: " + isUpdated);
            return isUpdated ? res.status(200).send({ message: "Contraseña actualizada" }): res.status(404).send({message: "Las contraseñas no coinciden"});
        } catch (error) {
            console.log(error);
            return res.json({ message: "Error al actualizar" });
        }
    },

    // Elimina un usuario
    async deleteUser(req, res) {
        const { id } = req.params;

        try {
            let rowCount = await usersModel.deleteUser(id);
            return res.json(rowCount == 1 ? { message: "Eliminado exitosamente", tipo: "exito" } : { message: "Usuario no registrado", tipo: "error" });
            
        } catch (err) {
            return res.json({ message: "Error al tratar de eliminar usuario", tipo: "error" });
        }
    },



    // Envia email de confirmacion a usuario
    async enviarEmail(email, password) {
        const emisor = config.get('email.user'), passwd = config.get('email.password');
        
        let transporter = nodemailer.createTransport({ service: config.get('email.provider'), auth: { user: emisor, pass: passwd } });

        let mailOptions = {
            from: emisor, to: email, subject: "Cambio de contraseña", html:
                `<div style="background-color:#DDDDDD;padding:12px;">
            <div style="background-color:#FFFFFF;padding:24px;border-radius:20px;">
                <img src="https://cecjecuador.org.ec/wp-content/uploads/2020/02/urocal.jpg"/>
                <h1 style="text-align:center;color:#ee44aa;">Verificación de su correo electrónico</h1>
                <p>Su contraseña actual es: ${password} . Por su seguridad debe cambiarla.</p>
                <p>El siguiente botón lo redirigirá a un formulario en el que deberá ingresar su nueva contraseña.</p>
                <a href="http://localhost:8080/ingresar" style="-webkit-appearance: button;
    -moz-appearance:button;appearance: button;text-decoration: none;background-color:#ee44aa;padding:12px;border-radius:8px;color: #FFFFFF;
    font-weight:bold;margin:24px">Confirma tu cuenta</a>
                <p>También puede ingresar al sistema con su clave por defecto y cambiarla.</p>
                <a href="http://localhost:8080/ingresar">Ir a la aplicación web</a>
            </div>
        </div>`
        };

        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                console.log("Error al enviar email", err);
                throw new Error(err);
            }
        });
    }
}

