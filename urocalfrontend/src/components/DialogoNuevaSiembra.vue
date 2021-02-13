<template>
  <v-dialog v-model="dialogoNuevaSiembra" scrollable max-width="800px" transition="dialog-transition" :fullscreen="$vuetify.breakpoint.xs ? true : false" >
    <v-card tile>
      <!-- Barra de titulo -->
      <v-card-title class="justify-center primary--text">
        <h5 class="pl-3">Registrar nueva Siembra</h5>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon class="primary--text" @click="cerrarDialogoNuevaSiembra()" >mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text  class="py-top">
          <!-- Formulario para registrar una Siembra -->
          <FormSiembra ref="componenteFormularioSiembra"></FormSiembra>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nueva Siembra -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          :disabled="validarBtnAgregarSiembra()"
          @click="registrar()">
          Registrar 
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import FormSiembra from "@/components/FormSiembra";
import servicioSiembra from "../services/ServicioSiembra";

export default {
  name: "DialogoNuevaSiembra",

  components: {
    FormSiembra,
  },

  data() {
    return {};
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogoNuevaSiembra
    dialogoNuevaSiembra: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoNuevaSiembra"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogoNuevaSiembra", v);
      },
    },

    // Obtiene es estado de la variable formSiembraValido y el modelo siembra
    ...mapState("moduloSiembra", ["formSiembraValido", "siembra", "listaSiembra"]),

  },

  methods: {
    // Vacia el modelo siembra
    ...mapMutations("moduloSiembra", ["vaciarSiembra", "asignarListaSiembra"]),


    // INSERT: Agrega una Nueva Maleza
    async registrar() {
      try {
        console.log(this.siembra);
        let respuestaServicioSiembra = await servicioSiembra.crearSiembra(this.siembra);
        if(respuestaServicioSiembra.status == 201){
          this.cerrarDialogoNuevaSiembra();
          this.obtenerTodosSiembra();
          this.vaciarSiembra();
          this.$toast.success(respuestaServicioSiembra.data.message);
        }else{
          console.log(error.response.data.message);
        }
      } catch (error) {
        //console.log(error.response.data.message);
        this.$toast.error(error.response.data.message);
      }
    },

    // Cierra DialogoNuevaSiembra
    cerrarDialogoNuevaSiembra() {
      this.dialogoNuevaSiembra = false; // Cierra el DialogoNuevaSiembra
    },


    // Valida que el boton este activo si el formulario correspondiente a la seccion es valido
    validarBtnAgregarSiembra() {
      let validSelect = this.siembra.cultivoid == "" || this.siembra.cultivoid == null;
      return this.formSiembraValido && !validSelect ? false : true;
    },


    // Llena la listaSemilla con datos del servidor backend
    async obtenerTodosSiembra() {
      let resultado = await servicioSiembra.obtenerTodosSiembra();
      this.asignarListaSiembra(resultado.data);
      //console.log(this.listaMalezaControl);
    },
  },


  watch: {
    // Cada vez que se abre el dialog, se resetean las validaciones del formulario
    dialogoNuevaSiembra() {
      if (this.dialogoNuevaSiembra) {
        setTimeout(() => {
          this.$refs.componenteFormularioSiembra.$refs.formSiembra.resetValidation();
        }, 100);
      }
    },
  },
};
</script>
