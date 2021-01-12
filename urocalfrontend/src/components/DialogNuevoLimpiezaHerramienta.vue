<template>
  <v-dialog
    v-model="dialogNuevoLimpiezaHerramienta"
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
          Registrar nuevo limpieza herramienta
        </h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogLimpiezaHerramienta()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar LimpiezaHerramienta -->
          <FormLimpiezaHerramienta ref="componentFormLimpiezaHerramienta"></FormLimpiezaHerramienta>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo LimpiezaHerramienta -->
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

import FormLimpiezaHerramienta from "@/components/FormLimpiezaHerramienta";

export default {
  name: "DialogNuevoLimpiezaHerramienta",

  components: {
    FormLimpiezaHerramienta
  },

  data() {
    return {
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoLimpiezaHerramienta
    dialogNuevoLimpiezaHerramienta: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoLimpiezaHerramienta"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoLimpiezaHerramienta", v);
      },
    },

    // Obtiene es estado de la variable formLimpiezaHerramientaValido y el modelo LimpiezaHerramienta
    ...mapState("moduloLimpiezaHerramienta", ["formLimpiezaHerramientaValido", "limpiezaHerramienta"]),
  },

  methods: {
    // Vacia el modelo LimpiezaHerramienta
    ...mapMutations("moduloLimpiezaHerramienta", ["vaciarLimpiezaHerramienta"]),

    // Registra dependiendo el tab donde se encuentre
    registrar() {
      //console.log(this.limpiezaHerramienta);
    },

    cerrarDialogLimpiezaHerramienta() {
      this.dialogNuevoLimpiezaHerramienta = !this.dialogNuevoLimpiezaHerramienta; // Cierra el dialogNuevoLimpiezaHerramienta
      this.$refs.componentFormLimpiezaHerramienta.$refs.formLimpiezaHerramienta.resetValidation(); // Reinicia las validaciones del formLimpiezaHerramienta
      this.vaciarLimpiezaHerramienta(); // Vacia el modelo LimpiezaHerramienta
    },
  },
};
</script>
