<template>
  <v-dialog
    v-model="dialogMostrarFertilizante"
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
          <v-icon class="white--text" @click="cerrarDialogMostrarFertilizante()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Fertilizante -->
      <v-card-text style="padding: 0px">
        <v-container>
          <FormFertilizante ref="componentFormFertilizante"></FormFertilizante>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormFertilizante from "@/components/FormFertilizante";

export default {
  name: "DialogMostrarFertilizante",

  components: {
    FormFertilizante,
  },

  data() {
    return {};
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogMostrarFertilizante
    dialogMostrarFertilizante: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarFertilizante"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarFertilizante", v);
      },
    },
  },

  methods: {
    // Cierra el dialogo
    cerrarDialogMostrarFertilizante() {
      this.dialogMostrarFertilizante = !this.dialogMostrarFertilizante; // Cierra el dialogMostrarFertilizante
    },
  },
};
</script>
