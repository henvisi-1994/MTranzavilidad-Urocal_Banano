import RegistroEnvio from '@/models/ModeloRegistroEnvio';

export default {
    namespaced: true,

    state: {
        listaRegistroEnvioStore: [],
        listaTipoCacaoStore: [],
        listaSeleccionDetallesStore:[],
        modeloRegistroEnvioStore: new RegistroEnvio('', '', '', '', '',[]), // Modelo RegistroEnvio
        formRegistroEnvioValido: false, // Indica si el formulario de RegistroEnvio es valido
        editarRegistroEnvio: false,
        modeloRegistroEnvioDetalle: {
            codigo: "0",
            fecha: "18/04/2021",
            productor: "Ninguno",
            entregados: 0,
        }
    },

    mutations: {
        // Coloca un nuevo RegistroEnvio
        establecerModeloRegistroEnvioStore(state, nuevoRegistroEnvio) {
            state.modeloRegistroEnvioStore = nuevoRegistroEnvio
        },
        establecerRegdetalle(state, nuevoRegdetalle){
            state.modeloRegistroEnvioStore.regdetalle = nuevoRegdetalle
        },

        establecerListaRegistroEnvioStore(state, newState) {
            state.listaRegistroEnvioStore = newState;
        },
        establecerListaSeleccionDetallesStore(state, newState) {
            state.listaSeleccionDetallesStore = newState;
        },

        // Vacia el modelo RegistroEnvio
        vaciarModeloRegistroEnvioStore(state) {
            state.modeloRegistroEnvioStore = new RegistroEnvio('', '', '', '', '',[])
        },

        // Cambia  el estado del Formulario RegistroEnvio
        cambiarEstadoValidoFormRegistroEnvio(state, nuevoEstado) {
            state.formRegistroEnvioValido = nuevoEstado
        },
        establecerEditarRegistroEnvio(state, newState) {
            state.editarRegistroEnvio = newState;
        },

        nuevoRegistroEnvio(state, nuevoRegistroEnvio) {
            state.modeloRegistroEnvioStore = nuevoRegistroEnvio
        },

        establecerListaTipoCacaoStore(state, newState) {
            state.listaTipoCacaoStore = newState;
        },
        limpiarListaTipoCacaoStore(state) {
            state.listaTipoCacaoStore = [];
        },
        establecerModeloRegistroEnvioDetalle(state, nuevoRegistroEnvioDetalle) {
            state.modeloRegistroEnvioDetalle = nuevoRegistroEnvioDetalle
        },
    },

    getters: {
        formRegistroEnvioValido: (state) => state.formRegistroEnvioValido, // Devuelve la variable formRegistroEnvioValido
        listaRegistroEnvioStore: (state) => state.listaRegistroEnvioStore,
        modeloRegistroEnvioStore: (state) => state.modeloRegistroEnvioStore,
        editarRegistroEnvio: (state) => state.editarRegistroEnvio,
        listaTipoCacaoStore: (state) => state.listaTipoCacaoStore,
        modeloRegistroEnvioDetalle: (state) => state.modeloRegistroEnvioDetalle,
        listaSeleccionDetallesStore: (state) => state.listaSeleccionDetallesStore,
    },
}