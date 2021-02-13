<template>
  <v-dialog v-model="dialogoNuevaMaleza" scrollable max-width="800px" transition="dialog-transition" :fullscreen="$vuetify.breakpoint.xs ? true : false">
    <v-card tile>
      <!-- Barra de titulo -->
      <v-card-title class="justify-center primary--text">
        <h5 class="pl-3">Registrar nuevo Control de Maleza</h5>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon class="primary--text" @click="cerrarDialogoNuevaMaleza()">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-top">
        <!-- Formulario para registrar nuevo Control de Maleza -->
        <FormularioMaleza ref="componenteFormularioMaleza"></FormularioMaleza>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo Control de Maleza -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          :disabled="validarBtnAgregarMaleza()"
          @click="registrar()">
          Registrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import FormularioMaleza from "../components/FormMaleza";
import servicioMalezaControl from "../services/ServicioMalezaControl";

export default {
  name: "DialogoNuevaMaleza",

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
    ...mapState("moduloMaleza", ["formMalezaValido", "maleza", "listaMalezaControl"]),

  },

  methods: {
    // Vacia el modelo maleza
    ...mapMutations("moduloMaleza", ["vaciarMaleza", "asignarListaMaleza"]),


    // INSERT: Agrega una Nueva Maleza
    async registrar() {
      try {
        console.log(this.maleza);
        let respuestaServicioMaleza = await servicioMalezaControl.crearMalezaControl(this.maleza);
        if(respuestaServicioMaleza.status == 201){
          this.cerrarDialogoNuevaMaleza();
          this.obtenerTodosMalezaControl();
          this.vaciarMaleza();
          this.$toast.success(respuestaServicioMaleza.data.message);
        }else{
          console.log(error.response.data.message);
        }
      } catch (error) {
        //console.log(error.response.data.message);
        this.$toast.error(error.response.data.message);
      }
    },


    // Cierra DialogoNuevaMaleza
    cerrarDialogoNuevaMaleza() {
      this.dialogoNuevaMaleza = false;      // Cierra el DialogoNuevaMaleza
    },


    // Valida que el boton este activo si el formulario correspondiente a la seccion es valido
    validarBtnAgregarMaleza() {
      let validSelect = this.maleza.cultivoid == "" || this.maleza.cultivoid == null;
      return this.formMalezaValido && !validSelect ? false : true;
    },
    
    
    // Llena la listaLotes con datos del servidor backend
    async obtenerTodosMalezaControl() {
      let resultado = await servicioMalezaControl.obtenerTodosMalezaControl();
      this.asignarListaMaleza(resultado.data);
    },
  },

  watch: {
    // Cada vez que se abre el dialog, se resetean las validaciones del formulario
    dialogoNuevaMaleza() {
      if (this.dialogoNuevaMaleza) {
        setTimeout(() => {
          this.$refs.componenteFormularioMaleza.$refs.formularioMaleza.resetValidation();
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
