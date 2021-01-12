export default {
    namespaced: true,

    state: {
        reglas: {
            campoVacio: (texto) => !!texto || "Campo requerido!",

            correo: (texto) => {
                const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return pattern.test(texto) || "Ingrese un correo electrónico válido!";
            },

            soloNumeros: (texto) =>
                Number.isInteger(Number(texto)) || "Ingrese sólo números enteros!",

            soloNumerosPositivos: (texto) =>
                Number(texto) >= 0 || "No se permiten cantidades negativas!",
        }
    }
}