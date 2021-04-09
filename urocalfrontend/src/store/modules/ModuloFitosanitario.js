import Fitosanitario from '@/models/ModeloFitosanitario';

export default {
    namespaced: true,

    state: {
        listaFitosanitariosStore: [],
        listaLoteStore:[],
        ListaCultivoStore:[],
        modeloFitosanitarioStore: new Fitosanitario('', '', '', '', '', '', '', '', '', '', '', '', '', '', ''), // Modelo Fitosanitario
        formFitosanitarioValido: false, // Indica si el formulario de Fitosanitario es valido
    },

    mutations: {
        // Coloca un nuevo Fitosanitario
        establecerModeloFitosanitariosStore(state, nuevoFitosanitario) {
            state.modeloFitosanitarioStore = nuevoFitosanitario
        },

        establecerListaFitosanitariosStore(state, newState) {
            state.listaFertilizantesStore = newState;
        },
        updateListaFitosanitariosStore(state, newState) {
            state.listaFitosanitariosStore.push(newState)
        },
        establecerListaLoteStore(state, newState) {
            state.listaLoteStore = newState;
        },
        establecerListaCultivoStore(state, newState) {
            state.ListaCultivoStore = newState;
        },
        // Vacia el modelo Fitosanitario
        vaciarModeloFitosanitarioStore(state) {
            state.modeloFitosanitarioStore = new Fitosanitario('', '', '', '', '', '', '', '', '', '', '', '', '', '', '')
        },
        vaciarLista(state, newState) {
            state.listaFitosanitariosStore.length = 0;
        },

        // Cambia  el estado del Formulario Fitosanitario
        cambiarEstadoValidoFormFitosanitario(state, nuevoEstado) {
            state.formFitosanitarioValido = nuevoEstado
        },
    },

    getters: {
        formFitosanitarioValido: (state) => state.formFitosanitarioValido, // Devuelve la variable formFitosanitarioValido
        listaFitosanitariosStore: (state) => state.listaFitosanitariosStore,
        listaLoteStore: (state) => state.listaLoteStore,
        listaCultivoStore: (state) => state.ListaCultivoStore,
        modeloFitosanitarioStore: (state) => state.modeloFitosanitarioStore,
    },
}