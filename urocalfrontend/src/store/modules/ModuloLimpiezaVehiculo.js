import LimpiezaVehiculo from '@/models/ModeloLimpiezaVehiculo';

export default {
    namespaced: true,

    state: {
        listavehiculoStore:[],
        listaLimpiezaVe: [],
        limpieza_vehiculo: new LimpiezaVehiculo(0, '', '', false, false, false, false, 0, 0), // Modelo lote
        
        formLimpiezaVehiculoValido: false, // Indica si el formulario de lote es valido
    },

    actions: {

    },

    mutations: {
        // Coloca un nuevo LimpiezaHerramienta
        nuevoLimpiezaVehiculo(state, nuevoLimpiezaVehiculo) {
            state.limpieza_vehiculo = nuevoLimpiezaVehiculo
        },
        nuevoListaVehiculoStore(state, nuevoListaVehiculoStore) {
            state.listavehiculoStore = nuevoListaVehiculoStore
        },

        // Coloca un nuevo lot
        setLot(state, nuevaPersona) {
            state.limpieza_vehiculo = nuevaPersona
        },

        // Vacia el modelo Persona
        vaciarLimpiezaVehiculo(state) {
            state.limpieza_vehiculo= new LimpiezaVehiculo(0, '', '', false, false, false, false, 0,0) // Modelo lote
        },
        vaciarLista(state, newState){
            state.listaLimpiezaVe.length = 0;
        },

        cambiarEstadoFormLimpiezaVehiculoValido(state, nuevoEstado) {
            state.formLimpiezaVehiculoValido = nuevoEstado
        },
        establecerListaLimpiezaVehiculoStore(state, newState) {
            state.listaLimpiezaVe = newState;
        },
        addListaLimpiezaVe (state, limpiezaVehiculo) {
            // mutate state
            state.listaLimpiezaVe.push(limpiezaVehiculo)
          },
    },

    getters: {
        formLimpiezaVehiculoValido: (state) => state.formLimpiezaVehiculoValido, // Devuelve la variable formUsuarioValido
        limpieza_vehiculo: (state) => state.limpieza_vehiculo,
        listavehiculoStore:(state)=> state.listavehiculoStore,
        listaLimpiezaVehiculoStore: (state) => state.listaLimpiezaVe,
        clusterlist: (state) => state.clusterlist
    },
}