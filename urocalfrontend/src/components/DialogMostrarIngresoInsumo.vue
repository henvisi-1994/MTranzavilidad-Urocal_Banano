<template>
  <v-dialog
    v-model="dialogMostrarIngresoInsumo"
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
          <v-icon class="white--text" @click="cerrarDialogMostrarIngresoInsumo()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Limpieza Herramienta -->
      <v-card-text style="padding: 0px">
        <v-container>
          <FormIngresoInsumo ref="componentFormIngresoInsumo"></FormIngresoInsumo>
        </v-container>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormIngresoInsumo from "@/components/FormIngresoInsumo";

export default {
  name: "MostrarIngresoInsumo",

  components: {
    FormIngresoInsumo
  },

  data() {
    return {
      tab: "formIngresoInsumo",
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogMostrarIngresoInsumo
    dialogMostrarIngresoInsumo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarIngresoInsumo"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarIngresoInsumo", v);
      },
    },
  },

  methods: {
    // Vacia el modelo IngresoInsumo
    ...mapMutations("moduloIngresoInsumo", ["vaciarIngresoInsumo"]),

    cerrarDialogMostrarIngresoInsumo() {
      this.dialogMostrarIngresoInsumo = !this.dialogMostrarIngresoInsumo; // Cierra el dialogMostrarIngresoInsumo
      this.$refs.componentFormIngresoInsumo.$refs.formIngresoInsumo.resetValidation(); // Reinicia las validaciones del formIngresoInsumo
      this.vaciarIngresoInsumo(); // Vacia el modelo IngresoInsumo
    },
  },
};
</script>