import LimpiezaVehiculo from '@/models/ModeloLimpiezaVehiculo';

export default {
    namespaced: true,

    state: {
        limpieza_vehiculo: new LimpiezaVehiculo('', '', '', '', '', '', '', '', '', '', ''), // Modelo lote
        formLimpiezaVehiculoValido: false, // Indica si el formulario de lote es valido
    },

    actions: {

    },

    mutations: {
        // Coloca un nuevo lot
        setLot(state, nuevaPersona) {
            state.limpieza_vehiculo = nuevaPersona
        },

        // Vacia el modelo Persona
        vaciarLimpiezaVehiculo(state) {
            state.limpieza_vehiculo = new LimpiezaVehiculo('', '', '', '', '', '', '', '', '', '', '')
        },

        cambiarEstadoFormLimpiezaVehiculoValido(state, nuevoEstado) {
            state.formLimpiezaVehiculoValido = nuevoEstado
        },
    },

    getters: {
        formLimpiezaVehiculoValido: (state) => state.formLimpiezaVehiculoValido, // Devuelve la variable formUsuarioValido
    },
}