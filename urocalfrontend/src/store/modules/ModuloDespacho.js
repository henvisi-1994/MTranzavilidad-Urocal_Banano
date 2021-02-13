import Despacho from '../../models/ModeloDespacho';

export default {
    namespaced: true,

    state: {
        despacho: new Despacho('', '', '', '', '', false, false), // Modelo despacho
        formDespachoValido: false, // Indica si el formulario de despacho es valido
        listaDespacho: [], // Lista de Controles de Despacho
        bloquearCamposFormDespacho: false, // Determina si se bloquean los campos del formulario
    },

    actions: {

    },

    mutations: {
        // Coloca un nuevo despacho
        agregarDespacho(state, nuevoDespacho) {
            state.despacho = nuevoDespacho
        },

        // Vacia el modelo despacho
        vaciarDespacho(state) {
            state.despacho = new Despacho('', '', '', '', '', false, false)
        },

        cambiarEstadoFormDespachoValido(state, nuevoEstado) {
            state.formDespachoValido = nuevoEstado
        },

        // listaDespacho
        eliminarDespachoLista(state, despachoID) {
            let indice = state.listaDespacho.indexOf(despachoID); // Obtiene la posicion del elemento
            state.listaDespacho.splice(indice, 1); // Elimina el elemento
        },

        asignarListaDespacho(state, nuevaListaDespacho) {
            state.listaDespacho = nuevaListaDespacho;
        },

        // Cambia el estado de la variable bloquearCamposFormDespacho
        cambiarBloquearCamposFormDespacho(state, nuevoEstado) {
            state.bloquearCamposFormDespacho = nuevoEstado
        },

    },

    getters: {
        formDespachoValido: (state) => state.formDespachoValido,                   // Devuelve la variable formDespachoValido
        despacho: (state) => state.despacho,                                       // Devuelve el modelo despacho
        bloquearCamposFormDespacho: (state) => state.bloquearCamposFormDespacho,   // Devuelve bloquearCamposFormDespacho
    },
}