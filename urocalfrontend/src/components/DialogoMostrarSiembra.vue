<template>
  <v-dialog v-model="dialogoMostrarSiembra" scrollable max-width="800px" transition="dialog-transition" :fullscreen="$vuetify.breakpoint.xs ? true : false" >
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
        <v-btn icon @click="closeDialogoMostrarSiembra()">
          <v-icon class="primary--text">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-top">
          <!-- Formulario para eliminar o actualizar Siembra -->
          <FormularioSiembra ref="componenteFormularioSiembra"></FormularioSiembra>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nueva Siembra -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false" 
          color="primary"
          large
          width="300px" elevation="0"
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
import FormularioSiembra from "@/components/FormSiembra";
import servicioSiembra from "../services/ServicioSiembra";

export default {
  name: "StepperNuevaSiembra",

  components: {
    FormularioSiembra,
  },

  //OJO
  data() {
    return {};
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogoMostrarSiembra
    dialogoMostrarSiembra: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoMostrarSiembra"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogoMostrarSiembra", v);
      },
    },


    // Obtiene la variable bloquearCamposFormSiembra
    bloquearCamposFormSiembra: {
      get() {
        return this.$store.getters["moduloSiembra/bloquearCamposFormSiembra"];
      },
      set(v) {
        return this.$store.commit("moduloSiembra/cambiarBloquearCamposFormSiembra", v);
      },
    },


    // Obtiene el modelo Control Maleza
    siembra: {
      get() {
        return this.$store.getters["moduloSiembra/siembra"];
      },
      set(v) {
        return this.$store.commit("moduloSiembra/agregarSiembra", v);
      },
    },


    // Obtiene la variable que indica si el formulario es valido
    formSiembraValido: {
      get() {
        return this.$store.getters["moduloSiembra/formSiembraValido"];
      },
      set(v) {
        return this.$store.commit("moduloSiembra/cambiarEstadoFormSiembraValido", v);
      },
    },
  },

  methods: {

    // Vacia el modelo siembra
    ...mapMutations("moduloSiembra", ["vaciarSiembra", "asignarListaSiembra"]),


    closeDialogoMostrarSiembra() {
      this.dialogoMostrarSiembra = false; // Cierra el DialogoNuevaSiembra
      this.desbloquearFormulario();
    },


    // Desbloquea el formulario.
    desbloquearFormulario() {
      this.bloquearCamposFormSiembra = false;
      this.bloqueoBotonCambios();
    },


    // Desbloquea o bloquea el boton de guardar.
    bloqueoBotonCambios() {
      return !this.bloquearCamposFormSiembra && this.formSiembraValido ? false : true;
    },


    // Llena la listaSemilla con datos del servidor backend
    async obtenerTodosSiembra() {
      let resultado = await servicioSiembra.obtenerTodosSiembra();
      this.asignarListaSiembra(resultado.data);
      //console.log(this.listaMalezaControl);
    },


    // Valida que el boton este activo si el formulario correspondiente a la seccion es valido
    validarBtnAgregarSiembra() {
      let validSelect = this.siembra.cultivoid == "" || this.siembra.cultivoid == null;
    },


    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    // CRUD: Update (Update) - Delete (Delete)


    // Actualiza la informacion.
    async guardarCambios() {
      try {
        //console.log(this.siembra);
        let respuesta = await servicioSiembra.actualizarSiembra(this.siembra);
        this.$toast.success(respuesta.data.message);
        this.obtenerTodosSiembra();
        this.bloquearCamposFormSiembra = true;
        this.bloqueoBotonCambios();
        this.closeDialogoMostrarSiembra();
      } catch (error) {
        console.log(error.response.data.message);
        this.$toast.error(error.response.data.message);
      }
    },


    // Elimina
    async eliminar() {
      try {
        //console.log(this.siembra);
        let respuesta = await servicioSiembra.eliminarSiembra(this.siembra.siembraid);
        this.$toast.warning(respuesta.data.message);
        this.obtenerTodosSiembra();
        this.bloquearCamposFormSiembra = true;
        this.bloqueoBotonCambios();
        this.closeDialogoMostrarSiembra();
      } catch (error) {
        //this.console.log(error.response.data.message);
        this.$toast.error(error.response.data.message);
      }
    },
  },


  watch: {
    // Cada vez que se abre el dialog, se resetean las validaciones de los formularios Lote, MedioAmbiente y Suelo, otras configuracioens más
    dialogoMostrarSiembra() {
      if (this.dialogoMostrarSiembra) {
        setTimeout(() => {
          this.$refs.componenteFormularioSiembra.$refs.formSiembra.resetValidation();
          this.bloquearCamposFormSiembra = true;
        }, 100);
      }
    },
  },
};
</script>
