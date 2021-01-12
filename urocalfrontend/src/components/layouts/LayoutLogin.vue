<template>
  <v-container fill-height>
    <!-- Dialog para solicitud de cambio de password -->
    <DialogCambioPassSolicitud ref="componentDialogCambioPassSolicitud">
    </DialogCambioPassSolicitud>

    <v-row>
      <v-col cols="12" class="center-col-vh">
        <h1>Sistema de trazabilidad</h1>
      </v-col>
      <v-col cols="12" class="center-col-vh">
        <v-card outlined width="350px">
          <v-card-title class="justify-center">Iniciar Sesión</v-card-title>
          <v-divider></v-divider>

          <v-card-text class="text-center">
            <img alt="Vue logo" src="../../assets/logo.png" />

            <!-- Formulario Inicio de sesion -->
            <v-form v-model="formLoginValido">
              <v-text-field
                v-model="usuario.percedula"
                label="Usuario"
                :rules="[reglas.campoVacio(usuario.percedula)]"
              ></v-text-field>
              <v-text-field
                v-model="usuario.usuclave"
                :rules="[reglas.campoVacio(usuario.usuclave)]"
                :type="mostrarPassword ? 'text' : 'password'"
                :append-icon="mostrarPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="mostrarPassword = !mostrarPassword"
                v-on:keyup.enter="ingresar()"
                label="Contraseña"
              ></v-text-field>
            </v-form>
            <!-- Fin: Formulario Inicio de sesion -->
          </v-card-text>

          <v-card-actions>
            <v-col cols="12">
              <v-btn
                color="primary"
                block
                :disabled="!formLoginValido"
                @click="ingresar()"
                >Ingresar</v-btn
              >
              <v-btn
                text
                color="primary"
                small
                block
                @click="abrirDialogCambioPassSolicitud()"
              >
                ¿Olvido su Contraseña?
              </v-btn>
            </v-col>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Contenido dinamico -->
    <div style="display: none">
      <router-view></router-view>
    </div>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import Usuario from "@/models/ModeloUsuario"; // Importa el modelo User
import DialogCambioPassSolicitud from "../DialogCambioPassSolicitud"; // Importa el DialogCambioPassSolicitud

export default {
  name: "Login",

  components: {
    DialogCambioPassSolicitud,
  },

  data() {
    return {
      usuario: new Usuario("", ""), // Almacena datos del modelo usuario
      formLoginValido: false, // Indica si el formulario esta validado
      mostrarPassword: false, // Indica si muestra o no la contraseña
    };
  },

  computed: {
    logueado() {
      return this.$store.getters["moduloAutenticacion/logueado"];
    },

    // Obtiene las reglas de validacion desde store
    ...mapState("validacionForm", ["reglas"]),

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

  methods: {
    ingresar() {
      this.$store.dispatch("moduloAutenticacion/login", this.usuario).then(
        (respuesta) => {
          if (respuesta == "Productor") {
            this.$router.push({ name: "BaseLote" });
          }
        },
        (error) => {
          this.notifError({ message: error.message });
        }
      );
    },

    // Carga el DialogCambioPassSolicitud
    abrirDialogCambioPassSolicitud() {
      this.dialogSolicitudCambioPass = !this.dialogSolicitudCambioPass;
      this.$refs.componentDialogCambioPassSolicitud.$refs.formCambioPassSolicitud.reset();
    },
  },

  created() {
    // Si esta logueado, lo envia al contenido
    if (this.logueado) {
      this.$router.push({ name: "BaseLote" });
    }
  },

  mounted() {},

  notifications: {
    notifExito: { title: "Éxito", message: "", type: "success", timeout: 3000 },
    notifError: { title: "Error", message: "", type: "error", timeout: 3000 },
    notifInfo: { title: "Información", message: "", type: "info", timeout: 3000 },
    notifAviso: { title: "Aviso", message: "", type: "warn", timeout: 3000 },
  },
};
</script>
