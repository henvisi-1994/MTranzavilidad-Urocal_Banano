import Finca from '@/models/ModeloFinca';

export default {
    namespaced: true,

    state: {
        listaFincaStore: [],
        listaAsociacionStore: [],
        listaSitioStore: [],
        listaPropietarioStore: [],
        detalleCertificaciones: [],
        finca: new Finca('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',[]), // Modelo Finca
        formFincaValido: false, // Indica si el formulario de Finca es valido
    },

    mutations: {
        // Coloca un nuevo Finca
        nuevoFinca(state, nuevoFinca) {
            state.finca = nuevoFinca
        },

        // Vacia el modelo Finca
        vaciarFinca(state) {
            state.finca = new Finca('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '',[])
        },

        // Cambia  el estado del Formulario Finca
        cambiarEstadoValidoFormFinca(state, nuevoEstado) {
            state.formFincaValido = nuevoEstado
        },

        establecerListaSitioStore(state, newState) {
            state.listaSitioStore = newState;
        },

        limpiarListaSitioStore(state) {
            state.listaSitioStore = [];
        },

        establecerListaAsociacionStore(state, newState) {
            state.listaAsociacionStore = newState;
        },
        establecerDetalleCertificaciones(state, newState) {
            state.detalleCertificaciones = newState;
        },

        limpiarListaAsociacionStore(state) {
            state.listaAsociacionStore = [];
        },

        establecerListaPropietarioStore(state, newState) {
            state.listaPropietarioStore = newState;
        },

        limpiarListaPropietarioStore(state) {
            state.listaPropietarioStore = [];
        },

        establecerListaFincaStore(state, newState) {
            state.listaFincaStore = newState;
        },
    },

    getters: {
        formFincaValido: (state) => state.formFincaValido, // Devuelve la variable validarFormularioFinca
        finca: (state) => state.finca,
        listaFincaStore: (state) => state.listaFincaStore,
        listaSitioStore: (state) => state.listaSitioStore,
        listaAsociacionStore: (state) => state.listaAsociacionStore,
        listaPropietarioStore: (state) => state.listaPropietarioStore,
        detalleCertificaciones:(state) => state.detalleCertificaciones,
    },
}