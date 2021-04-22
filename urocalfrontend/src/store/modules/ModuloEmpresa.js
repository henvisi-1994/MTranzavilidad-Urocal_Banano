import ModeloEmpresa from '../../models/ModeloEmpresa';

export default {
    namespaced: true,

    state: {
        listaEmpresaStore: [],
        modeloEmpresaStore: new ModeloEmpresa('', '', '', '', '', '', ''), 
        formEmpresaValido: false, // Indica si el formulario de lote es valido
        bloquearEmpresa: false,
    },

    actions: {
 
    },

    mutations: {

        // SETTERS
        establecerModeloEmpresaStore(state, nuevaPersona) {
            state.modeloEmpresaStore = nuevaPersona;
        },
        establecerListaEmpresaStore(state, newState) {
            state.listaEmpresaStore = newState;
        },


        // CLEANERS
        vaciarModeloEmpresa(state) {
            state.modeloEmpresaStore = new ModeloEmpresa('', '', '', '', '', '', '')
        },

        // VALIDATORS
        cambiarEstadoFormEmpresaValido(state, nuevoEstado) {
            state.formEmpresaValido = nuevoEstado
        },
        cambiarEstadoBloquearEmpresa(state, nuevoEstado) {
            state.bloquearEmpresa = nuevoEstado
        }
    },

    getters: {
        formEmpresaValido: (state) => state.formEmpresaValido, // Devuelve la variable formEgresoValido
        modeloEmpresaStore: (state) => state.modeloEmpresaStore,
        listaEmpresaStore: (state) => state.listaEmpresaStore,
        bloquearEmpresa:(state) => state.bloquearEmpresa,
    },
}