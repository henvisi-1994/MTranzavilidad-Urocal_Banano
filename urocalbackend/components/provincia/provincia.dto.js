// DATA TRANSFER OBJECT

/* const unicoCiudad = (recurso) => ({
    ciudadid: recurso.ciudadid,
    ciudadnombre: recurso.ciudadnombre
});

// Seccion de Multiples
const multipleCiudad = (recurso) => recurso.map((recurso) => unicoCiudad(recurso)); */

// Seccion de Unicos
const unicoProvincia = (recurso) => ({
    provinciaid: recurso.provinciaid,
    provincianombre: recurso.provincianombre,
    provinciapais: {
        paisid: recurso.paisid,
        paisnombre: recurso.paisnombre
    },
});

const multipleProvincia = (recurso) => recurso.map((recurso) => unicoProvincia(recurso));  

module.exports = {
    multipleProvincia
};