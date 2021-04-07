// DATA TRANSFER OBJECT

// Seccion de Unicos
const unicoMalezaControl = (recurso) => ({
    controlmalezaid : recurso.controlmalezaid, 
    confecha : recurso.confecha, 
    conhectareas : recurso.conhectareas, 
    conmetodo : recurso.conmetodo, 
    conoperario : recurso.conoperario, 
    cultivoid : recurso.cultivoid,
    cultivo : recurso.cultivo,
    lotecultivadoid: recurso.lotecultivadoid,
    lotnumero : recurso.lotnumero,
    fincaid : recurso.fincaid,
    nombrefinca: recurso.finnombrefinca
    //limcenmotivo : recurso.limcenmotivo
    
});

const multipleMalezaControl = (recurso) => recurso.map((recurso) => unicoMalezaControl(recurso));

module.exports = {
    multipleMalezaControl
};