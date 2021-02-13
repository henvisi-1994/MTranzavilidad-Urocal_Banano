<template>
  <v-dialog
    v-model="dialogNuevoRespacopio"
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
          Registrar Responsable de acopio
        </h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogNuevoRespacopio()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar Respacopio -->
          <FormRespacopio ref="componentFormRespacopio"></FormRespacopio>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Respacopio -->
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

import FormRespacopio from "@/components/FormRespacopio";

export default {
  name: "DialogNuevoRespacopio",

  components: {
    FormRespacopio
  },

  data() {
    return {
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoRespacopio
    dialogNuevoRespacopio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoRespacopio"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogRespacopioNuevo", v);
      },
    },

    // Obtiene es estado de la variable formRespacopioValido y el modelo Respacopio
    ...mapState("moduloRespacopio", ["formRespacopioValido", "respacopio"]),
  },

  methods: {
    // Vacia el modelo Respacopio
    ...mapMutations("moduloRespacopio", ["vaciarRespacopio"]),

    // Registra dependiendo el tab donde se encuentre
    registrar() {
      //console.log(this.limpiezaHerramienta);
    },

    cerrarDialogNuevoRespacopio() {
      this.dialogNuevoRespacopio = !this.dialogNuevoRespacopio; // Cierra el dialogNuevoRespacopio
    },
  },
};
</script>
