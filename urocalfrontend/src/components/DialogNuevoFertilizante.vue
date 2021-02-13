<template>
  <v-dialog
    v-model="dialogNuevoFertilizante"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="white primary--text">
        <h5>Registrar fertilizante</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="primary--text" @click="cerrarDialogNuevoFertilizante()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar Fertilizante -->
          <FormFertilizante ref="componentFormFertilizante"></FormFertilizante>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Fertilizante -->
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

import FormFertilizante from "@/components/FormFertilizante";

export default {
  name: "DialogNuevoFertilizante",

  components: {
    FormFertilizante,
  },

  data() {
    return {};
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoFertilizante
    dialogNuevoFertilizante: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoFertilizante"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoFertilizante", v);
      },
    },

    // Obtiene es estado de la variable formFertilizanteValido y el modelo fertilizante
    ...mapState("moduloFertilizante", ["formFertilizanteValido", "fertilizante"]),
  },

  methods: {
    // Registra dependiendo el tab donde se encuentre
    registrar() {
      //console.log(this.limpiezaHerramienta);
    },

    cerrarDialogNuevoFertilizante() {
      this.dialogNuevoFertilizante = !this.dialogNuevoFertilizante; // Cierra el dialogNuevoPoda
    },
  },
};
</script>
