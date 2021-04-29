module.exports = {
    // Valida campo vacio, nulo o indefinido, se utiliza en los controladores para validar que las variables del body no esten vacias
    emptyField(string) {
        if (string === "" || string === null || string === undefined) {
            return true;
        }
        return false;
    },
    validarFecha(fecha) {     
        const [day, month, year] = fecha.split("/");
        if(typeof(day) != 'undefined' && typeof(month) != 'undefined') {
            return `${year}-${month}-${day}`;
        }
        else {
            return fecha;
        }
    }
}

//const validation = require('../../utils/validations');