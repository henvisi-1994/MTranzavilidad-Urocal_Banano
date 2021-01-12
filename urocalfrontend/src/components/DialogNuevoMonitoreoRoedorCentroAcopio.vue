<template>
  <v-dialog
    v-model="dialogNuevoMonitoreoRoedorCentroAcopio"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="primary white--text">
        <h5>
          Registrar nuevo monitoreo roedor
        </h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarNuevoMonitoreoRoedorCentroAcopio()"
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
          width="200px"
          color="primary"
          @click="registrar()"
          >Registrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormMonitoreoRoedorCentroAcopio from "@/components/FormMonitoreoRoedorCentroAcopio";

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

    // Obtiene es estado de la variable validFormMonitoreoRoedorCentroAcopio y el modelo MonitoreoRoedorCentroAcopio
    ...mapState("moduloMonitoreoRoedorCentroAcopio", ["formMonitoreoRoedorCentroAcopioValido", "monitoreoRoedorCentroAcopio"]),
  },

  methods: {
    // Vacia el modelo MonitoreoRoedorCentroAcopio
    ...mapMutations("moduloMonitoreoRoedorCentroAcopio", ["vaciarMonitoreoRoedorCentroAcopio"]),

    // Registra dependiendo el tab donde se encuentre
    registrar() {
      //console.log(this.lote);
    },

    cerrarNuevoMonitoreoRoedorCentroAcopio() {
      this.dialogNuevoMonitoreoRoedorCentroAcopio = !this.dialogNuevoMonitoreoRoedorCentroAcopio; // Cierra el dialogNuevoMonitoreoRoedorCentroAcopio
      this.$refs.componentFormMonitoreoRoedorCentroAcopio.$refs.formMonitoreoRoedorCentroAcopio.resetValidation(); // Reinicia las validaciones del formMonitoreoRoedorCentroAcopio
      this.vaciarMonitoreoRoedorCentroAcopio(); // Vacia el modelo MonitoreoRoedorCentroAcopio
    },
  },
};
</script>
