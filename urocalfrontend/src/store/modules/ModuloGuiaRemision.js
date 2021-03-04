import GuiaRemision from '@/models/ModeloGuiaRemision';

export default {
    namespaced: true,

    state: {
        listaGuiaRemisionStore: [],
        modeloGuiaRemisionStore: new GuiaRemision('', '', '', '', '', '', '', '', '', {nombre: '', rucci: ''}, '', '', '', '', '', '', '', []),
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

        // Vacia el modelo GuiaRemision
        vaciarGuiaRemision(state) {
            state.modeloGuiaRemisionStore = new GuiaRemision('', '', '', '', '', '', '', '', '', {nombre: '', rucci: ''}, '', '', '', '', '', '', '', [])
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
    },
}