<template>
  <v-container style="height: 100%" class="center-col-vh">
    <!-- Dialog para solicitud de cambio de password -->
    <DialogCambioPassSolicitud ref="componentDialogCambioPassSolicitud">
    </DialogCambioPassSolicitud>

    <v-row>
      <v-col cols="12">
        <div
          :class="
            $vuetify.breakpoint.xs
              ? 'transition-swing text-h5 text-center'
              : 'transition-swing text-h4 text-center'
          "
        >
          Sistema de trazabilidad
        </div>
      </v-col>
      <v-col cols="12" class="center-col-vh">
        <v-card outlined width="350px">
          <v-card-title class="justify-center">Iniciar Sesión</v-card-title>
          <v-divider></v-divider>

          <v-card-text class="text-center">
            <img
              class="py-10"
              alt="Vue logo"
              src="https://cecjecuador.org.ec/wp-content/uploads/2020/02/urocal.jpg"
            />

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
  </v-container>
</template>
<script>
import { mapMutations, mapState } from "vuex";

import Usuario from "@/models/ModeloUsuario"; // Importa el modelo User
import DialogCambioPassSolicitud from "../components/DialogCambioPassSolicitud"; // Importa el DialogCambioPassSolicitud
import { autenticacionLoginMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

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
          if (respuesta === "Productor") this.$router.push({ name: "BaseSiembra" });
          if (respuesta === "Responsable Centro Acopio")
            this.$router.push({ name: "BaseAlmacenamiento" });
          if (respuesta === "Exportador")
            this.$router.push({ name: "BaseRegistroEnvio" });
          if (respuesta === "Administrador")
            this.$router.push({ name: "BaseUsuarioPersona" });
        },
        (error) => {
          this.$toast.error(error.message);
        }
      );
    },

    // Carga el DialogCambioPassSolicitud
    abrirDialogCambioPassSolicitud() {
      this.dialogSolicitudCambioPass = !this.dialogSolicitudCambioPass;
      this.$refs.componentDialogCambioPassSolicitud.$refs.formCambioPassSolicitud.reset();
    },
  },

  mixins: [autenticacionLoginMixin],

  // Al crearse la vista, se envia al store el layout de Login a renderizar
  created() {
    this.$store.commit("colocarLayout", "LayoutLogin");
  },
};
</script>
