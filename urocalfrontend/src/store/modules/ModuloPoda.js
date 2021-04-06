import Poda from '@/models/ModeloPoda';

export default {
    namespaced: true,

    state: {
        listaPodasStore: [],
        listaCultivoStore: [],
        listaloteStore: [],
        modeloPodaStore: new Poda('', '', '', '', '', '', '', ''), // Modelo Poda
        formPodaValido: false, // Indica si el formulario de Poda es valido
         editarPoda: false,
         listaTipoStore: [
            {
              tipoid: 1,
              podatipo: "Poda Formación",
            },
            {
              tipoid: 2,
              podatipo: "Poda Mantenimiento",
            },
            {
              tipoid: 3,
              podatipo: "Poda Fitosanitaria",
            },
            {
              tipoid: 4,
              podatipo: "Poda de Descope",
            },
          ],
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
        establecerlistaloteStore(state, newState) {
            state.listaloteStore = newState;
        },
        nuevoPoda(state, nuevoPoda) {
            state.modeloPodaStore = nuevoPoda
        },
        establecerListaCultivoStore(state, newState) {
            state.listaCultivoStore = newState;
        },
        establecerlistaTipoStore(state, newState) {
            state.listaTipoStore = newState;
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
        listaloteStore: (state) => state.listaloteStore,
        listaTipoStore:(state) => state.listaTipoStore,
    },
}