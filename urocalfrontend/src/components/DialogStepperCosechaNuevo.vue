<template>
  <v-dialog
    v-model="dialogStepperCosechaNuevo"
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
          {{ $vuetify.breakpoint.xs ? tituloDialog() : "Registrar nuevo cosecha" }}
        </h5>
        <v-spacer></v-spacer>
        <div v-if="n_step > 1">
          <v-btn icon>
            <!-- <v-icon class="white--text" @click="atras()">mdi-arrow-left-bold</v-icon> -->
          </v-btn>
        </div>
        <v-btn icon>
          <v-icon class="white--text" @click="cerrarDialogStepperCosechaNuevo()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text class="py-top">
          <FormCosecha ref="componentFormCosecha"></FormCosecha>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo cosecha -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          :disabled="validarBtnAgregarCosecha()"
          @click="registrar()"
          >{{ 'registrar' }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormCosecha from "@/components/FormCosecha";
import FormTratamiento from "@/components/FormTratamiento";
import ServicioCosecha from '../services/ServicioCosecha';


export default {
  name: "DialogStepperCosechaNuevo",

  components: {
    FormCosecha,
    FormTratamiento,
    
  },

  data() {
    return {
      n_step: 1, // Almacena el número de paso
      btn_nombre_step: "Siguiente", // Nombre del botón de paso a paso
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogStepperLoteNuevo
    dialogStepperCosechaNuevo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogStepperCosechaNuevo"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogStepperCosechaNuevo", v);
      },
    },

    // Obtiene es estado de la variable validFormLot y el modelo cosecha
    ...mapState("moduloCosecha", ["formCosechaValido", "cosecha"]),

    // Obtiene es estado de la variable validFormEnvironment y el modelo environment
    ...mapState("moduloTratamiento", ["formTratamientoValido", "tratamiento"]),
  },

  methods: {
    // Vacia el modelo lot
    ...mapMutations("moduloCosecha", ["vaciarCosecha","asignarListaCosecha"]),

    // Vacia el modelo environment
    ...mapMutations("moduloTratamiento", ["vaciarTratamiento"]),

    async registrar() {
      try {
        console.log(this.siembra);
        let respuestaServicioCosecha = await ServicioCosecha.crearCosecha(this.cosecha);
        if(respuestaServicioCosecha.status == 201){
          this.cerrarDialogStepperCosechaNuevo()
          this.obtenerTodosCosecha();
          this.vaciarCosecha();
          this.$toast.success(respuestaServicioCosecha.data.message);
        }else{
          console.log(error.response.data.message);
        }
      } catch (error) {
        //console.log(error.response.data.message);
        this.$toast.error(error.response.data.message);
      }
    },

    validarBtnAgregarCosecha() {
      let validSelect = this.cosecha.cultivoid== "" || this.cosecha.cultivoid == null;
      return this.formCosechaValido && !validSelect ? false : true;
    },

    cerrarDialogoNuevaCosecha() {
      this.dialogStepperCosechaNuevo = false; // Cierra el DialogoNuevaSiembra
    },
    async obtenerTodosCosecha() {
      let resultado = await ServicioCosecha.obtenerTodosCosecha();
      this.asignarListaCosecha(resultado.data);
      //console.log(this.listaMalezaControl);
    },
    // Registra dependiendo el tab donde se encuentre
    // registrar() {
    //   switch (this.n_step) {
    //     case 1:
    //       this.n_step++;
    //       console.log(this.cosecha);
    //       break;
    //     case 2:
    //       this.n_step++;
    //       console.log(this.medAmbiente);
    //       this.btn_nombre_step = "Registrar";
    //       break;
    //     case 3:
    //       this.n_step = 1;
    //       this.cerrarDialogStepperCosechaNuevo();
    //       break;

    //     default:
    //       this.cerrarDialogStepperCosechaNuevo();
    //   }
    // },

    cerrarDialogStepperCosechaNuevo() {
      this.n_step = 1;
      this.btn_nombre_step = 'Siguiente';
      this.dialogStepperCosechaNuevo = !this.dialogStepperCosechaNuevo; // Cierra el DialogStepperLoteNuevo
      //this.$refs.componentFormCosecha.$refs.formCosecha.resetValidation(); // Reinicia las validaciones del formLot
      //this.$refs.componentFormTratamiento.$refs.formTratamiento.resetValidation(); // Reinicia las validaciones del formEnvironment
      this.vaciarCosecha(); // Vacia el modelo Lote
      this.vaciarTratamiento(); // Vacia el modelo MedioAmbiente
    },

    // Cambia el titulo del dialogo
    // tituloDialog() {
    //   switch (this.n_step) {
    //     case 1:
    //       return "Cosecha";
    //       break;
    //     case 2:
    //       return "Tratamiento";
    //       break;
        
    //   }
    // },

    // Retorna un paso atras en el stepper
    // atras() {
    //   this.n_step--;
    //   this.btn_nombre_step = "Siguiente";
    // },

    // // Valida que el boton este activo si el formulario correspondiente a la seccion es valido
    // validarBtnAgregarCosecha() {
    //   let seletValido = this.cosecha.cultivoid== "" || this.cosecha.cultivoid == null;
    //   //let CheckboxesValidos = this.listaIDsProductos.length == 0;
    //   switch (this.n_step) {
    //     case 1:
    //       /*if (this.validFormLot && !seletValido) {
    //         return false;
    //       } else {
    //         return true;
    //       }*/
    //       return false;
    //       break;
    //     case 2:
    //       //return CheckboxesValidos ? true : false;
    //       return false;
    //       break;
        
    //   }
    // },
  },
};
</script>
