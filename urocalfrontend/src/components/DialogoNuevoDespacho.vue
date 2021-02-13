<template>
  <v-dialog v-model="dialogoNuevoDespacho" scrollable max-width="800px" transition="dialog-transition" :fullscreen="$vuetify.breakpoint.xs ? true : false" >
    <v-card class="rounded-0" height="480px">
      <!-- Barra de titulo -->
      <v-card-title class="justify-center primary--text">
        <h5 class="pl-3">Registrar nuevo Despacho</h5>
        <v-spacer></v-spacer>
        <div v-if="n_step > 1">
          <v-btn icon @click="atras()">
            <v-icon class="primary--text" >mdi-arrow-left-bold </v-icon>
          </v-btn>
        </div>
        <v-btn icon @click="cerrarDialogoNuevoDespacho()">
          <v-icon class="primary--text" >mdi-close </v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <!-- Stepper -->
        <v-stepper v-model="n_step" class="elevation-0">
          <v-stepper-header>
            <v-divider></v-divider>
            <v-stepper-step step="1"> Despacho </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2"> Detalle </v-stepper-step>
            <v-divider></v-divider>
          </v-stepper-header>

          <v-stepper-items>
            <v-container>
              <v-stepper-content step="1" class="pa-1">
                <!-- Formulario para registrar Despacho -->
                <FormularioDespacho ref="componenteFormularioDespacho"></FormularioDespacho>
              </v-stepper-content>
              <v-stepper-content step="2" class="pa-1">
                <!-- Formulario para registrar el detalle del despacho -->
                <FormularioDetalleDespacho ref="componenteFormularioDetalleDespacho"></FormularioDetalleDespacho>
              </v-stepper-content>
            </v-container>
          </v-stepper-items>

        </v-stepper>
        <!-- Fin: Stepper -->
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo Control de Maleza -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          color="primary"
          :disabled="validarBtnAgregarDespacho()"
          @click="registrar()">
          {{ btn_nombre_step }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import FormularioDespacho from "../components/FormDespacho";
import FormularioDetalleDespacho from "../components/FormDetalleDespacho";

import servicioDespacho from "../services/ServicioDespacho";
import servicioDetalleDespacho from "../services/ServicioDetalleDespacho";

export default {
  name: "DialogoNuevoDespacho",

  components: {
    FormularioDespacho,
    FormularioDetalleDespacho,
  },

  data() {
    return {
      n_step: 1, // Almacena el número de paso
      btn_nombre_step: "Siguiente", // Nombre del botón de paso a paso
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogoNuevoDespacho
    dialogoNuevoDespacho: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoNuevoDespacho"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogoNuevoDespacho", v);
      },
    },

    // Obtiene es estado de la variable formDespachoValido y el modelo despacho
    ...mapState("moduloDespacho", ["formDespachoValido", "despacho", "listaDespacho"]),

    // Obtiene es estado de la variable formDetalleDespachoValido y el modelo detalledespacho
    ...mapState("moduloDetalleDespacho", ["formDetalleDespachoValido", "detalledespacho"]),

  },

  methods: {

    // Obtiene mutaciones del moduloDespacho
    ...mapMutations("moduloDespacho", ["vaciarDespacho", "asignarListaDespacho"]),

    // Vacia el modelo detalledespacho
    ...mapMutations("moduloDetalleDespacho", ["vaciarDetalleDespacho"]),


    // Registra dependiendo el tab donde se encuentre
    async registrar() {
      switch (this.n_step) {
        case 1:
          this.n_step++;
          console.log(this.despacho);
          this.btn_nombre_step = "Registrar";
          break;
        case 2:
          try {
            console.log(this.detalledespacho);
            let respuestaServicioDespacho = await servicioDespacho.crearDespacho(this.despacho);
            this.detalledespacho.despachoid = respuestaServicioDespacho.data.despachoid; // Agrega lotecultivadoid al objeto detalledespacho           
            await servicioDetalleDespacho.crearDetalleDespacho(this.detalledespacho);

            this.obtenerTodosDespacho();
            this.vaciarDespacho();
            this.vaciarDetalleDespacho();
            this.$toast.success(respuestaServicioDespacho.data.message);
            this.n_step = 1;
            this.cerrarDialogoNuevoDespacho();
          } catch (error) {
            console.log(error.response.data.message);
            this.$toast.error(error.response.data.message);
          }
          break;
        default:
          this.cerrarDialogoNuevoDespacho();
      }
    },


    cerrarDialogoNuevoDespacho() {
      this.dialogoNuevoDespacho = false; // Cierra el DialogoNuevoDespacho
    },


    // Cambia el titulo del dialogo
    tituloDialog() {
      switch (this.n_step) {
        case 1:
          return "Despacho";
          break;
        case 2:
          return "Detalle";
          break;
      }
    },


    // Retorna un paso atras en el stepper
    atras() {
      this.n_step--;
      this.btn_nombre_step = "Siguiente";
    },


    // Valida que el boton este activo si el formulario correspondiente a la seccion es valido
    validarBtnAgregarDespacho() {
      let selectValido = this.detalledespacho.almacenamientoid == "" || this.detalledespacho.almacenamientoid == null;
      switch (this.n_step) {
        case 1:
          return this.formDespachoValido ? false : true;
          break;
        case 2:
          return this.formDetalleDespachoValido && !selectValido ? false : true;
          break;
      }
    },


    // Llena la listaDespacho con datos del servidor backend
    async obtenerTodosDespacho() {
      let resultado = await servicioDespacho.obtenerTodosDespacho();
      this.asignarListaDespacho(resultado.data);
    },
  },


  watch: {
    // Cada vez que se abre el dialog, se resetean las validaciones de los formularios despacho y detalledespacho
    dialogoNuevoDespacho() {
      if (this.dialogoNuevoDespacho) {
        setTimeout(() => {
          this.$refs.componenteFormularioDespacho.$refs.formularioDespacho.resetValidation();
          this.$refs.componenteFormularioDetalleDespacho.$refs.formularioDetalleDespacho.resetValidation();

          this.n_step = 1;
          this.btn_nombre_step = "Siguiente";
        }, 100);
      }
    },
  },
};
</script>

<style scoped>
.py-top {
  padding: 0 16px !important;
}
</style>
