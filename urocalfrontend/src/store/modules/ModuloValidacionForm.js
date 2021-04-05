export default {
    namespaced: true,

    state: {
        reglas: {
            campoVacio: (texto) => !!texto || "Campo esta vacio!",

            correo: (texto) => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return pattern.test(texto) || "Ingrese un correo electrónico válido!";
            },

            soloNumeros: (texto) =>
                Number.isInteger(Number(texto)) || "Ingrese sólo números enteros!",

            soloNum: (texto) =>
                Number.isInteger(Number(texto)) || "Ingrese sólo números enteros!",

            soloNumerosPositivos: (texto) =>
<<<<<<< HEAD
                Number(texto) >= 0 || "No se permiten cantidades negativas!",
=======
                Number(texto) >= 0 || "No se permiten cantidades negativas o texto!",
>>>>>>> 8f2d20847df712c65189b6986e90c5e632f0850c
            soloLetras:(texto) =>
            {
                const letters = /^[A-Za-z]+$/;
                return letters.test(texto) || "solo letras";
            }
               
            /*soloDiezDigitos: (texto) =>
                String(texto).lenght <= 10 || "Deben tener 10 numeros positivos",*/
        }
    }
}