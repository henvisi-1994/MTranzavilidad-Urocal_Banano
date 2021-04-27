import Vehiculo from '@/models/ModeloVehiculo';

export default {
    namespaced: true,

    state: {
        itemsMarcaStore: [{nombre:'Chevrolet'},{nombre:'Mazda'}],
        listavehiculoStore:[],
        vehiculo: new Vehiculo(0, '', '', '', false, false, 0, 0), // Modelo lote
        formVehiculoValido: false, // Indica si el formulario de lote es valido
    },

    actions: {

    },

    mutations: {
        // Coloca un nuevo lot
        setLot(state, nuevaPersona) {
            state.vehiculo = nuevaPersona
        },
        establecerlistavehiculoStore(state,newstate){
            state.listavehiculoStore=newstate;
        },
        establecerlistamarcaStore(state,newstate){
            state.itemsMarcaStore=newstate;
        },
        addListaVehiculo (state, vehiculo) {
            // mutate state
            state.listavehiculoStore.push(vehiculo)
          },
          vaciarLista(state, newState){
            state.listavehiculoStore.length = 0;
        },

        // Vacia el modelo Persona
        vaciarVehiculo(state) {
            state.vehiculo = new Vehiculo(0, '', '', '', false, false, 0, 0)
        },

        cambiarEstadoFormVehiculoValido(state, nuevoEstado) {
            state.formVehiculoValido = nuevoEstado
        },
                // Coloca un nuevo LimpiezaHerramienta
        nuevoVehiculo(state, nuevoVehiculo) {
                    state.vehiculo = nuevoVehiculo
                },
                // C
    },

    getters: {
        formVehiculoValido: (state) => state.formVehiculoValido, // Devuelve la variable formUsuarioValido
        vehiculo: (state) => state.vehiculo,
        itemsMarcaStore: (state) => state.itemsMarcaStore,
        listavehiculoStore:(state)=>state.listavehiculoStore,

    },
}