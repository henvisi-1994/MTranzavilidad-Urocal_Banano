<template>
  <v-dialog
    v-model="dialogNuevoFitosanitario"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="white primary--text">
        <h5>Registrar fitosanitario</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="primary--text" @click="cerrarDialogNuevoFitosanitario()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar Fitosanitario -->
          <FormFitosanitario ref="componentFormFitosanitario"></FormFitosanitario>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Fitosanitario -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          @click="registrar()"
          >Registrar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormFitosanitario from "@/components/FormFitosanitario";

export default {
  name: "DialogNuevoFitosanitario",

  components: {
    FormFitosanitario,
  },

  data() {
    return {};
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoFitosanitario
    dialogNuevoFitosanitario: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoFitosanitario"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoFitosanitario", v);
      },
    },

    // Obtiene es estado de la variable formFitosanitarioValido y el modelo fitosanitario
    ...mapState("moduloFitosanitario", ["formFitosanitarioValido", "fitosanitario"]),
  },

  methods: {
    // Registra dependiendo el tab donde se encuentre
    registrar() {
      //console.log(this.limpiezaHerramienta);
    },

    cerrarDialogNuevoFitosanitario() {
      this.dialogNuevoFitosanitario = !this.dialogNuevoFitosanitario; // Cierra el dialogNuevoFitosanitario
    },
  },
};
</script>
