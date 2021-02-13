import Asociacion from '@/models/ModeloAsociacion';

export default {
    namespaced: true,

    state: {
        listaAsociacionStore: [],
        listaResponsableStore: [],
        asociacion: new Asociacion('', '', '', '', '', '', '', '', ''), // Modelo Asociacion
        formAsociacionValido: false, // Indica si el formulario de Asociacion es valido
    },

    mutations: {
        // Coloca un nuevo Asociacion
        nuevoAsociacion(state, nuevoAsociacion) {
            state.asociacion = nuevoAsociacion
        },

        // Vacia el modelo Asociacion
        vaciarAsociacion(state) {
            state.asociacion = new Asociacion('', '', '', '', '', '', '', '', '')
        },

        // Cambia  el estado del Formulario Asociacion
        cambiarEstadoValidoFormAsociacion(state, nuevoEstado) {
            state.formAsociacionValido = nuevoEstado
        },

        establecerListaResponsableStore(state, newState) {
            state.listaResponsableStore = newState;
        },

        limpiarListaResponsableStore(state) {
            state.listaResponsableStore = [];
        },

        establecerListaAsociacionStore(state, newState) {
            state.listaAsociacionStore = newState;
        },
    },

    getters: {
        formAsociacionValido: (state) => state.formAsociacionValido, // Devuelve la variable 
        asociacion: (state) => state.asociacion,
        listaAsociacionStore: (state) => state.listaAsociacionStore,
        listaResponsableStore: (state) => state.listaResponsableStore,
    },
}