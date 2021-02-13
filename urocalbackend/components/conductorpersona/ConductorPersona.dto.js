// DATA TRANSFER OBJECT

// Seccion de Unicos
const unicoConductorPersona = (recurso) => ({
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
    conductorlicencia: recurso.conductorlicencia,
    ciudadnacimiento: {
        ciudadid: recurso.ciudadid,
        ciudadnombre: recurso.ciudadnombre
    },
});

const multipleConductorPersona = (recurso) => recurso.map((recurso) => unicoConductorPersona(recurso));  

module.exports = {
    multipleConductorPersona
};