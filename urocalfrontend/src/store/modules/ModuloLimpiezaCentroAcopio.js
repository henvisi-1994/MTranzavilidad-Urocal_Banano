//import LimpiezaCentroAcopio from '@/models/ModeloLimpiezaCentroAcopio';
import ModeloLimpiezaCentroAcopio from '../../models/ModeloLimpiezaCentroAcopio';

export default {
    namespaced: true,

    /*state: {
        listaCentroAcopioStore: [],
        listaLimpiezaCentroAcopioStore: [],
        limpiezacentroacopio: new LimpiezaCentroAcopio('', '', '', '', '', '', ''), // Modelo limpiezacentroacopio
        formLimpiezaCAValido: false, // Indica si el formulario de limpiezacentroacopio es valido
    },*/
    state: {
        listaCentroAcopioStore: [],
        listaLimpiezaCentroAcopioStore: [],
        modeloLimpiezaCentroAcopioStore: new ModeloLimpiezaCentroAcopio('', '', '', '', '', '', ''), // Modelo limpiezacentroacopio
        formLimpiezaCAValido: false, // Indica si el formulario de limpiezacentroacopio es valido
    },

    actions: {

    },

    mutations: {

        // SETTERS
        establecerModeloLimpiezaCentroAcopioStore(state, nuevaLimpiezaCentroAcopio) {
            state.modeloLimpiezaCentroAcopioStore = nuevaLimpiezaCentroAcopio;
        },

        establecerListaCentroAcopioStore(state, newState) {
            state.listaCentroAcopioStore = newState;
        },

        establecerListaLimpiezaCentroAcopioStore(state, newState) {
            state.listaLimpiezaCentroAcopioStore = newState;
        },


        // LIMPIADORES
        vaciarModeloLimpiezaCentroAcopioStore(state) {
            state.modeloLimpiezaCentroAcopioStore = new ModeloLimpiezaCentroAcopio('', '', '', '', '', '', '');
        },

        limpiarListaCentroAcopioStore(state) {
            state.listaCentroAcopioStore = [];
        },


        // VALIDATORS
        cambiarEstadoFormLimpiezaCentroAcopioValido(state, nuevoEstado) {
            state.formLimpiezaCentroAcopioValido = nuevoEstado
        },
    },


    getters: {
        formLimpiezaCentroAcopioValido: (state) => state.formLimpiezaCentroAcopioValido, // Devuelve la variable formLimpiezaCentroAcopioValido
        modeloLimpiezaCentroAcopioStore: (state) => state.modeloLimpiezaCentroAcopioStore,
        listaCentroAcopioStore: (state) => state.listaCentroAcopioStore,
        listaLimpiezaCentroAcopioStore: (state) => state.listaLimpiezaCentroAcopioStore,
    },

    /*mutations: {
        // Coloca un nuevo limpiezacentroacopio
        setLimpiezaCentroAcopio(state, nuevaLimpiezaCentroAcopio) {
            state.limpiezacentroacopio = nuevaLimpiezaCentroAcopio
        },

        // Vacia el modelo limpiezacentroacopio
        vaciarLimpiezaCentroAcopio(state) {
            state.limpiezacentroacopio = new LimpiezaCentroAcopio('', '', '', '', '', '', '')
        },

        cambiarEstadoFormLimpiezaCentroAcopioValido(state, nuevoEstado) {
            state.formLimpiezaCentroAcopioValido = nuevoEstado
        },
    },

    getters: {
        formLimpiezaCentroAcopioValido: (state) => state.formLimpiezaCentroAcopioValido, // Devuelve la variable formLimpiezaCentroAcopioValido
    },*/
}