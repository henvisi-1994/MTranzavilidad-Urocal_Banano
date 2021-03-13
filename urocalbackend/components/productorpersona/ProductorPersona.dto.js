// DATA TRANSFER OBJECT

// Seccion de Unicos
const unicoProductorPersona = (recurso) => ({
    productorid: recurso.productorid,
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
    productoridioma: recurso.productoridioma,
    ciudadnacimiento: {
        ciudadid: recurso.ciudadid,
        ciudadnombre: recurso.ciudadnombre
    },
});

const multipleProductorPersona = (recurso) => recurso.map((recurso) => unicoProductorPersona(recurso));  

module.exports = {
    multipleProductorPersona
};