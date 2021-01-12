<template>
  <v-dialog
    v-model="dialogMostrarLimpiezaHerramienta"
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
          <v-icon class="white--text" @click="cerrarDialogMostrarLimpiezaHerramienta()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Limpieza Herramienta -->
      <v-card-text style="padding: 0px">
        <v-container>
          <FormLimpiezaHerramienta ref="componentFormLimpiezaHerramienta"></FormLimpiezaHerramienta>
        </v-container>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormLimpiezaHerramienta from "@/components/FormLimpiezaHerramienta";

export default {
  name: "MostrarLimpiezaHerramienta",

  components: {
    FormLimpiezaHerramienta
  },

  data() {
    return {
      tab: "formLimpiezaHerramienta",
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogMostrarLimpiezaHerramienta
    dialogMostrarLimpiezaHerramienta: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarLimpiezaHerramienta"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarLimpiezaHerramienta", v);
      },
    },
  },

  methods: {
    // Vacia el modelo LimpiezaHerramienta
    ...mapMutations("moduloLimpiezaHerramienta", ["vaciarLimpiezaHerramienta"]),

    cerrarDialogMostrarLimpiezaHerramienta() {
      this.dialogMostrarLimpiezaHerramienta = !this.dialogMostrarLimpiezaHerramienta; // Cierra el dialogMostrarLimpiezaHerramienta
      this.$refs.componentFormLimpiezaHerramienta.$refs.formLimpiezaHerramienta.resetValidation(); // Reinicia las validaciones del formLimpiezaHerramienta
      this.vaciarLimpiezaHerramienta(); // Vacia el modelo LimpiezaHerramienta
    },
  },
};
</script>
