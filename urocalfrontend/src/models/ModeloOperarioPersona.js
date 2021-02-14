export default class ModeloOperarioPersona {
    constructor(personaid, percedula, perapellidos, pernombres, perdireccion, pertelefono, perwhatsapp, peremail, pergenero, perfechanacimiento, opecargo, finca, ciudadnacimiento) {
        this.personaid = personaid;
        this.percedula = percedula;
        this.perapellidos = perapellidos;
        this.pernombres = pernombres;
        this.perdireccion = perdireccion;
        this.pertelefono = pertelefono;
        this.perwhatsapp = perwhatsapp;
        this.peremail = peremail;
        this.pergenero = pergenero;
        this.perfechanacimiento = perfechanacimiento;
        this.opecargo = opecargo;
        this.finca = {
            fincaid: finca.fincaid,
            finnombrefinca: finca.finnombrefinca
        },
        this.ciudadnacimiento = {
            ciudadid: ciudadnacimiento.ciudadid,
            ciudadnombre: ciudadnacimiento.ciudadnombre  
        } 
    }
}