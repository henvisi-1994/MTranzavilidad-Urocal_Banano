<template>
  <v-dialog
    v-model="dialogMostrarMonitoreoRoedorFinca"
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
          <v-icon class="white--text" @click="cerrarDialogMostrarMonitoreoRoedorFinca()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Limpieza Herramienta -->
      <v-card-text style="padding: 0px">
        <v-container>
          <FormMonitoreoRoedorFinca ref="componentFormMonitoreoRoedorFinca"></FormMonitoreoRoedorFinca>
        </v-container>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormMonitoreoRoedorFinca from "@/components/FormMonitoreoRoedorFinca";

export default {
  name: "MostrarMonitoreoRoedorFinca",

  components: {
    FormMonitoreoRoedorFinca
  },

  data() {
    return {
      tab: "formMonitoreoRoedorFinca",
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogMostrarMonitoreoRoedorFinca
    dialogMostrarMonitoreoRoedorFinca: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarMonitoreoRoedorFinca"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarMonitoreoRoedorFinca", v);
      },
    },
  },

  methods: {
    // Vacia el modelo MonitoreoRoedorFinca
    ...mapMutations("moduloMonitoreoRoedorFinca", ["vaciarMonitoreoRoedorFinca"]),

    cerrarDialogMostrarMonitoreoRoedorFinca() {
      this.dialogMostrarMonitoreoRoedorFinca = !this.dialogMostrarMonitoreoRoedorFinca; // Cierra el dialogMostrarMonitoreoRoedorFinca
      this.$refs.componentFormMonitoreoRoedorFinca.$refs.formMonitoreoRoedorFinca.resetValidation(); // Reinicia las validaciones del formMonitoreoRoedorFinca
      this.vaciarMonitoreoRoedorFinca(); // Vacia el modelo MonitoreoRoedorFinca
    },
  },
};
</script>
