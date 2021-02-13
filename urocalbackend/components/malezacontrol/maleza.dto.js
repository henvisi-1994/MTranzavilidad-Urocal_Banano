// DATA TRANSFER OBJECT

// Seccion de Unicos
const unicoMalezaControl = (recurso) => ({
    controlmalezaid : recurso.controlmalezaid, 
    confecha : recurso.confecha, 
    conhectareas : recurso.conhectareas, 
    conmetodo : recurso.conmetodo, 
    conoperario : recurso.conoperario, 
    limcenmotivo : recurso.limcenmotivo,
    cultivoid: recurso.cultivoid,
});

const multipleMalezaControl = (recurso) => recurso.map((recurso) => unicoMalezaControl(recurso));

module.exports = {
    multipleMalezaControl
};