<template>
  <v-dialog
    v-model="dialogoMostrarSiembra"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0" height="480px">
      <!-- Barra de titulo -->
      <v-card-title class="primary white--text">
        <h5>Actualizar/eliminar</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text" @click="closeDialogoMostrarSiembra()"
            >mdi-pencil</v-icon
          >
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text" @click="closeDialogoMostrarSiembra()"
            >mdi-trash-can</v-icon
          >
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text" @click="closeDialogoMostrarSiembra()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-container>
          <!-- Formulario para eliminar o actualizar Siembra -->
          <FormularioSiembra ref="componenteFormularioSiembra"></FormularioSiembra>
        </v-container>
      </v-card-text>

    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormularioSiembra from "@/components/FormSiembra";

export default {
  name: "StepperNuevaSiembra",

  components: {
    FormularioSiembra,
  },

  //OJO
  data() {
    return {
      btn_nombre_step: "Registrar", // Nombre del botón de paso a paso
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogoMostrarSiembra
    dialogoMostrarSiembra: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoMostrarSiembra"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogoMostrarSiembra", v);
      },
    },

    // Obtiene es estado de la variable formSiembraValido y el modelo siembra
    ...mapState("moduloSiembra", ["formSiembraValido", "siembra"]),
  },

  methods: {
    // Vacia el modelo siembra
    ...mapMutations("moduloSiembra", ["vaciarSiembra"]),

    // Registra dependiendo el tab donde se encuentre
    registrar() {
      console.log(this.siembra);
      this.btn_nombre_step = "Registrar";
      this.cerrarDialogoNuevaSiembra();
    },

    closeDialogoMostrarSiembra() {
      this.dialogoMostrarSiembra = !this.dialogoMostrarSiembra; // Cierra el DialogoNuevaSiembra
      this.$refs.componenteFormularioSiembra.$refs.formSiembra.resetValidation(); // Reinicia las validaciones del formSiembra
      this.vaciarSiembra(); // Reinicia el modelo Siembra
    },

    // Valida que el boton este activo si el formulario correspondiente a la seccion es valido
    validarBtnAgregarSiembra() {
      let validSelect = this.siembra.cultivoid == "" || this.siembra.cultivoid == null;
    },
  },
};
</script>
