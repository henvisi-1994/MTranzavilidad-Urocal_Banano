// DATA TRANSFER OBJECT

// Seccion de Unicos
const unicoOperarioPersona = (recurso) => ({
    personaid: recurso.personaid, 
    percedula: recurso.percedula, 
    perapellidos: recurso.perapellidos, 
    pernombres: recurso.pernombres, 
    perdireccion: recurso.perdireccion, 
    pertelefono: recurso.pertelefono, 
    perwhatsapp: recurso.perwhatsapp, 
    peremail: recurso.peremail, 
    pergenero: recurso.pergenero, 
    perfechanacimiento: recurso.perfechanacimiento, 
    opecargo: recurso.opecargo,
    finca: {
        fincaid: recurso.fincaid,
        finnombrefinca: recurso.finnombrefinca
    },
    ciudadnacimiento: {
        ciudadid: recurso.ciudadid,
        ciudadnombre: recurso.ciudadnombre
    },
});

const multipleOperarioPersona = (recurso) => recurso.map((recurso) => unicoOperarioPersona(recurso));  

module.exports = {
    multipleOperarioPersona
};