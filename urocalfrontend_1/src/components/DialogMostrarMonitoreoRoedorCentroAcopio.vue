<template>
  <v-dialog
    v-model="dialogMostrarMonitoreoRoedorCentroAcopio"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="primary white--text">
        <h5>Actualizar/eliminar</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogMostrarMonitoreoRoedorCentroAcopio()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Limpieza Herramienta -->
      <v-card-text style="padding: 0px">
        <v-container>
          <FormMonitoreoRoedorCentroAcopio ref="componentFormMonitoreoRoedorCentroAcopio"></FormMonitoreoRoedorCentroAcopio>
        </v-container>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormMonitoreoRoedorCentroAcopio from "@/components/FormMonitoreoRoedorCentroAcopio";

export default {
  name: "MostrarMonitoreoRoedorCentroAcopio",

  components: {
    FormMonitoreoRoedorCentroAcopio
  },

  data() {
    return {
      tab: "formMonitoreoRoedorCentroAcopio",
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogMostrarMonitoreoRoedorCentroAcopio
    dialogMostrarMonitoreoRoedorCentroAcopio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarMonitoreoRoedorCentroAcopio"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarMonitoreoRoedorCentroAcopio", v);
      },
    },
  },

  methods: {
    // Vacia el modelo MonitoreoRoedorCentroAcopio
    ...mapMutations("moduloMonitoreoRoedorCentroAcopio", ["vaciarMonitoreoRoedorCentroAcopio"]),

    cerrarDialogMostrarMonitoreoRoedorCentroAcopio() {
      this.dialogMostrarMonitoreoRoedorCentroAcopio = !this.dialogMostrarMonitoreoRoedorCentroAcopio; // Cierra el dialogMostrarMonitoreoRoedorCentroAcopio
      this.$refs.componentFormMonitoreoRoedorCentroAcopio.$refs.formMonitoreoRoedorCentroAcopio.resetValidation(); // Reinicia las validaciones del formMonitoreoRoedorCentroAcopio
      this.vaciarMonitoreoRoedorCentroAcopio(); // Vacia el modelo MonitoreoRoedorCentroAcopio
    },
  },
};
</script>
