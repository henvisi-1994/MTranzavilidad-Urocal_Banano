import DetalleDespacho from '../../models/ModeloDetalleDespacho';

export default {
    namespaced: true,

    state: {
        detalledespacho: new DetalleDespacho('', '', '', '', '', ''), // Modelo detalledespacho
        formDetalleDespachoValido: false, // Indica si el formulario de detalledespacho es valido
        listaDetalleDespacho: [], // Lista de Controles de DetalleDespacho
        bloquearCamposFormDetalleDespacho: false, // Determina si se bloquean los campos del formulario
    },

    actions: {

    },

    mutations: {
        // Coloca un nuevo detalledespacho
        agregarDetalleDespacho(state, nuevoDetalleDespacho) {
            state.detalledespacho = nuevoDetalleDespacho
        },

        // Vacia el modelo detalledespacho
        vaciarDetalleDespacho(state) {
            state.detalledespacho = new DetalleDespacho('', '', '', '', '', '')
        },

        cambiarEstadoFormDetalleDespachoValido(state, nuevoEstado) {
            state.formDetalleDespachoValido = nuevoEstado
        },

        // listaDetalleDespacho
        eliminarDetalleDespachoLista(state, detalledespachoID) {
            let indice = state.listaDetalleDespacho.indexOf(detalledespachoID); // Obtiene la posicion del elemento
            state.listaDetalleDespacho.splice(indice, 1); // Elimina el elemento
        },

        asignarListaDetalleDespacho(state, nuevaListaDetalleDespacho) {
            state.listaDetalleDespacho = nuevaListaDetalleDespacho;
        },

        // Cambia el estado de la variable bloquearCamposFormDetalleDespacho
        cambiarBloquearCamposFormDetalleDespacho(state, nuevoEstado) {
            state.bloquearCamposFormDetalleDespacho = nuevoEstado
        },
    },

    getters: {
        formDetalleDespachoValido: (state) => state.formDetalleDespachoValido,                   // Devuelve la variable formDetalleDespachoValido
        detalledespacho: (state) => state.detalledespacho,                                       // Devuelve el modelo detalledespacho
        bloquearCamposFormDetalleDespacho: (state) => state.bloquearCamposFormDetalleDespacho,   // Devuelve bloquearCamposFormDetalleDespacho
    },
}