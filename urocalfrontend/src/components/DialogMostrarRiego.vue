<template>
  <v-dialog
    v-model="dialogMostrarRiego"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="white primary--text">
        <h5>Actualizar/eliminar</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="primary--text">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="primary--text">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="primary--text" @click="cerrarDialogMostrarRiego()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Riego -->
      <v-card-text style="padding: 0px">
        <v-container>
          <FormRiego ref="componentFormRiego"></FormRiego>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormRiego from "@/components/FormRiego";

export default {
  name: "DialogMostrarRiego",

  components: {
    FormRiego,
  },

  data() {
    return {};
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogMostrarRiego
    dialogMostrarRiego: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarRiego"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarRiego", v);
      },
    },
  },

  methods: {
    // Cierra el dialogo
    cerrarDialogMostrarRiego() {
      this.dialogMostrarRiego = !this.dialogMostrarRiego; // Cierra el dialogMostrarRiego
    },
  },
};
</script>
