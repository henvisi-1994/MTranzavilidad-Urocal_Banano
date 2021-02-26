<template>
  <v-dialog
    v-model="dialogNuevoRiego"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="white primary--text">
        <h5>Registrar riego</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="primary--text" @click="cerrarDialogNuevoRiego()">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar Riego -->
          <FormRiego ref="componentFormRiego"></FormRiego>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Riego -->
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

import FormRiego from "@/components/FormRiego";

export default {
  name: "DialogNuevoRiego",

  components: {
    FormRiego,
  },

  data() {
    return {};
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoRiego
    dialogNuevoRiego: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoRiego"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoRiego", v);
      },
    },

    // Obtiene es estado de la variable formRiegoValido y el modelo Riego
    ...mapState("moduloRiego", ["formRiegoValido", "riego"]),
  },

  methods: {
    // Registra un nuevo riego
    registrar() {
      //console.log(this.limpiezaHerramienta);
    },

    cerrarDialogNuevoRiego() {
      this.dialogNuevoRiego = !this.dialogNuevoRiego; // Cierra el dialogNuevoRiego
    },
  },
};
</script>
