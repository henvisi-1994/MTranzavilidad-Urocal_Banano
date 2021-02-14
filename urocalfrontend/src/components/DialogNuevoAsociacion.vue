<template>
  <v-dialog
    v-model="dialogNuevoAsociacion"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
    persistent
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="primary--text">
        <h5>
          Registrar nueva Asociacion
        </h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="primary--text" @click="cerrarDialogAsociacion()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar Asociacion -->
          <FormAsociacion ref="componentFormAsociacion"></FormAsociacion>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Asociacion -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px"
          color="primary" large elevation="0"
          @click="guardarAsociacion()"
          >Registrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormAsociacion from "@/components/FormAsociacion";
import ServicioAsociacion from '../services/ServicioAsociacion';


export default {
  name: "DialogNuevoAsociacion",

  components: {
    FormAsociacion
  },

  data() {
    return {
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoAsociacion
    dialogNuevoAsociacion: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoAsociacion"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoAsociacion", v);
      },
    },

    modeloAsociacionStore: {
      get() {
        return this.$store.getters["moduloAsociacion/asociacion"];
      },
      set(v) {
        return this.$store.commit("moduloAsociacion/nuevoAsociacion", v);
      },
    },

    listaAsociacionStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloAsociacion/listaAsociacionStore"]));
      },
      set(v) {
        return this.$store.commit("moduloAsociacion/establecerListaAsociacionStore", v);
      },
    },

    // Obtiene es estado de la variable formAsociacion y el modelo Asociacion
    ...mapState("moduloAsociacion", ["formAsociacionValido", "asociacion"]),
  },

  methods: {

    // #  MANIPULACIÓN DE DATOS  #
    async guardarAsociacion() { 
      try {
          let respuesta = await ServicioAsociacion.agregarAsociacion(this.modeloAsociacionStore);
          this.$toast.success(respuesta.data.message);
          this.cargarListaAsociacion();
          this.cerrarDialogAsociacion();
        } catch (error) {
          this.$toast.error(error.response.data.message);
      } 
    },

    // #  MANIPULACIÓN DE DATOS  #
    async cargarListaAsociacion () { 
      let listaAsociacion = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioAsociacion.obtenerTodosAsociacion();  // Obtener respuesta de backend
      let datosAsociacion = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosAsociacion.forEach((Asociacion) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaAsociacion.push(Asociacion);
      });
      this.listaAsociacionStore = listaAsociacion;
    },

    ...mapMutations("moduloAsociacion", ["establecerListaAsociacionStore"]), 
    // Vacia el modelo Asociacion
    ...mapMutations("moduloAsociacion", ["vaciarAsociacion"]),

    cerrarDialogAsociacion() {
      this.dialogNuevoAsociacion = !this.dialogNuevoAsociacion; // Cierra el dialogNuevoAsociacion
      this.$refs.componentFormAsociacion.$refs.formAsociacion.resetValidation(); // Reinicia las validaciones del formAsociacion
      this.vaciarAsociacion(); // Vacia el modelo Asociacion
    },
  },
};
</script>
