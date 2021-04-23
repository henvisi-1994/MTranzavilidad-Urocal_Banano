<template>
  <div>
    <v-dialog
      v-model="dialogNuevoAlmacenamiento"
      scrollable
      :fullscreen="$vuetify.breakpoint.xs ? true : false"
      max-width="800px"
      transition="dialog-transition"
      persistent
    >
      <v-card tile>
        <!-- Barra de titulo -->
        <v-card-title class="primary--text">
          <h5>NUEVO ALMACENAMIENTO</h5>
          <v-spacer></v-spacer>
          <v-btn icon @click="cerrarDialogAlmacenamientoNuevo()">
            <v-icon class="primary--text">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-0">
          <v-container class="pb-0">
            <FormAlmacenamiento ref="componentFormAlmacenamiento"></FormAlmacenamiento>
          </v-container>
        </v-card-text>

        <v-card-actions class="justify-center pb-3">
          <!-- Botón para agregar nuevo almacenamiento -->
          <v-btn
            :block="$vuetify.breakpoint.xs ? true : false"
            width="200px"
            color="primary"
            :disabled="validarBtnAgregarAlmacenamiento()"
            @click="registrar"
            >Registrar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <DialogConfirmacion
      :titulo="titulo"
      :mensaje="mensaje"
      @respuestaDialogoConfirmacion="respuestaDialogoConfirmacion"
    ></DialogConfirmacion>

    <DialogNuevoRevisionHumedad
      ref="componentDialogNuevoRevisionHumedad"
    ></DialogNuevoRevisionHumedad>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormAlmacenamiento from "@/components/FormAlmacenamiento";
import DialogConfirmacion from "@/components/DialogConfirmacion";
import DialogNuevoRevisionHumedad from "@/components/DialogNuevoRevisionHumedad";
import { myMixin } from "../mixins/MyMixin";

import servicioAlmacenamiento from "../services/ServicioAlmacenamiento";

export default {
  name: "DialogNuevoAlmacenamiento",

  components: {
    FormAlmacenamiento,
    DialogConfirmacion,
    DialogNuevoRevisionHumedad,
  },

  data() {
    return {
      titulo: "Revisión de Humedad",
      mensaje: "¿Desea registrar revisión de humedad?",
    };
  },

  computed: {
    ...mapState("moduloAlmacenamiento", ["formAlmacenamientoValido", "almacenamiento"]),

    // Obtiene y modifica el estado de la variable dialogNuevoAlmacenamiento
    dialogNuevoAlmacenamiento: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoAlmacenamiento"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoAlmacenamiento", v);
      },
    },

    // Obtiene la variable que indica si se abre o cierra el DialogConfirmacion
    dialogConfirmacion: {
      get() {
        return this.$store.getters["gestionDialogos/dialogConfirmacion"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogConfirmacion", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogNuevoRevisionHumedad
    dialogNuevoRevisionHumedad: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoRevisionHumedad"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoRevisionHumedad", v);
      },
    },

    // Obtiene la lista cosecha
    cosecha: {
      get() {
        return this.$store.getters["moduloAlmacenamiento/cosecha"];
      },
      set(v) {
        return this.$store.commit("moduloAlmacenamiento/asignarCosecha", v);
      },
    },

    // Obtiene y modifica la variable listaAlmacenamiento
    listaAlmacenamiento: {
      get() {
        return this.$store.getters["moduloAlmacenamiento/listaAlmacenamiento"];
      },
      set(v) {
        return this.$store.commit("moduloAlmacenamiento/asignarListaAlmacenamiento", v);
      },
    },

    // Obtiene y modifica la variable bloquearCamposFormAlmacenamiento
    bloquearCamposFormAlmacenamiento: {
      get() {
        return this.$store.getters[
          "moduloAlmacenamiento/bloquearCamposFormAlmacenamiento"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloAlmacenamiento/cambiarBloquearCamposFormAlmacenamiento",
          v
        );
      },
    },
  },

  methods: {
    // Obtiene el metodo para vaciar el modeloRevisionHumedad
    ...mapMutations("moduloRevisionHumedad", ["vaciarRevisionHumedad"]),

    // Obtiene el metodo para vaciar el modeloAlmacenamiento
    ...mapMutations("moduloAlmacenamiento", ["vaciarAlmacenamiento"]),

    // Registro de almacenamiento y pregunta si registra revision de humedad
    async registrar() {
      try {
        let resultadoServicioAlmacenamiento = await servicioAlmacenamiento.crearAlmacenamiento(
          this.almacenamiento
        );

        this.almacenamiento.almacenamientoid =
          resultadoServicioAlmacenamiento.data.almacenamientoid;

        this.cosecha.forEach(async (cosechaid) => {
          let mix = {
            almacenamientoid: resultadoServicioAlmacenamiento.data.almacenamientoid,
            cosechaid: cosechaid,
          };
          await servicioAlmacenamiento.crearMix(mix);
        });
        this.obtenerTodosAlmacenamiento();
        this.$toast.success(resultadoServicioAlmacenamiento.data.message);
        this.dialogConfirmacion = true;
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    // Recibe la respuesta de DialogConfirmacion
    respuestaDialogoConfirmacion(respuesta) {
      if (respuesta) {
        this.dialogConfirmacion = false;
        this.dialogNuevoAlmacenamiento = false;
        this.vaciarRevisionHumedad();
        this.dialogNuevoRevisionHumedad = true;
      } else {
        this.dialogConfirmacion = false;
        this.dialogNuevoAlmacenamiento = false;
        this.vaciarAlmacenamiento();
      }
    },

    // Cierra el DialogNuevoAlmacenamiento
    cerrarDialogAlmacenamientoNuevo() {
      this.dialogNuevoAlmacenamiento = false;
    },

    validarBtnAgregarAlmacenamiento() {
      return this.formAlmacenamientoValido &&
        this.almacenamiento.centroacopioid !== "" &&
        this.almacenamiento.centroacopioid !== null &&
        this.almacenamiento.tratamientoid !== "" &&
        this.almacenamiento.tratamientoid !== null &&
        this.cosecha.length != 0
        ? false
        : true;
    },

    // Llena la listaAlmacenamiento con datos del servidor backend
    async obtenerTodosAlmacenamiento() {
      let resultado = await servicioAlmacenamiento.obtenerTodosAlmacenamiento();
      this.listaAlmacenamiento = resultado.data;
    },
  },

  mixins: [myMixin],

  watch: {
    // Cada vez que se abre el dialog, se resetean las validaciones del formulario
    dialogNuevoAlmacenamiento() {
      if (this.dialogNuevoAlmacenamiento) {
        setTimeout(() => {
          this.$refs.componentFormAlmacenamiento.$refs.formAlmacenamiento.resetValidation();
          this.bloquearCamposFormAlmacenamiento = false;
        }, 100);
      }
    },
  },
};
</script>
