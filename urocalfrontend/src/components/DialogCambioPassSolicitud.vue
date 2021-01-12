<template>
  <v-dialog
    v-model="dialogSolicitudCambioPass"
    :width="$vuetify.breakpoint.xs ? '100%' : '40%'"
    transition="dialog-transition"
    eager
  >
    <v-card class="elevation-12 mx-auto">
      <v-row class="ml-0 mr-0">
        <v-col cols="12">
          <v-card-text class="mt-5">
            <h1 class="text-center display-1">Recuperar contraseña</h1>
            <h5 class="text-center">Ingresa tu correo y nos pondremos en contacto</h5>
            <!-- Form SolicitudCambioPassword -->
            <v-form ref="formCambioPassSolicitud" v-model="formCambioPassSolicitudValido">
              <v-text-field
                v-model="email"
                label="Correo electrónico"
                :rules="[reglas.campoVacio(email), reglas.correo(email)]"
                error-count="2"
              ></v-text-field>
            </v-form>
            <!-- Fin: Form SolicitudCambioPassword -->
          </v-card-text>
          <div class="text-center">
            <v-btn
              color="error"
              class="mr-2"
              @click="dialogSolicitudCambioPass = !dialogSolicitudCambioPass"
              >Cancelar</v-btn
            >
            <v-btn color="primary" :disabled="!formCambioPassSolicitudValido"
              >Enviar</v-btn
            >
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "DialogCambioPassSolicitud",

  props: {},

  data() {
    return {
      email: "",
      formCambioPassSolicitudValido: false, // Indica si el formCambioPassSolicitud es valido
    };
  },

  computed: {
    ...mapState("validacionForm", ["reglas"]), // Obtiene las reglas de validacion desde store

    // Obtiene y modifica el estado de la variable dialogSolicitudCambioPass
    dialogSolicitudCambioPass: {
      get() {
        return this.$store.getters["gestionDialogos/dialogSolicitudCambioPass"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogSolicitudCambioPass", v);
      },
    },
  },

  methods: {},
};
</script>
