// DATA TRANSFER OBJECT

/* const unicoCiudad = (recurso) => ({
    ciudadid: recurso.ciudadid,
    ciudadnombre: recurso.ciudadnombre
});

// Seccion de Multiples
const multipleCiudad = (recurso) => recurso.map((recurso) => unicoCiudad(recurso)); */

// Seccion de Unicos
const unicoLimHerr = (recurso) => ({
    limpiezaherramientaid: recurso.limpiezaherramientaid,
    limfecha: recurso.limfecha,
    limproducto: recurso.limproducto,
    limequipos: recurso.limequipos,
    limmaquinaria: recurso.limmaquinaria,
    limherramientas: recurso.limherramientas,
    limcajones: recurso.limcajones,
    limtendales: recurso.limtendales,
    limoperario: recurso.limoperario,
    cultivoproducto: {
        cultivoid: recurso.cultivoid,
        productoid: recurso.productoid,
        pronombre: recurso.pronombre
    },
});

const multipleLimHerr = (recurso) => recurso.map((recurso) => unicoLimHerr(recurso));  

module.exports = {
    multipleLimHerr
};