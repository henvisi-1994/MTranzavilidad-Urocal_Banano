<template>
  <v-dialog
    v-model="dialogNuevoMonitoreoRoedorCentroAcopio"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
    persistent
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="white primary--text">
        <h5>
          Registrar nuevo monitoreo roedor
        </h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="primary--text" @click="cerrarNuevoMonitoreoRoedorCentroAcopio()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar MonitoreoRoedorCentroAcopio -->
          <FormMonitoreoRoedorCentroAcopio ref="componentFormMonitoreoRoedorCentroAcopio"></FormMonitoreoRoedorCentroAcopio>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo MonitoreoRoedorCentroAcopio -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          @click="guardarMonitoreoRoedorFinca()"
          >Registrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormMonitoreoRoedorCentroAcopio from "@/components/FormMonitoreoRoedorCentroAcopio";
import ServicioMonitoreoRoedorCentroAcopio from '../services/ServicioMonitoreoRoedorCentroAcopio';

export default {
  name: "DialogNuevoMonitoreoRoedorCentroAcopio",

  components: {
    FormMonitoreoRoedorCentroAcopio
  },

  data() {
    return {
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable DialogNuevoMonitoreoRoedorCentroAcopio
    dialogNuevoMonitoreoRoedorCentroAcopio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoMonitoreoRoedorCentroAcopio"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoMonitoreoRoedorCentroAcopio", v);
      },
    },

    listaMonitoreoRoedorCentroAcopioStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloMonitoreoRoedorCentroAcopio/listaMonitoreoRoedorCentroAcopioStore"]));
      },
      set(v) {
        return this.$store.commit("moduloMonitoreoRoedorCentroAcopio/establecerListaMonitoreoRoedorCentroAcopioStore", v);
      },
    },

    modeloMonitoreoRoedorCentroAcopioStore: {
      get() {
        return this.$store.getters["moduloMonitoreoRoedorCentroAcopio/monitoreoRoedorCentroAcopio"];
      },
      set(v) {
        return this.$store.commit("moduloMonitoreoRoedorCentroAcopio/nuevoMonitoreoRoedorCentroAcopio", v);
      },
    },

    // Obtiene es estado de la variable validFormMonitoreoRoedorCentroAcopio y el modelo MonitoreoRoedorCentroAcopio
    ...mapState("moduloMonitoreoRoedorCentroAcopio", ["formMonitoreoRoedorCentroAcopioValido", "monitoreoRoedorCentroAcopio"]),
  },

  methods: {

    // #  MANIPULACIÓN DE DATOS  #
    async guardarMonitoreoRoedorFinca() { 
      try {
          let respuesta = await ServicioMonitoreoRoedorCentroAcopio.agregarMonitoreoRoedorCentroAcopio(this.modeloMonitoreoRoedorCentroAcopioStore);
          this.$toast.success(respuesta.data.message);
          this.cargarListaMonitoreoRoedorCentroAcopio();
          this.cerrarNuevoMonitoreoRoedorCentroAcopio();
        } catch (error) {
          this.$toast.error(error.response.data.message);
      }
    },

    async cargarListaMonitoreoRoedorCentroAcopio() { 
      let listaMonitoreoRoedorCentroAcopio = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioMonitoreoRoedorCentroAcopio.obtenerTodosMonitoreoRoedorCentroAcopio();  // Obtener respuesta de backend
      let datosMonitoreoRoedorCentroAcopio = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosMonitoreoRoedorCentroAcopio.forEach((CentroAcopio) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaMonitoreoRoedorCentroAcopio.push(CentroAcopio);
      });
      this.listaMonitoreoRoedorCentroAcopioStore = listaMonitoreoRoedorCentroAcopio;
    },
    
    ...mapMutations("moduloMonitoreoRoedorCentroAcopio", ["establecerListaMonitoreoRoedorCentroAcopioStore"]), 
    // Vacia el modelo MonitoreoRoedorCentroAcopio
    ...mapMutations("moduloMonitoreoRoedorCentroAcopio", ["vaciarMonitoreoRoedorCentroAcopio"]),

    cerrarNuevoMonitoreoRoedorCentroAcopio() {
      this.dialogNuevoMonitoreoRoedorCentroAcopio = !this.dialogNuevoMonitoreoRoedorCentroAcopio; // Cierra el dialogNuevoMonitoreoRoedorCentroAcopio
      this.$refs.componentFormMonitoreoRoedorCentroAcopio.$refs.formMonitoreoRoedorCentroAcopio.resetValidation(); // Reinicia las validaciones del formMonitoreoRoedorCentroAcopio
      this.vaciarMonitoreoRoedorCentroAcopio(); // Vacia el modelo MonitoreoRoedorCentroAcopio
    },
  },
};
</script>
