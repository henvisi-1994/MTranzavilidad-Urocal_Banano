<template>
  <v-dialog
    v-model="dialogMostrarCentroacopio"
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
          <v-icon class="white--text" @click="cerrarDialogMostrarCentroacopio()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Centro de acopio -->
      <v-card-text style="padding: 0px">
        <v-container>
          <FormCentroacopio ref="componentFormCentroacopio"></FormCentroacopio>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormCentroacopio from "@/components/FormCentroacopio";

export default {
  name: "DialogMostrarCentroacopio",

  components: {
    FormCentroacopio,
  },

  data() {
    return {};
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogMostrarCentroacopio
    dialogMostrarCentroacopio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarCentroacopio"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarCentroacopio", v);
      },
    },
  },

  methods: {
    // Cierra el dialogo
    cerrarDialogMostrarCentroacopio() {
      this.dialogMostrarCentroacopio = !this.dialogMostrarCentroacopio; // Cierra el dialogMostrarCentroacopio
    },
  },
};
</script>
