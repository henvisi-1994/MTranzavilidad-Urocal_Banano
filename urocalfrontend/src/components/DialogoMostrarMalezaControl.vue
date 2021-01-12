<template>
  <v-dialog
    v-model="dialogoMostrarMalezaControl"
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
          <v-icon
            class="white--text"
            @click="closeDialogoMostrarMalezaControl()"
            >mdi-pencil</v-icon
          >
        </v-btn>
        <v-btn icon>
          <v-icon
            class="white--text"
            @click="closeDialogoMostrarMalezaControl()"
            >mdi-trash-can</v-icon
          >
        </v-btn>
        <v-btn icon>
          <v-icon
            class="white--text"
            @click="closeDialogoMostrarMalezaControl()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text class="py-top">
        <!-- Formulario para eliminar o actualizar Control de Maleza -->
        <FormularioMalezaControl
          ref="componenteFormularioMaleza"
        ></FormularioMalezaControl>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormularioMalezaControl from "@/components/FormMaleza";

export default {
  name: "NuevoMalezaControl",

  components: {
    FormularioMalezaControl,
  },
  //OJO
  data() {
    return {
      btn_nombre_step: "Registrar", // Nombre del botón de paso a paso
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogoMostrarMalezaControl
    dialogoMostrarMalezaControl: {
      get() {
        return this.$store.getters[
          "gestionDialogos/dialogoMostrarMalezaControl"
        ];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogoMostrarMalezaControl",
          v
        );
      },
    },

    // Obtiene es estado de la variable formMalezaValido y el modelo lot
    ...mapState("moduloMaleza", ["formMalezaValido", "maleza"]),
  },

  methods: {
    // Vacia el modelo maleza
    ...mapMutations("moduloMaleza", ["vaciarMaleza"]),

    // Registra dependiendo el tab donde se encuentre
    registrar() {
      console.log(this.maleza);
      this.btn_nombre_step = "Registrar";
      this.cerrarDialogoNuevaMaleza();
    },

    closeDialogoMostrarMalezaControl() {
      this.dialogoMostrarMalezaControl = !this.dialogoMostrarMalezaControl; // Cierra el DialogoNuevaMaleza
      this.$refs.componenteFormularioMaleza.$refs.formularioMaleza.resetValidation(); // Reinicia las validaciones del formularioMaleza
      this.vaciarMaleza(); // Reinicia el modelo Maleza
    },

    // Valida que el boton este activo si el formulario correspondiente a la seccion es valido
    validarBtnAgregarMaleza() {
      let validSelect =
        this.maleza.cultivoid == "" || this.maleza.cultivoid == null;
    },
  },
};
</script>
<style scoped>
.py-top {
  padding: 0 16px !important;
}
</style>
