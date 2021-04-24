import RegistroEnvio from '@/models/ModeloRegistroEnvio';

export default {
    namespaced: true,

    state: {
        listaRegistroEnvioStore: [],//Datos para mostrar en la tabla principal
        listaTipoCacaoStore: [],//Datos para mostrar lista de cacao
        listaSeleccionDetallesStore:[],//Datos para agregar al detalle envio
        listaDetalleEnvioStore:[],//Almacena el detalle Envio
        modeloRegistroEnvioStore: new RegistroEnvio('', '', '', '', '',[]), // Modelo RegistroEnvio
        formRegistroEnvioValido: false, 
        editarRegistroEnvio: false,
        modeloRegistroEnvioDetalle: {
            codigo: "0",
            fecha: "18/04/2021",
            productor: "Ninguno",
            entregados: 0,
        }
    },

    mutations: {
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
        establecerListaDetalleEnvioStore(state, newState) {
            state.listaDetalleEnvioStore = newState;
        },

        vaciarModeloRegistroEnvioStore(state) {
            state.modeloRegistroEnvioStore = new RegistroEnvio('', '', '', '', '',[])
        },

        cambiarEstadoValidoFormRegistroEnvio(state, nuevoEstado) {
            state.formRegistroEnvioValido = nuevoEstado
        },
        establecerEditarRegistroEnvio(state, newState) {
            state.editarRegistroEnvio = newState;
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
        listaDetalleEnvioStore: (state) => state.listaDetalleEnvioStore,
    },
}