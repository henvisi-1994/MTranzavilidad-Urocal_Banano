import ModeloEgresoInsumo from '../../models/ModeloEgresoInsumo';

export default {
    namespaced: true,

    state: {
        listaInsumoStore: [],
        listaFincaStore: [],
        listaEgresoInsumoStore: [],
        modeloEgresoInsumoStore: new ModeloEgresoInsumo('', '', '', '', '', '', ''), 
        formEgresoInsumoValido: false, // Indica si el formulario de lote es valido
    },

    actions: {
 
    },

    mutations: {

        // SETTERS
        establecerModeloEgresoInsumoStore(state, nuevaPersona) {
            state.modeloEgresoInsumoStore = nuevaPersona;
        },

        establecerListaInsumoStore(state, newState) {
            state.listaInsumoStore = newState;
        },
        establecerListaFincaStore(state, newState) {
            state.listaFincaStore = newState;
        },
        establecerListaEgresoInsumoStore(state, newState) {
            state.listaEgresoInsumoStore = newState;
        },


        // CLEANERS
        vaciarModeloEgresoInsumo(state) {
            state.modeloEgresoInsumoStore = new ModeloEgresoInsumo('', '', '', '', '', '', '')
        },

        limpiarListaInsumoStore(state) {
            state.listaInsumoStore = [];
        },
        limpiarListaFincaStore(state) {
            state.listaFincaStore = [];
        },

        // VALIDATORS
        cambiarEstadoFormEgresoInsumoValido(state, nuevoEstado) {
            state.formEgresoInsumoValido = nuevoEstado
        },
    },

    getters: {
        formEgresoInsumoValido: (state) => state.formEgresoInsumoValido, // Devuelve la variable formEgresoValido
        modeloEgresoInsumoStore: (state) => state.modeloEgresoInsumoStore,
        listaInsumoStore: (state) => state.listaInsumoStore,
        listaFincaStore: (state) => state.listaFincaStore,
        listaEgresoInsumoStore: (state) => state.listaEgresoInsumoStore,
    },
}