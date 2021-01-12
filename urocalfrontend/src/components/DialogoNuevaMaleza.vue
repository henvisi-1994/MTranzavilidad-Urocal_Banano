<template>
  <v-dialog
    v-model="dialogoNuevaMaleza"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="primary white--text">
        <h5>Registrar nuevo Control de Maleza</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogoNuevaMaleza()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text class="py-top">
        <!-- Formulario para registrar nuevo Control de Maleza -->
        <FormularioMaleza ref="componenteFormularioMaleza"></FormularioMaleza>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Control de Maleza -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          color="primary"
          :disabled="validarBtnAgregarMaleza()"
          @click="registrar()"
          >Registrar</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import FormularioMaleza from "@/components/FormMaleza";

export default {
  name: "NuevoMalezaControl",

  components: {
    FormularioMaleza,
  },

  data() {
    return {};
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogoNuevaMaleza
    dialogoNuevaMaleza: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoNuevaMaleza"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogoNuevaMaleza", v);
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
      this.cerrarDialogoNuevaMaleza();
    },

    cerrarDialogoNuevaMaleza() {
      this.dialogoNuevaMaleza = !this.dialogoNuevaMaleza; // Cierra el DialogoNuevaMaleza
      this.$refs.componenteFormularioMaleza.$refs.formularioMaleza.resetValidation(); // Reinicia las validaciones del formularioMaleza
      this.vaciarMaleza(); // Reinicia el modelo Maleza
    },

    // Valida que el boton este activo si el formulario correspondiente a la seccion es valido
    validarBtnAgregarMaleza() {
      let validSelect = this.maleza.cultivoid == "" || this.maleza.cultivoid == null;
      return this.formMalezaValido && !validSelect ? false : true;
    },
  },
};
</script>
<style scoped>
.py-top {
  padding: 0 16px !important;
}
</style>
