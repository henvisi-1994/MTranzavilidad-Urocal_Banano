import Almacenamiento from '@/models/ModeloAlmacenamiento';

export default {
    namespaced: true,

    state: {
        almacenamiento: new Almacenamiento('', '', '', '', '', '', '', '', '', '', ''), // Modelo Almacenamiento
        cosecha: [], // Almacena lista de cosechas
        formAlmacenamientoValido: false, // Indica si el formulario de Almacenamiento es valido
        listaAlmacenamiento: [], // Lista de almacenamiento
        bloquearCamposFormAlmacenamiento: false, // Determina si se bloquean los campos del formulario
    },

    mutations: {
        // almacenamiento
        nuevoAlmacenamiento(state, nuevoAlmacenamiento) {
            state.almacenamiento = nuevoAlmacenamiento
        },

        vaciarAlmacenamiento(state) {
            state.almacenamiento = new Almacenamiento('', '', '', '', '', '', '', '', '', '', '')
        },

        // Cambia  el estado del Formulario Almacenamiento
        cambiarEstadoValidoFormAlmacenamiento(state, nuevoEstado) {
            state.formAlmacenamientoValido = nuevoEstado
        },

        // listaAlmacenamiento
        asignarListaAlmacenamiento(state, nuevaListaAlmacenamiento) {
            state.listaAlmacenamiento = nuevaListaAlmacenamiento;
        },

        // Cambia el estado de la variable bloquearCamposFormAlmacenamiento
        cambiarBloquearCamposFormAlmacenamiento(state, nuevoEstado) {
            state.bloquearCamposFormAlmacenamiento = nuevoEstado
        },

        // cosecha
        asignarCosecha(state, nuevaCosecha) {
            state.cosecha = nuevaCosecha;
        },

        // cosecha
        agregarCosecha(state, nuevaCosechaID) {
            state.cosecha.push(nuevaCosechaID);
        },
    },

    getters: {
        formAlmacenamientoValido: (state) => state.formAlmacenamientoValido, // Devuelve la variable formAlmacenamientoValido
        bloquearCamposFormAlmacenamiento: (state) => state.bloquearCamposFormAlmacenamiento,    // Devuelve bloquearCamposFormAlmacenamiento
        listaAlmacenamiento: (state) => state.listaAlmacenamiento,    // Devuelve listaAlmacenamiento
        cosecha: (state) => state.cosecha,    // Devuelve listaAlmacenamiento
        almacenamiento: (state) => state.almacenamiento,
    },
}