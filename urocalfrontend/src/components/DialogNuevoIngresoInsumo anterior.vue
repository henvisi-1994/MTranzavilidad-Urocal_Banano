<template>
  <v-dialog
    v-model="dialogNuevoIngresoInsumo"
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
          Registrar nuevo ingreso de insumo
        </h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogIngresoInsumo()"
            >mdi-close</v-icon
          >
        </v-btn> 
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar IngresoInsumo -->
          <FormIngresoInsumo ref="componentFormIngresoInsumo"></FormIngresoInsumo>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo IngresoInsumo -->
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

import FormIngresoInsumo from "@/components/FormIngresoInsumo";

export default {
  name: "DialogNuevoIngresoInsumo",

  components: {
    FormIngresoInsumo
  },

  data() {
    return {
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoIngresoInsumo
    dialogNuevoIngresoInsumo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoIngresoInsumo"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoIngresoInsumo", v);
      },
    },

    // Obtiene es estado de la variable formIngresoInsumoValido y el modelo IngresoInsumo
    ...mapState("moduloIngresoInsumo", ["formIngresoInsumoValido", "IngresoInsumo"]),
  },

  methods: {
    // Vacia el modelo IngresoInsumo
    ...mapMutations("moduloIngresoInsumo", ["vaciarIngresoInsumo"]),

    // Registra dependiendo el tab donde se encuentre
    registrar() {
      //console.log(this.IngresoInsumo);
    },

    cerrarDialogIngresoInsumo() {
      this.dialogNuevoIngresoInsumo = !this.dialogNuevoIngresoInsumo; // Cierra el dialogNuevoIngresoInsumo
      this.$refs.componentFormIngresoInsumo.$refs.formIngresoInsumo.resetValidation(); // Reinicia las validaciones del formIngresoInsumo
      this.vaciarIngresoInsumo(); // Vacia el modelo IngresoInsumo
    },
  },
};
</script>
