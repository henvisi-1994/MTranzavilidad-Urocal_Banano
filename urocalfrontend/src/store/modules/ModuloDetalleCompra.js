import DetalleCompra from '@/models/ModeloDetalleCompra';

export default {
    namespaced: true,

    state: {
        detCompra: new DetalleCompra('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''), // Modelo DetalleCompra
        formDetalleCompraValido: false, // Indica si el formulario de DetalleCompra es valido
        listaDetalleCompra: [], // Lista detalle compra
        listaCosechaSinDetalle: [], // listaCosechaSinDetalle
        bloquearCamposFormDetalleCompra: false, // Determina si se bloquean los campos del formulario
        fermentacion: [], // Almacena el tipo de fermentacion
    },

    mutations: {
        // detCompra
        nuevoDetalleCompra(state, nuevoDetalleCompra) {
            state.detCompra = nuevoDetalleCompra
        },

        vaciarDetalleCompra(state) {
            state.detCompra = new DetalleCompra('', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '')
        },

        // Cambia  el estado del Formulario DetalleCompra
        cambiarEstadoFormDetalleCompraValido(state, nuevoEstado) {
            state.formDetalleCompraValido = nuevoEstado
        },

        // listaDetalleCompra
        asignarListaDetalleCompra(state, nuevaListaDetalleCompra) {
            state.listaDetalleCompra = nuevaListaDetalleCompra;
        },

        agregarListaDetalleCompra(state, detalleCompra) {
            state.listaDetalleCompra.push(detalleCompra);
        },

        vaciarListaDetalleCompra(state) {
            state.listaDetalleCompra = [];
        },

        eliminarListaDetalleCompra(state, detalleCompraID) {
            let indice = state.listaDetalleCompra.findIndex(detalle => detalle.detallecompraid === detalleCompraID); // Obtiene la posicion del elemento
            console.log(indice);
            state.listaDetalleCompra.splice(indice, 1); // Elimina el elemento
        },

        eliminarListaDetalleCompraCache(state, idAuxiliar) {
            let indice = state.listaDetalleCompra.findIndex(detalle => detalle.idAuxiliar === idAuxiliar); // Obtiene la posicion del elemento
            state.listaDetalleCompra.splice(indice, 1); // Elimina el elemento
        },

        // listaCosechaSinDetalle
        asignarListaCosechaSinDetalle(state, nuevaListaCosechaSinDetalle) {
            state.listaCosechaSinDetalle = nuevaListaCosechaSinDetalle;
        },

        eliminarListaCosechaSinDetalle(state, detallecompraid) {            
            let indice = state.listaCosechaSinDetalle.findIndex(cosecha => cosecha.cosechaid === detallecompraid); // Obtiene la posicion del elemento
            console.log(indice);
            state.listaCosechaSinDetalle.splice(indice, 1); // Elimina el elemento
        },

        // Cambia el estado de la variable bloquearCamposFormDetalleCompra
        cambiarBloquearCamposFormDetalleCompra(state, nuevoEstado) {
            state.bloquearCamposFormDetalleCompra = nuevoEstado
        },

        // fermentacion
        asignarFermentacion(state, nuevoFermentacion) {
            state.fermentacion = nuevoFermentacion
        },
    },

    getters: {
        formDetalleCompraValido: (state) => state.formDetalleCompraValido, // Devuelve la variable formDetalleCompraValido
        bloquearCamposFormDetalleCompra: (state) => state.bloquearCamposFormDetalleCompra,    // Devuelve bloquearCamposFormDetalleCompra
        listaDetalleCompra: (state) => state.listaDetalleCompra,    // Devuelve listaDetalleCompra
        listaCosechaSinDetalle: (state) => state.listaCosechaSinDetalle,    // Devuelve listaCosechaSinDetalle
        fermentacion: (state) => state.fermentacion,    // Devuelve fermentacion
    },
}