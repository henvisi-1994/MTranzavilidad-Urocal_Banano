// DATA TRANSFER OBJECT

/* const unicoCiudad = (recurso) => ({
    ciudadid: recurso.ciudadid,
    ciudadnombre: recurso.ciudadnombre
});

// Seccion de Multiples
const multipleCiudad = (recurso) => recurso.map((recurso) => unicoCiudad(recurso)); */

// Seccion de Unicos
const unicoCiudad = (recurso) => ({
    ciudadid: recurso.ciudadid,
    ciudadnombre: recurso.ciudadnombre,
    ciudadprovincia: {
        provinciaid: recurso.provinciaid,
        provincianombre: recurso.provincianombre
    },
});

const multipleCiudad = (recurso) => recurso.map((recurso) => unicoCiudad(recurso));  

module.exports = {
    multipleCiudad
};