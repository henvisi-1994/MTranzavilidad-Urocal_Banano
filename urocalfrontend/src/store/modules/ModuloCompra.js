import Compra from '@/models/ModeloCompra';

export default {
    namespaced: true,

    state: {
        compra: new Compra('','','','','','','','','',0,'','','',''), // Modelo Compra
        formCompraValidoCabecera: false, // Indica si el formulario de CompraCabecera es valido
        formCompraValidoPie: false, // Indica si el formulario de CompraPie es valido
        listaCompra: [], // Lista de compra
        bloquearCamposFormCompra: false, // Determina si se bloquean los campos del formulario
        estaActualizandoCompra: false, // Indica si estaActualizandoCompra
    },

    mutations: {
        // compra
        nuevoCompra(state, nuevoCompra) {
            state.compra = nuevoCompra
        },

        vaciarCompra(state) {
            state.compra = new Compra('','','','','','','','','',0,'','','','')
        },

        // formCompraValido
        cambiarEstadoValidoFormCompraCabecera(state, nuevoEstado) {
            state.formCompraValidoCabecera = nuevoEstado
        },

        cambiarEstadoValidoFormCompraPie(state, nuevoEstado) {
            state.formCompraValidoPie = nuevoEstado
        },

        // listaCompra
        asignarListaCompra(state, nuevaListaCompra) {
            state.listaCompra = nuevaListaCompra;
        },

        // Cambia el estado de la variable bloquearCamposFormCompra
        cambiarBloquearCamposFormCompra(state, nuevoEstado) {
            state.bloquearCamposFormCompra = nuevoEstado
        },

        // estaActualizandoCompra
        asignarEstaActualizandoCompra(state, nuevoEstado) {
            state.estaActualizandoCompra = nuevoEstado;
        },
    },

    getters: {
        formCompraValidoCabecera: (state) => state.formCompraValidoCabecera, // Devuelve la variable formCompraValidoCabecera
        formCompraValidoPie: (state) => state.formCompraValidoPie, // Devuelve la variable formCompraValidoPie
        bloquearCamposFormCompra: (state) => state.bloquearCamposFormCompra,    // Devuelve bloquearCamposFormCompra
        listaCompra: (state) => state.listaCompra,    // Devuelve listaCompra
        estaActualizandoCompra: (state) => state.estaActualizandoCompra,    // Devuelve estaActualizandoCompra
    },
}