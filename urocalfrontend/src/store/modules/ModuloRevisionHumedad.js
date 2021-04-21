import RevisionHumedad from '@/models/ModeloRevisionHumedad';

export default {
    namespaced: true,

    state: {
        revisionHumedad: new RevisionHumedad(0, '', '', '', '', '', ''), // Modelo RevisionHumedad
        formRevisionHumedadValido: false, // Indica si el formulario de RevisionHumedad es valido
        textoBotonRevisionHumedad: "Registrar", // Almacena el texto del boton del formulario
        listaRevisionHumedad: [], // Almacena objetos revisionHumedad
        bloquearCamposFormRevisionHumedad:false, 
    },

    mutations: {
        // revisionHumedad
        nuevoRevisionHumedad(state, nuevoRevisionHumedad) {
            state.revisionHumedad = nuevoRevisionHumedad
        },

        vaciarRevisionHumedad(state) {
            state.revisionHumedad = new RevisionHumedad(0, '', '', '', '', '', '')
        },

        // Cambia  el estado del Formulario RevisionHumedad
        cambiarEstadoValidoFormRevisionHumedad(state, nuevoEstado) {
            state.formRevisionHumedadValido = nuevoEstado
        },

        // Cambia  el estado del boton del formulario RevisionHumedad
        cambiarTextoBotonRevisionHumedad(state, nuevoTexto) {
            state.textoBotonRevisionHumedad = nuevoTexto
        },
         // Cambia el estado de la variable bloquearCamposFormAlmacenamiento
         cambiarBloquearCamposFormRevisionHumedad(state, nuevoEstado) {
            state.bloquearCamposFormRevisionHumedad = nuevoEstado
        },


        // listaRevisionHumedad
        asignarListaRevisionHumedad(state, nuevoListaRevisionHumedad) {
            state.listaRevisionHumedad = nuevoListaRevisionHumedad
        },
    },

    getters: {
        revisionHumedad: (state) => state.revisionHumedad, // Devuelve el modelo revisionHumedad
        bloquearCamposFormRevisionHumedad: (state) => state.bloquearCamposFormRevisionHumedad, 
        formRevisionHumedadValido: (state) => state.formRevisionHumedadValido, // Devuelve la variable formRevisionHumedadValido
        textoBotonRevisionHumedad: (state) => state.textoBotonRevisionHumedad, // Devuelve la variable textoBotonRevisionHumedad
        listaRevisionHumedad: (state) => state.listaRevisionHumedad, // Devuelve la listaRevisionHumedad
    },
}