// DATA TRANSFER OBJECT

/* const unicoCiudad = (recurso) => ({
    ciudadid: recurso.ciudadid,
    ciudadnombre: recurso.ciudadnombre
});

// Seccion de Multiples
const multipleCiudad = (recurso) => recurso.map((recurso) => unicoCiudad(recurso)); */

// Seccion de Unicos
const unicoUsuarioPersona = (recurso) => ({
    personaid : recurso.personaid, 
    percedula : recurso.percedula, 
    perapellidos : recurso.perapellidos, 
    pernombres : recurso.pernombres, 
    perdireccion : recurso.perdireccion, 
    pertelefono : recurso.pertelefono, 
    perwhatsapp : recurso.perwhatsapp, 
    peremail : recurso.peremail, 
    pergenero : recurso.pergenero, 
    perfechanacimiento : recurso.perfechanacimiento, 
    usutipo: recurso.usutipo,
    ciudadnacimiento: {
        ciudadid: recurso.ciudadid,
        ciudadnombre: recurso.ciudadnombre
    },
    usuactivo: recurso.usuactivo
});

const multipleUsuarioPersona = (recurso) => recurso.map((recurso) => unicoUsuarioPersona(recurso));  

module.exports = {
    multipleUsuarioPersona
};