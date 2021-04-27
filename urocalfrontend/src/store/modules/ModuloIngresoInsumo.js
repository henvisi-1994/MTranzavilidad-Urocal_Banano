import ModeloIngresoInsumo from '../../models/ModeloIngresoInsumo';

export default {
    namespaced: true,
    state: {
        listaCentroAcopios: [],
        listaFincaStore: [],
        listaIngresoInsumoStore: [],
        modeloIngresoInsumoStore: new ModeloIngresoInsumo('', '', '', '', '', '', '', '', '', ''), 
        formIngresoInsumoValido: false, // Indica si el formulario de lote es valido
    },

    actions: {
 
    },

    mutations: {

        // SETTERS
        establecerModeloIngresoInsumoStore(state, nuevaPersona) {
            state.modeloIngresoInsumoStore = nuevaPersona;
        },

        establecerListaCentroAcopios(state, newState) {
            state.listaCentroAcopios = newState;
        },
        establecerListaFincaStore(state, newState) {
            state.listaFincaStore = newState;
        },
        establecerListaIngresoInsumoStore(state, newState) {
            state.listaIngresoInsumoStore = newState;
        },


        // CLEANERS
        vaciarModeloIngresoInsumo(state) {
            state.modeloIngresoInsumoStore = new ModeloIngresoInsumo('', '', '', '', '', '', '', '', '', '')
        },

        limpiarListaCentroAcopios(state) {
            state.listaCentroAcopios = [];
        },
        limpiarListaFincaStore(state) {
            state.listaFincaStore = [];
        },

        // VALIDATORS
        cambiarEstadoFormIngresoInsumoValido(state, nuevoEstado) {
            state.formIngresoInsumoValido = nuevoEstado
        },
    },

    getters: {
        formIngresoInsumoValido: (state) => state.formIngresoInsumoValido, // Devuelve la variable formIngresoValido
        modeloIngresoInsumoStore: (state) => state.modeloIngresoInsumoStore,
        listaCentroAcopios: (state) => state.listaCentroAcopios,
        listaFincaStore: (state) => state.listaFincaStore,
        listaIngresoInsumoStore: (state) => state.listaIngresoInsumoStore,
    },
}
