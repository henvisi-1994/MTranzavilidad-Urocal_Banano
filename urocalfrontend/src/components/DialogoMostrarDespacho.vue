<template>
  <v-dialog v-model="dialogoMostrarDespacho" scrollable max-width="800px" transition="dialog-transition" :fullscreen="$vuetify.breakpoint.xs ? true : false" >
    <v-card class="rounded-0" height="480px">
      <!-- Barra de titulo -->
      <v-card-title class="primary--text">
        <h5>Actualizar/eliminar</h5>
        <v-spacer></v-spacer>
        <v-btn icon @click="desbloquearFormulario()">
          <v-icon class="primary--text">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="eliminar()">
          <v-icon class="primary--text">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon @click="cerrarDialogoMostrarDespacho()">
          <v-icon class="primary--text">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text class="py-top">
        <!-- Tabs -->
        <v-tabs
          v-model="tab"
          background-color="primary--text"
          show-arrows
          center-active
          fixed-tabs
          ref="componentTab"
        >
          <v-tab href="#formularioDespacho"> Despacho </v-tab>
          <v-tab href="#formularioDetalleDespacho"> Detalle </v-tab>
        </v-tabs>
        <v-divider></v-divider>

        <v-tabs-items v-model="tab">
          <v-tab-item key="formularioDespacho" value="formularioDespacho" eager>
            <v-card flat>
              <v-card-text>
                <FormularioDespacho ref="componenteFormularioDespacho"></FormularioDespacho>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item key="formularioDetalleDespacho" value="formularioDetalleDespacho" eager>
            <v-card flat>
              <v-card-text>
                <FormularioDetalleDespacho ref="componenteFormularioDetalleDespacho"></FormularioDetalleDespacho>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
        <!-- Fin: Tabs -->
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo Lote -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          color="primary"
          large
          width="200px"
          :disabled="bloqueoBotonCambios()"
          @click="guardarCambios()" >
          Guardar cambios</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import FormularioDespacho from "@/components/FormDespacho";
import FormularioDetalleDespacho from "@/components/FormDetalleDespacho";

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
      tab: "formularioDespacho",  // Gestiona los tabs
    };
  },

  computed: {

    // Obtiene y modifica el estado de la variable dialogoMostrarDespacho
    dialogoMostrarDespacho: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoMostrarDespacho"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogoMostrarDespacho",v);
      },
    },


    // Obtiene la variable bloquearCamposFormDespacho
    bloquearCamposFormDespacho: {
      get() {
        return this.$store.getters["moduloDespacho/bloquearCamposFormDespacho"];
      },
      set(v) {
        return this.$store.commit("moduloDespacho/cambiarBloquearCamposFormDespacho", v);
      },
    },


    // Obtiene la variable bloquearCamposFormDetalleDespacho
    bloquearCamposFormDetalleDespacho: {
      get() {
        return this.$store.getters["moduloDetalleDespacho/bloquearCamposFormDetalleDespacho"];
      },
      set(v) {
        return this.$store.commit("moduloDetalleDespacho/cambiarBloquearCamposFormDetalleDespacho", v);
      },
    },


    // Obtiene el modelo despacho
    despacho: {
      get() {
        return this.$store.getters["moduloDespacho/despacho"];
      },
      set(v) {
        return this.$store.commit("moduloDespacho/agregarDespacho", v);
      },
    },


    // Obtiene el modelo detalledespacho
    detalledespacho: {
      get() {
        return this.$store.getters["moduloDetalleDespacho/detalledespacho"];
      },
      set(v) {
        return this.$store.commit("moduloDetalleDespacho/agregarDetalleDespacho", v);
      },
    },


    // Obtiene la variable que indica si el formulario es valido
    formDespachoValido: {
      get() {
        return this.$store.getters["moduloDespacho/formDespachoValido"];
      },
      set(v) {
        return this.$store.commit("moduloDespacho/cambiarEstadoFormDespachoValido",v);
      },
    },


    // Obtiene la variable que indica si el formulario es valido
    formDetalleDespachoValido: {
      get() {
        return this.$store.getters["moduloDetalleDespacho/formDetalleDespachoValido"];
      },
      set(v) {
        return this.$store.commit("moduloDetalleDespacho/cambiarEstadoFormDetalleDespachoValido", v);
      },
    },
  },

  methods: {

    // Obtiene mutaciones del moduloDespacho
    ...mapMutations("moduloDespacho", ["vaciarDespacho", "asignarListaDespacho"]),

    // Vacia el modelo moduloDetalleDespacho
    ...mapMutations("moduloDetalleDespacho", ["vaciarDetalleDespacho"]),


    cerrarDialogoMostrarDespacho() {
      this.dialogoMostrarDespacho = false; // Cierra el DialogoNuevoDespacho
      this.desbloquearFormulario();
    },


    // Desbloquea el formulario, segun el tab en donde se encuentre
    desbloquearFormulario() {
      this.bloquearCamposFormDespacho = false;
      this.bloquearCamposFormDetalleDespacho = false;
      this.bloqueoBotonCambios();
    },


    // Desbloquea o bloquea el boton de guardar cambios segun el tab donde se encuentre
    bloqueoBotonCambios() {
      switch (this.tab) {
        case "formularioDespacho":
          return !this.bloquearCamposFormDespacho && this.formDespachoValido ? false : true;
          break;
        case "formularioDetalleDespacho":
          return !this.bloquearCamposFormDetalleDespacho && this.formDetalleDespachoValido ? false : true;
          break;
      }
    },


    // Actualiza la informacion segun el tab donde se encuentre
    async guardarCambios() {
      switch (this.tab) {
        case "formularioDespacho":
          try {
            let respuesta = await servicioDespacho.actualizarDespacho(this.despacho);
            this.$toast.success(respuesta.data.message);
            this.obtenerTodosDespacho();
            this.bloquearCamposFormDespacho = true;
            this.bloqueoBotonCambios();
            this.cerrarDialogoMostrarDespacho();
          } catch (error) {
            this.$toast.error(error.response.data.message);
          }
          break;
        case "formularioDetalleDespacho":
          // Si no existe un registro de detalledespacho para este despacho, registra, caso contrario actualiza su informacion
          if (this.detalledespacho.despachoid === undefined) {
            try {
              this.detalledespacho.despachoid = this.despacho.despachoid; // Agrega despachoid al objeto detalledespacho
              let respuesta = await servicioDetalleDespacho.crearDetalleDespacho(this.detalledespacho);
              this.$toast.success(respuesta.data.message);
              this.obtenerTodosDespacho();
              this.bloquearCamposFormDetalleDespacho = true;
              this.bloqueoBotonCambios();
            } catch (error) {
              this.$toast.error(error.response.data.message);
            }
          } else {
            try {
              let respuesta = await servicioDetalleDespacho.actualizarDetalleDespacho(this.detalledespacho);
              this.$toast.success(respuesta.data.message);
              this.obtenerTodosDespacho();
              this.bloquearCamposFormDetalleDespacho = true;
              this.bloqueoBotonCambios();
            } catch (error) {
              this.$toast.error(error.response.data.message);
            }
          }
        break;
      }
    },


    // Llena la listaDespacho con datos del servidor backend
    async obtenerTodosDespacho() {
      let resultado = await servicioDespacho.obtenerTodosDespacho();
      this.asignarListaDespacho(resultado.data);
    },


    // Elimina segun el tab donde se encuentre
    async eliminar() {
      switch (this.tab) {
        case "formularioDespacho":
          try {
            let respuesta = await servicioDespacho.eliminarDespacho(this.despacho.despachoid);
            this.$toast.success(respuesta.data.message);
            this.obtenerTodosDespacho();
            this.cerrarDialogoMostrarDespacho();
          } catch (error) {
            this.$toast.error(error.response.data.message);
          }
          break;
        case "formularioDetalleDespacho":
          try {
            let respuesta = await servicioDetalleDespacho.eliminarDetalleDespacho(this.detalledespacho.despachoid);
            this.$toast.success(respuesta.data.message);
            this.obtenerTodosDespacho();
            this.detalledespacho = {};
            this.$refs.componenteFormularioDetalleDespacho.$refs.formularioDetalleDespacho.resetValidation();
          } catch (error) {
            this.$toast.error(error.response.data.message);
          }
        break;
      }
    },
  },


  watch: {
      // Cada vez que se abre el dialog, se resetean las validaciones de los formularios despacho y detalledespacho, otras configuraciones más
      dialogoMostrarDespacho() {
        if (this.dialogoMostrarDespacho) {
          setTimeout(() => {
            this.$refs.componenteFormularioDespacho.$refs.formularioDespacho.resetValidation();
            this.$refs.componenteFormularioDetalleDespacho.$refs.formularioDetalleDespacho.resetValidation();
            this.tab = "formularioDespacho";
            this.bloquearCamposFormDespacho = true;
            this.bloquearCamposFormDetalleDespacho = true;
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
