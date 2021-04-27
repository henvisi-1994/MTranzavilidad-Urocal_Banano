<template>
  <v-dialog
    v-model="dialogStepperLoteNuevo"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
  >
    <v-card class="rounded-0" height="530px">
      <!-- Barra de titulo -->
      <v-card-title class="white primary--text">
        <h5>
          {{ $vuetify.breakpoint.xs ? tituloDialog() : "Registrar nuevo lote" }}
        </h5>
        <v-spacer></v-spacer>
        <div v-if="n_step > 1">
          <v-btn icon @click="atras()">
            <v-icon class="primary--text">mdi-arrow-left-bold</v-icon>
          </v-btn>
        </div>
        <v-btn icon @click="cerrarDialogStepperLoteNuevo()">
          <v-icon class="primary--text">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <!-- Stepper -->
        <v-stepper v-model="n_step" class="elevation-0">
          <v-stepper-header>
            <v-stepper-step step="1"> Lote </v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step step="2"> Cultivo </v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step step="3"> Análisis de medio ambiente </v-stepper-step>
            <v-divider></v-divider>

            <v-stepper-step step="4"> Análisis de suelo </v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-container>
              <v-stepper-content step="1" class="pa-1">
                <!-- Formulario para registrar lote -->
                <FormLote ref="componentFormLote"></FormLote>
              </v-stepper-content>

              <v-stepper-content step="2" class="pa-1">
                <!-- Formulario para registrar cultivo -->
                <FormCultivo></FormCultivo>
              </v-stepper-content>

              <v-stepper-content step="3" class="pa-1">
                <!-- Formulario para registrar medio ambiente -->
                <FormMedioAmbiente ref="componentFormMedioAmbiente"></FormMedioAmbiente>
              </v-stepper-content>

              <v-stepper-content step="4" class="pa-1">
                <!-- Formulario para registrar suelo -->
                <FormSuelo ref="componentFormSuelo"></FormSuelo>
              </v-stepper-content>
            </v-container>
          </v-stepper-items>
        </v-stepper>
        <!-- Fin: Stepper -->
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Lote -->
        <v-btn
            
          width="300px" large
          color="primary"
          :disabled="validarBtnAgregarLote()"
          @click="registrar()"
          >{{ btn_nombre_step }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormLote from "../components/FormLote";
import FormCultivo from "../components/FormCultivo";
import FormMedioAmbiente from "../components/FormMedioAmbiente";
import FormSuelo from "../components/FormSuelo";

import servicioLote from "../services/ServicioLote";
import servicioCultivo from "../services/ServicioCultivo";
import servicioMedioAmbiente from "../services/ServicioMedioAmbiente";
import servicioSuelo from "../services/ServicioSuelo";

export default {
  name: "DialogStepperLoteNuevo",

  components: {
    FormLote,
    FormCultivo,
    FormMedioAmbiente,
    FormSuelo,
  },

  data() {
    return {
      n_step: 1, // Almacena el número de paso
      btn_nombre_step: "Siguiente", // Nombre del botón de paso a paso
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogStepperLoteNuevo
    dialogStepperLoteNuevo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogStepperLoteNuevo"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogStepperLoteNuevo", v);
      },
    },


     // Obtiene la variable bloquearCamposFormLote
    bloquearCamposFormLote: {
      get() {
        return this.$store.getters["moduloLote/bloquearCamposFormLote"];
      },
      set(v) {
        return this.$store.commit("moduloLote/cambiarBloquearCamposFormLote", v);
      },
    },

    // Obtiene la variable bloquearCamposFormCultivo
    bloquearCamposFormCultivo: {
      get() {
        return this.$store.getters["moduloCultivo/bloquearCamposFormCultivo"];
      },
      set(v) {
        return this.$store.commit("moduloCultivo/cambiarBloquearCamposFormCultivo", v);
      },
    },

    // Obtiene la variable bloquearCamposFormMedioAmbiente
    bloquearCamposFormMedioAmbiente: {
      get() {
        return this.$store.getters["moduloMedioAmbiente/bloquearCamposFormMedioAmbiente"];
      },
      set(v) {
        return this.$store.commit(
          "moduloMedioAmbiente/cambiarBloquearCamposFormMedioAmbiente",
          v
        );
      },
    },
    

    // Obtiene es estado de la variable validFormLot y el modelo lot
    ...mapState("moduloLote", ["formLoteValido", "lote", "listaLotes"]),

    // Obtiene es estado de la variable validFormEnvironment y el modelo environment
    ...mapState("moduloMedioAmbiente", ["formMedioAmbienteValido", "medAmbiente"]),

    // Obtiene es estado de la variable validFormSoil y el modelo soil
    ...mapState("moduloSuelo", ["formSueloValido", "suelo"]),

    // Obtiene la lista de IDs de productos
    ...mapState("moduloProducto", ["listaIDsProductos"]),
  },

  methods: {
    // Obtiene mutaciones del moduloLote
    ...mapMutations("moduloLote", ["vaciarLote", "asignarListaLotes"]),

    // Vacia el modelo environment
    ...mapMutations("moduloMedioAmbiente", ["vaciarMedioAmbiente"]),

    // Vacia el modelo soil
    ...mapMutations("moduloSuelo", ["vaciarSuelo"]),

    // Vacia la lista de IDs de productos
    ...mapMutations("moduloProducto", ["vaciarlistaIDsProductos"]),

    // Registra dependiendo el tab donde se encuentre
    async registrar() {
      switch (this.n_step) {
        case 1:
          this.n_step++;
          break;
        case 2:
          this.n_step++;
          break;
        case 3:
          this.n_step++;
          this.btn_nombre_step = "Registrar";
          break;
        case 4:
          try {
            let respuestaServicioLote = await servicioLote.crearLote(this.lote);

            this.medAmbiente.lotecultivadoid = respuestaServicioLote.data.lotecultivadoid; // Agrega lotecultivadoid al objeto medAmbiente
            this.suelo.lotecultivadoid = respuestaServicioLote.data.lotecultivadoid; // Agrega lotecultivadoid al objeto suelo

            await servicioMedioAmbiente.crearMedioAmbiente(this.medAmbiente);
            await servicioSuelo.crearSuelo(this.suelo);

            // Recorre la lista de IDs seleccionados y crea un objeto cultivo para enviarlo al backend
            this.listaIDsProductos.forEach(async (productoID) => {
              let cultivo = {
                lotecultivadoid: respuestaServicioLote.data.lotecultivadoid,
                productoid: productoID,
              };
              console.log(cultivo);
              await servicioCultivo.crearCultivo(cultivo);
            });

            this.obtenerTodosLote();
            this.vaciarLote();
            this.vaciarMedioAmbiente();
            this.vaciarSuelo();
            this.vaciarlistaIDsProductos();
            this.$toast.success(respuestaServicioLote.data.message);
            this.n_step = 1;
            this.cerrarDialogStepperLoteNuevo();
          } catch (error) {
            //console.log(error.response.data.message);
            this.$toast.error(error.response.data.message);
          }
          break;

        default:
          this.cerrarDialogStepperLoteNuevo();
      }
    },

    // Cierra DialogStepperLoteNuevo
    cerrarDialogStepperLoteNuevo() {
      this.dialogStepperLoteNuevo = false;
    },

    // Cambia el titulo del dialogo
    tituloDialog() {
      switch (this.n_step) {
        case 1:
          return "Lote";
          break;
        case 2:
          return "Cultivo";
          break;
        case 3:
          return "Análisis de medio ambiente";
          break;
        case 4:
          return "Análisis de suelo";
          break;
      }
    },

    // Retorna un paso atras en el stepper
    atras() {
      this.n_step--;
      this.btn_nombre_step = "Siguiente";
    },

    // Valida que el boton este activo si el formulario correspondiente a la seccion es valido
    validarBtnAgregarLote() {
      let selectValido = this.lote.fincaid == "" || this.lote.fincaid == null;
      let CheckboxesValidos = this.listaIDsProductos.length == 0;
      switch (this.n_step) {
        case 1:
          return this.formLoteValido && !selectValido ? false : true;
          break;
        case 2:
          return CheckboxesValidos ? true : false;
          break;
        case 3:
          return this.formMedioAmbienteValido ? false : true;
          break;
        case 4:
          return this.formSueloValido ? false : true;
          break;
      }
    },

    // Llena la listaLotes con datos del servidor backend
    async obtenerTodosLote() {
      let resultado = await servicioLote.obtenerTodosLote();
      this.asignarListaLotes(resultado.data);
    },
  },

  watch: {
    // Cada vez que se abre el dialog, se resetean las validaciones de los formularios Lote, MedioAmbiente y Suelo
    dialogStepperLoteNuevo() {
      if (this.dialogStepperLoteNuevo) {
        setTimeout(() => {
          this.$refs.componentFormLote.$refs.formLote.resetValidation();
          this.$refs.componentFormMedioAmbiente.$refs.formMedioAmbiente.resetValidation();
          this.$refs.componentFormSuelo.$refs.formSuelo.resetValidation();

          this.bloquearCamposFormLote = false;
          this.bloquearCamposFormCultivo = false;
          this.bloquearCamposFormMedioAmbiente = false;
          this.bloquearCamposFormSuelo = false;


          this.n_step = 1;
          this.btn_nombre_step = "Siguiente";
        }, 100);
      }
    },
  },
};
</script>
