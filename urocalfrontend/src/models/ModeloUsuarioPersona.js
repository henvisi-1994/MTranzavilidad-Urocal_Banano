export default class ModeloUsuarioPersona {
    constructor(personaid, percedula, perapellidos, pernombres, perdireccion, pertelefono, perwhatsapp, peremail, pergenero, perfechanacimiento, ciudadnacimiento, usutipo, usuactivo) {
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
        this.usutipo = usutipo;
        this.usuactivo = usuactivo;
        this.ciudadnacimiento = {
            ciudadid: ciudadnacimiento.ciudadid,
            ciudadnombre: ciudadnacimiento.ciudadnombre  
        } 
    }
}