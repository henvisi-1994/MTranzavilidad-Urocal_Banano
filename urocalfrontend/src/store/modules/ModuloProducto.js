
export default {
    namespaced: true,

    state: {
        listaIDsProductos: [], // Array que almacena IDs de productos
        // producto: new Producto['','','','','','']
    },

    actions: {

    },

    mutations: {
        // Agrega los IDs de productos seleccionados a la lista
        agregarListaIDsProductos(state, listaIDsProductos) {
            state.listaIDsProductos = listaIDsProductos;
        },

        // Elimina todos los elementos de la lista de IDs de productos
        vaciarlistaIDsProductos(state) {
            state.listaIDsProductos = [];
        }
    },

    getters: {
        listaIDsProductos: (state) => state.listaIDsProductos, // Devuelve la listaIDsProductos
        
    },
}