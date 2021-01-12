<template>
  <v-dialog
    v-model="dialogMostrarFitosanitario"
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
          <v-icon class="white--text" @click="cerrarDialogMostrarFitosanitario()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Fitosanitario -->
      <v-card-text style="padding: 0px">
        <v-container>
          <FormFitosanitario ref="componentFormFitosanitario"></FormFitosanitario>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormFitosanitario from "@/components/FormFitosanitario";

export default {
  name: "DialogMostrarFitosanitario",

  components: {
    FormFitosanitario,
  },

  data() {
    return {};
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogMostrarFitosanitario
    dialogMostrarFitosanitario: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarFitosanitario"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarFitosanitario", v);
      },
    },
  },

  methods: {
    // Cierra el dialogo
    cerrarDialogMostrarFitosanitario() {
      this.dialogMostrarFitosanitario = !this.dialogMostrarFitosanitario; // Cierra el dialogMostrarFitosanitario
    },
  },
};
</script>
