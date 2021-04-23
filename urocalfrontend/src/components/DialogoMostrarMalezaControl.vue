<template>
  <v-dialog v-model="dialogoMostrarMalezaControl" scrollable max-width="800px" transition="dialog-transition" :fullscreen="$vuetify.breakpoint.xs ? true : false">
    <v-card tile>
      <!-- Barra de titulo -->
      <v-card-title class="primary--text">
        <h5 class="pl-3">Actualizar/eliminar</h5>
        <v-spacer></v-spacer>
        <v-btn icon @click="desbloquearFormulario()">
          <v-icon class="primary--text">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="eliminar()">
          <v-icon class="primary--text">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon @click="closeDialogoMostrarMalezaControl()">
          <v-icon class="primary--text">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-top">
        <!-- Formulario para eliminar o actualizar Control de Maleza -->
        <FormularioMalezaControl ref="componenteFormularioMaleza"></FormularioMalezaControl>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo Lote -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false" 
          color="primary"
          large
          width="200px"
          :disabled="bloqueoBotonCambios()"
          @click="guardarCambios()"
          >Guardar cambios
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import FormularioMalezaControl from "@/components/FormMaleza";
import servicioMalezaControl from "../services/ServicioMalezaControl";


export default {
  name: "NuevoMalezaControl",

  components: {
    FormularioMalezaControl,
  },

  //OJO
  data() {
    return {};
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogoMostrarMalezaControl
    dialogoMostrarMalezaControl: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoMostrarMalezaControl"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogoMostrarMalezaControl",v);
      },
    },


    // Obtiene la variable bloquearCamposFormMalezaControl
    bloquearCamposFormMalezaControl: {
      get() {
        return this.$store.getters["moduloMaleza/bloquearCamposFormMalezaControl"];
      },
      set(v) {
        return this.$store.commit("moduloMaleza/cambiarBloquearCamposFormMaleza", v);
      },
    },


    // Obtiene el modelo Control Maleza
    maleza: {
      get() {
        return this.$store.getters["moduloMaleza/maleza"];
      },
      set(v) {
        return this.$store.commit("moduloMaleza/agregarMaleza", v);
      },
    },


    // Obtiene la variable que indica si el formulario es valido
    formMalezaValido: {
      get() {
        return this.$store.getters["moduloMaleza/formMalezaValido"];
      },
      set(v) {
        return this.$store.commit("moduloMaleza/cambiarEstadoFormMalezaValido", v);
      },
    },
  },

  methods: {
    
    // Vacia el modelo maleza
    ...mapMutations("moduloMaleza", ["vaciarMaleza", "asignarListaMaleza"]),


    closeDialogoMostrarMalezaControl() {
      this.dialogoMostrarMalezaControl = false; // Cierra el DialogoNuevaMaleza
      this.desbloquearFormulario();
    },


    // Desbloquea el formulario.
    desbloquearFormulario() {
      this.bloquearCamposFormMalezaControl = false;
      this.bloqueoBotonCambios();
    },


    // Desbloquea o bloquea el boton de guardar.
    bloqueoBotonCambios() {
      return !this.bloquearCamposFormMalezaControl && this.formMalezaValido ? false : true;
    },


    // Llena la listaLotes con datos del servidor backend
    async obtenerTodosMalezaControl() {
      let resultado = await servicioMalezaControl.obtenerTodosMalezaControl();
      this.asignarListaMaleza(resultado.data);
    },


    // Valida que el boton este activo si el formulario correspondiente a la seccion es valido
    validarBtnAgregarMaleza() {
      let validSelect = this.maleza.cultivoid == "" || this.maleza.cultivoid == null;
    },


    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    // CRUD: Update (Update) - Delete (Delete)


    // Actualiza la informacion.
    async guardarCambios() {
      try {
        //console.log(this.maleza);
        let respuesta = await servicioMalezaControl.actualizarMalezaControl(this.maleza);
        this.$toast.success(respuesta.data.message);
        this.obtenerTodosMalezaControl();
        this.bloquearCamposFormMalezaControl = true;
        this.bloqueoBotonCambios();
        this.closeDialogoMostrarMalezaControl();
      } catch (error) {
        console.log(error.response.data.message);
        this.$toast.error(error.response.data.message);
      }
    },


    // Elimina
    async eliminar() {
      try {
        let respuesta = await servicioMalezaControl.eliminarMalezaControl(this.maleza.controlmalezaid);
        this.$toast.warning(respuesta.data.message);
        this.obtenerTodosMalezaControl();
        this.bloquearCamposFormMalezaControl = true;
        this.bloqueoBotonCambios();
        this.closeDialogoMostrarMalezaControl();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },
  },


  watch: {
    // Cada vez que se abre el dialog, se resetean las validaciones de los formularios Lote, MedioAmbiente y Suelo, otras configuracioens más
    dialogoMostrarMalezaControl() {
      if (this.dialogoMostrarMalezaControl) {
        setTimeout(() => {
          this.$refs.componenteFormularioMaleza.$refs.formularioMaleza.resetValidation();
          this.bloquearCamposFormMalezaControl = true;
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
