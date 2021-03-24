import Poda from '@/models/ModeloPoda';

export default {
    namespaced: true,

    state: {
        listaPodasStore: [],
        modeloPodaStore: new Poda('', '', '', '', '', '', '', ''), // Modelo Poda
        formPodaValido: false, // Indica si el formulario de Poda es valido
        
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
    },

    getters: {
        formPodaValido: (state) => state.formPodaValido, // Devuelve la variable formPodaValido
        listaPodasStore: (state) => state.listaPodasStore,
        modeloPodaStore: (state) => state.modeloPodaStore,
    },
}