export default class RegistroEnvio {
    constructor(registroenvioid,regfecha,reglote,regdestino,regtipo,regdetalle=[]) {
        this.registroenvioid=registroenvioid;
        this.regfecha=regfecha;
        this.reglote=reglote;
        this.regdestino=regdestino;
        this.regtipo=regtipo;
        this.regorganico=true;
        this.regspp=true;
        this.regdetalle=regdetalle;

    }
}