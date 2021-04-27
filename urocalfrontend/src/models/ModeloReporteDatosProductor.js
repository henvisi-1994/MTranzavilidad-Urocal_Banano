export default class ModeloReporteDatosProductor {
    constructor(personaid, percedula, perapellidos, pernombres, perdireccion, pertelefono, perwhatsapp, peremail, pergenero, edad, productoridioma, ciudadnacimiento) {
        this.personaid = personaid;
        this.percedula = percedula;
        this.perapellidos = perapellidos;
        this.pernombres = pernombres;
        this.perdireccion = perdireccion;
        this.pertelefono = pertelefono;
        this.perwhatsapp = perwhatsapp;
        this.peremail = peremail;
        this.pergenero = pergenero;
        this.edad = edad;
        this.productoridioma = productoridioma;
        this.ciudadnacimiento = {
            ciudadid: ciudadnacimiento.ciudadid,
            ciudadnombre: ciudadnacimiento.ciudadnombre  
        } 
    }
}