<template>
  <v-dialog
    v-model="dialogMostrarPoda"
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
          <v-icon class="white--text" @click="cerrarDialogMostrarPoda()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Poda -->
      <v-card-text style="padding: 0px">
        <v-container>
          <FormPoda ref="componentFormPoda"></FormPoda>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormPoda from "@/components/FormPoda";

export default {
  name: "DialogMostrarPoda",

  components: {
    FormPoda,
  },

  data() {
    return {};
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogMostrarPoda
    dialogMostrarPoda: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarPoda"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarPoda", v);
      },
    },
  },

  methods: {
    // Cierra el dialogo
    cerrarDialogMostrarPoda() {
      this.dialogMostrarPoda = !this.dialogMostrarPoda; // Cierra el dialogMostrarLimpiezaHerramienta
    },
  },
};
</script>
