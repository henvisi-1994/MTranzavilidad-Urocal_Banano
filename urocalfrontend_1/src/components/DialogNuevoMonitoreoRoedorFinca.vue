<template>
  <v-dialog
    v-model="dialogNuevoMonitoreoRoedorFinca"
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
          <v-icon class="white--text" @click="cerrarNuevoMonitoreoRoedorFinca()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar MonitoreoRoedorFinca -->
          <FormMonitoreoRoedorFinca ref="componentFormMonitoreoRoedorFinca"></FormMonitoreoRoedorFinca>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo MonitoreoRoedorFinca -->
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

import FormMonitoreoRoedorFinca from "@/components/FormMonitoreoRoedorFinca";

export default {
  name: "DialogNuevoMonitoreoRoedorFinca",

  components: {
    FormMonitoreoRoedorFinca
  },

  data() {
    return {
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable DialogNuevoMonitoreoRoedorFinca
    dialogNuevoMonitoreoRoedorFinca: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoMonitoreoRoedorFinca"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoMonitoreoRoedorFinca", v);
      },
    },

    // Obtiene es estado de la variable validFormMonitoreoRoedorFinca y el modelo MonitoreoRoedoFinca
    ...mapState("moduloMonitoreoRoedorFinca", ["formMonitoreoRoedorFincaValido", "monitoreoRoedorFinca"]),
  },

  methods: {
    // Vacia el modelo MonitoreoRoedorFinca
    ...mapMutations("moduloMonitoreoRoedorFinca", ["vaciarMonitoreoRoedorFinca"]),

    // Registra dependiendo el tab donde se encuentre
    registrar() {
      //console.log(this.lote);
    },

    cerrarNuevoMonitoreoRoedorFinca() {
      this.dialogNuevoMonitoreoRoedorFinca = !this.dialogNuevoMonitoreoRoedorFinca; // Cierra el dialogNuevoMonitoreoRoedorFinca
      this.$refs.componentFormMonitoreoRoedorFinca.$refs.formMonitoreoRoedorFinca.resetValidation(); // Reinicia las validaciones del formMonitoreoRoedorFinca
      this.vaciarMonitoreoRoedorFinca(); // Vacia el modelo MonitoreoRoedorFinca
    },
  },
};
</script>
