<template>
  <v-dialog
    v-model="dialogStepperLoteNuevo"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0" height="530px">
      <!-- Barra de titulo -->
      <v-card-title class="primary white--text">
        <h5>
          {{ $vuetify.breakpoint.xs ? tituloDialog() : "Registrar nuevo lote" }}
        </h5>
        <v-spacer></v-spacer>
        <div v-if="n_step > 1">
          <v-btn icon>
            <v-icon class="white--text" @click="atras()">mdi-arrow-left-bold</v-icon>
          </v-btn>
        </div>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogStepperLoteNuevo()"
            >mdi-close</v-icon
          >
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
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
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

import FormLote from "@/components/FormLote";
import FormCultivo from "@/components/FormCultivo";
import FormMedioAmbiente from "@/components/FormMedioAmbiente";
import FormSuelo from "@/components/FormSuelo";

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

    // Obtiene es estado de la variable validFormLot y el modelo lot
    ...mapState("moduloLote", ["formLoteValido", "lote"]),

    // Obtiene es estado de la variable validFormEnvironment y el modelo environment
    ...mapState("moduloMedioAmbiente", ["formMedioAmbienteValido", "medAmbiente"]),

    // Obtiene es estado de la variable validFormSoil y el modelo soil
    ...mapState("moduloSuelo", ["formSueloValido", "suelo"]),

    // Obtiene la lista de IDs de productos
    ...mapState("moduloProducto", ["listaIDsProductos"]),
  },

  methods: {
    // Vacia el modelo lot
    ...mapMutations("moduloLote", ["vaciarLote"]),

    // Vacia el modelo environment
    ...mapMutations("moduloMedioAmbiente", ["vaciarMedioAmbiente"]),

    // Vacia el modelo soil
    ...mapMutations("moduloSuelo", ["vaciarSuelo"]),

    // Vacia la lista de IDs de productos
    ...mapMutations("moduloProducto", ["vaciarlistaIDsProductos"]),

    // Registra dependiendo el tab donde se encuentre
    registrar() {
      switch (this.n_step) {
        case 1:
          this.n_step++;
          console.log(this.lote);
          break;
        case 2:
          this.n_step++;
          console.log(this.listaIDsProductos);
          break;
        case 3:
          this.n_step++;
          console.log(this.medAmbiente);
          this.btn_nombre_step = "Registrar";
          break;
        case 4:
          this.n_step = 1;
          this.cerrarDialogStepperLoteNuevo();
          break;

        default:
          this.cerrarDialogStepperLoteNuevo();
      }
    },

    cerrarDialogStepperLoteNuevo() {
      this.n_step = 1;
      this.btn_nombre_step = 'Siguiente';
      this.dialogStepperLoteNuevo = !this.dialogStepperLoteNuevo; // Cierra el DialogStepperLoteNuevo
      this.$refs.componentFormLote.$refs.formLote.resetValidation(); // Reinicia las validaciones del formLot
      this.$refs.componentFormMedioAmbiente.$refs.formMedioAmbiente.resetValidation(); // Reinicia las validaciones del formEnvironment
      this.$refs.componentFormSuelo.$refs.formSuelo.resetValidation(); // Reinicia las validaciones del formSoil
      this.vaciarLote(); // Vacia el modelo Lote
      this.vaciarMedioAmbiente(); // Vacia el modelo MedioAmbiente
      this.vaciarSuelo(); // Vacia el modelo Suelo
      this.vaciarlistaIDsProductos(); // Vacia la listaIDsProductos
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
      let seletValido = this.lote.fincaId == "" || this.lote.fincaId == null;
      let CheckboxesValidos = this.listaIDsProductos.length == 0;
      switch (this.n_step) {
        case 1:
          /*if (this.validFormLot && !seletValido) {
            return false;
          } else {
            return true;
          }*/
          return false;
          break;
        case 2:
          //return CheckboxesValidos ? true : false;
          return false;
          break;
        case 3:
          return false;
          //return this.validFormEnvironment ? false : true;
          break;
        case 4:
          return false;
          break;
      }
    },
  },
};
</script>
