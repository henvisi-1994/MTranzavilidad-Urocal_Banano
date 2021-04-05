import GuiaRemision from '@/models/ModeloGuiaRemision';

export default {
    namespaced: true,

    state: {
        listaGuiaRemisionStore: [],
        modeloGuiaRemisionStore: new GuiaRemision('', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0,[]),
        formGuiaRemisionValido: false,
        editarGuiaRemision: false
    },

    mutations: {
        // Coloca un nuevo GuiaRemision
        establecerModeloGuiaRemisionStore(state, nuevoGuiaRemision) {
            state.modeloGuiaRemisionStore = nuevoGuiaRemision
        },

        establecerListaGuiaRemisionStore(state, newState) {
            state.listaGuiaRemisionStore = newState;
        },

        establecerEditarGuiaRemision(state, newState) {
            state.editarGuiaRemision = newState;
        },

        updateListaGuiaRemision(state, newState) {
            state.listaGuiaRemisionStore.push(newState)
          },

        vaciarLista(state, newState){
            state.listaGuiaRemisionStore.length = 0;
        },

        // Vacia el modelo GuiaRemision
        vaciarGuiaRemision(state) {
            state.modeloGuiaRemisionStore = new GuiaRemision('', '', '', '', '', '', '', '', '', '', '', '', '', '', 0, 0, 0,[]);
        },

        // Cambia  el estado del Formulario GuiaRemision
        cambiarEstadoValidoFormGuiaRemision(state, nuevoEstado) {
            state.formGuiaRemisionValido = nuevoEstado
        },
    },

    getters: {
        formGuiaRemisionValido: (state) => state.formGuiaRemisionValido,
        listaGuiaRemisionStore: (state) => state.listaGuiaRemisionStore,
        editarGuiaRemision: (state) => state.editarGuiaRemision,
        modeloGuiaRemisionStore: (state) => state.modeloGuiaRemisionStore,
    },
}