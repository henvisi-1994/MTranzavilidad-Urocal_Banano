import Poda from '@/models/ModeloPoda';

export default {
    namespaced: true,

    state: {
        listaPodasStore: [],
        listaCultivoStore: [],
        modeloPodaStore: new Poda('', '', '', '', '', '', '', ''), // Modelo Poda
        formPodaValido: false, // Indica si el formulario de Poda es valido
        editarPoda: false
    },

    mutations: {
        // Coloca un nuevo Poda
        establecerModeloPodaStore(state, nuevoPoda) {
            state.modeloPodaStore = nuevoPoda
        },

        establecerListaPodasStore(state, newState) {
            state.listaPodasStore = newState;
        },

        // Vacia el modelo Poda
        vaciarModeloPodaStore(state) {
            state.modeloPodaStore = new Poda('', '', '', '', '', '', '', '')
        },

        // Cambia  el estado del Formulario Poda
        cambiarEstadoValidoFormPoda(state, nuevoEstado) {
            state.formPodaValido = nuevoEstado
        },
        establecerEditarPoda(state, newState) {
            state.editarPoda = newState;
        },

        nuevoPoda(state, nuevoPoda) {
            state.modeloPodaStore = nuevoPoda
        },
        establecerListaCultivoStore(state, newState) {
            state.listaCultivoStore = newState;
        },

        limpiarListaCultivoStore(state) {
            state.listaCultivoStore = [];
        },
    },

    getters: {
        formPodaValido: (state) => state.formPodaValido, // Devuelve la variable formPodaValido
        listaPodasStore: (state) => state.listaPodasStore,
        modeloPodaStore: (state) => state.modeloPodaStore,
        editarPoda: (state) => state.editarPoda,
        listaCultivoStore: (state) => state.listaCultivoStore,
    },
}