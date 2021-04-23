<template>
  <v-dialog
    v-model="dialogTabMostrarCosecha"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0" height="530px">
      <!-- Barra de titulo -->
      <v-card-title class="white primary--text">
        <h5 class="pl-3">Actualizar/eliminar</h5>
        <v-spacer></v-spacer>
        <v-btn icon @click="desbloquearFormulario()">
          <v-icon class="primary--text">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="eliminar()">
          <v-icon class="primary--text">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon @click="closeDialogTabMostrarCosecha()">
          <v-icon class="primary--text">mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

        <v-card-text class="py-top">
          <!-- Formulario para eliminar o actualizar Cosecha -->
          <FormCosecha  ref="componentFormCosecha"></FormCosecha>
        </v-card-text>
         <v-card-actions class="justify-center">
        <!-- Botón para agregar nueva Cosecha -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false" 
          color="primary"
          large
          width="300px" elevation="0"
          :disabled="bloqueoBotonCambios()"
          @click="guardarCambios()"
          >{{'Guardar cambios'}}
        </v-btn>
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
  name: "TabsMostrarCosecha",

  components: {
    FormCosecha,
    //FormTratamiento,
  },

  data() {   
    return {
      tab: "FormCosecha",
      preeditar:null,
      noeditar: true,
    };
  },
  
  computed: {
    // Obtiene y modifica el estado de la variable dialogTabMostrarCosecha
    dialogTabMostrarCosecha: {
      get() {
        return this.$store.getters["gestionDialogos/dialogTabMostrarCosecha"];
      },
      set(v) {
        //this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogTabMostrarCosecha", v);
      },
    },

    // Obtiene la variable que indica si el formulario es valido
    formCosechaValido: {
      get() {
        return this.$store.getters["moduloCosecha/formCosechaValido"];
      },
      set(v) {
        return this.$store.commit("moduloCosecha/cambiarEstadoFormCosechaValido", v);
      },
    },

    cosecha: {
      get() {
        return this.$store.getters["moduloCosecha/cosecha"];
      },
      set(v) {
        return this.$store.commit("moduloCosecha/setCosecha", v);
      },
    },

    listaCosechaStore:{
       get() {
        return JSON.parse(
          JSON.stringify(this.$store.getters["moduloCosecha/listaCosechaStore"])
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloCosecha/asignarListaCosecha",
          v
        );
      },
    },
    bloquearCamposFormCosecha:{
      get() {
        return this.$store.getters["moduloCosecha/bloquearCamposFormCosecha"];
      },
      set(v) {
        return this.$store.commit("moduloCosecha/cambiarBloquearCamposFormCosecha", v);
      },
    },
  },

  

    
  methods: {

      closeDialogTabMostrarCosecha() {
      this.dialogTabMostrarCosecha = false; // Cierra el DialogoNuevaSiembra
      this.desbloquearFormulario();
    },

    // Desbloquea el formulario.
    desbloquearFormulario() {
      this.bloquearCamposFormCosecha = false;
      this.bloqueoBotonCambios();
    },

    // Desbloquea o bloquea el boton de guardar.
    bloqueoBotonCambios() {
      return !this.bloquearCamposFormCosecha && this.formCosechaValido ? false : true;
    },
    

     // Llena la listaSemilla con datos del servidor backend
    async obtenerTodosCosecha() {
      let resultado = await ServicioCosecha.obtenerTodosCosecha();
      //this.asignarListaCosecha(resultado.data);
      this.listaCosechaStore = resultado.data;
      //console.log(this.listaMalezaControl);
    },


    // Valida que el boton este activo si el formulario correspondiente a la seccion es valido
    /*validarBtnActualizarCosecha() {
      let validSelect = this.cosecha.cultivoid== "" || this.cosecha.cultivoid == null;
      return this.formCosechaValido && !validSelect ? false : true;
    },*/

    // UPDATE: Actualiza un registro
    async guardarCambios() {
      try {
        //console.log(this.siembra);
        let respuesta = await ServicioCosecha.actualizarCosecha(this.cosecha);
        this.$toast.success(respuesta.data.message);
        this.obtenerTodosCosecha();     ;
        this.closeDialogTabMostrarCosecha();
      } catch (error) {
        console.log(error.response.data.message);
        this.$toast.error(error.response.data.message);
      }
    },

    async eliminar() {
      try {
        //console.log(this.siembra);
        let respuesta = await ServicioCosecha.eliminarCosecha(this.cosecha.cosechaid);
        this.$toast.warning(respuesta.data.message);
        this.obtenerTodosCosecha();        
        this.closeDialogTabMostrarCosecha();
      } catch (error) {
        //this.console.log(error.response.data.message);
        this.$toast.error(error.response.data.message);
      }
    },
    mounted(){
      this.obtenerTodosCosecha();
    },
  },
  /*watch: {
    // Cada vez que se abre el dialog, se resetean las validaciones de los formularios Lote, MedioAmbiente y Suelo, otras configuracioens más
    dialogTabMostrarCosecha() {
      if (this.dialogTabMostrarCosecha) {
        setTimeout(() => {
          this.$refs.componentFormCosecha.$refs.FormCosecha.resetValidation();
          this.bloquearCamposFormCosecha = true;
        }, 100);
      }
    },
  },*/
};
 
</script>
