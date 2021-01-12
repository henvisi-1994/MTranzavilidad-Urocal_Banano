import Vehiculo from '@/models/ModeloVehiculo';

export default {
    namespaced: true,

    state: {
        vehiculo: new Vehiculo('', '', '', '', '', '', '', '', '', '', ''), // Modelo lote
        formVehiculoValido: false, // Indica si el formulario de lote es valido
    },

    actions: {

    },

    mutations: {
        // Coloca un nuevo lot
        setLot(state, nuevaPersona) {
            state.vehiculo = nuevaPersona
        },

        // Vacia el modelo Persona
        vaciarVehiculo(state) {
            state.vehiculo = new Vehiculo('', '', '', '', '', '', '', '', '', '', '')
        },

        cambiarEstadoFormVehiculoValido(state, nuevoEstado) {
            state.formVehiculoValido = nuevoEstado
        },
    },

    getters: {
        formVehiculoValido: (state) => state.formVehiculoValido, // Devuelve la variable formUsuarioValido
    },
}