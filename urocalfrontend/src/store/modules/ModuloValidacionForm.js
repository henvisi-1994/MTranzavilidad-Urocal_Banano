export default {
    namespaced: true,

    state: {
        reglas: {
            campoVacio: (texto) => !!texto || "Campo requerido!",

            correo: (texto) => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return pattern.test(texto) || "Ingrese un correo electrónico válido!";
            },
            serie:(texto) =>{
                const pattern = /[0-9-]+$/;
                return pattern.test(texto) || "Ingrese un numero de serie valido!";
            },
            soloLetras:(texto) =>
            {
                const letters = /^[A-Za-z]+$/;
                return letters.test(texto) || "solo letras";
            },

            soloNumeros: (texto) =>
                Number.isInteger(Number(texto)) || "Ingrese sólo números enteros!",

            soloNumerosPositivos: (texto) =>
                Number(texto) >= 0 || "No se permiten cantidades negativas!",
            
            /*soloDiezDigitos: (texto) =>
                String(texto).lenght <= 10 || "Deben tener 10 numeros positivos",*/
        }
    }
}