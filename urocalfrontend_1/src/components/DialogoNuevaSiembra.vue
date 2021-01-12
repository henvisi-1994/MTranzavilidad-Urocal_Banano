<template>
  <v-dialog
    v-model="dialogoNuevaSiembra"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0" height="480px">
      <!-- Barra de titulo -->
      <v-card-title class="primary white--text">
        <h5>
          {{ $vuetify.breakpoint.xs ? tituloDialog() : "Registrar nueva Siembra" }}
        </h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogoNuevaSiembra()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text>
        <v-container>
          <!-- Formulario para registrar una Siembra -->
          <FormSiembra ref="componenteFormularioSiembra"></FormSiembra>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nueva Siembra -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          color="primary"
          :disabled="validarBtnAgregarSiembra()"
          @click="registrar()"
          >{{ btn_nombre_step }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import FormSiembra from "@/components/FormSiembra";

export default {
  name: "StepperNuevaSiembra",

  components: {
    FormSiembra,
  },

  data() {
    return {
      btn_nombre_step: "Registrar", // Nombre del botón de paso a paso
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogoNuevaSiembra
    dialogoNuevaSiembra: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoNuevaSiembra"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogoNuevaSiembra", v);
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

    cerrarDialogoNuevaSiembra() {
      this.dialogoNuevaSiembra = !this.dialogoNuevaSiembra; // Cierra el DialogoNuevaSiembra
      this.$refs.componenteFormularioSiembra.$refs.formSiembra.resetValidation(); // Reinicia las validaciones del formSiembra
      this.vaciarSiembra(); // Reinicia el modelo Siembra
    },

    // Cambia el titulo del dialogo
    tituloDialog() {
      return "Siembra";
    },

    // Valida que el boton este activo si el formulario correspondiente a la seccion es valido
    validarBtnAgregarSiembra() {
      let validSelect = this.siembra.cultivoid == "" || this.siembra.cultivoid == null;
    },
  },
};
</script>
