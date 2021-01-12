module.exports = {
    // Valida campo vacio, nulo o indefinido, se utiliza en los controladores para validar que las variables del body no esten vacias
    emptyField(string) {
        if (string === "" || string === null || string === undefined) {
            return true;
        }
        return false;
    }
}