<template>
  <v-dialog
    v-model="dialogMostrarAlmacenamiento"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    persistent
    eager
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="white primary--text">
        <h5>INFORMACIÓN</h5>
        <v-spacer></v-spacer>
        <v-btn 
          icon 
          v-if="tab == 'tabRevisionHumedad'"
          @click="bloquearCamposFormRevisionHumedad = false"
        >
          <v-icon class="primary--text">mdi-pencil</v-icon>
        </v-btn>
        <v-btn
          icon
          v-if="tab !== 'tabRevisionHumedad' && tab != 'tabListaRevisionHumedad'"
          @click="bloquearCamposFormAlmacenamiento = false"
        >
          <v-icon class="primary--text">mdi-pencil</v-icon>
        </v-btn>
       <v-btn
          icon
          v-if="tab !== 'tabRevisionHumedad' && tab != 'tabListaRevisionHumedad'"
          @click="eliminaralmacenamiento()"
        >
          <v-icon class="primary--text">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon @click="cerrarDialogMostrarAlmacenamiento()">
          <v-icon class="primary--text">mdi-close</v-icon>
        </v-btn> 
      </v-card-title>

      <!-- Formulario Almacenamiento -->
      <v-card-text style="padding: 0px">
        <!-- Tabs -->
        <v-tabs v-model="tab" show-arrows center-active fixed-tabs ref="componentTab" background-color="white">
          <v-tab href="#tabAlmacenamiento"> Almacenamiento </v-tab>
          <v-tab href="#tabRevisionHumedad"> Revisión humedad </v-tab>
          <v-tab v-if="$vuetify.breakpoint.xs" href="#tabListaRevisionHumedad">
            Lista Revisión humedad
          </v-tab>
        </v-tabs>
        <v-divider></v-divider>

        <v-tabs-items v-model="tab" class="mt-6">
          <v-tab-item key="tabAlmacenamiento" value="tabAlmacenamiento" eager>
            <v-container class="pb-0">
              <FormAlmacenamiento ref="componentFormAlmacenamiento"></FormAlmacenamiento>
            </v-container>
          </v-tab-item>

          <v-tab-item key="tabRevisionHumedad" value="tabRevisionHumedad" eager>
            <v-container class="pb-0">
              <FormRevisionHumedad
                ref="componentFormRevisionHumedad"
              ></FormRevisionHumedad>
              <v-card-actions class="justify-center pb-3">
<v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          :hidden="tab == 'tabListaRevisionHumedad'"
          width="300px"
          color="primary"
          :disabled="validarBotonCambios()"
          @click="guardarItem"
          >Guardar cambios</v-btn
        >
              </v-card-actions>
                 
              <div v-if="!$vuetify.breakpoint.xs">
                <v-divider></v-divider>

                <DatatableRevisionHumedad class="py-0"></DatatableRevisionHumedad>
              </div>
            </v-container>
          </v-tab-item>

          <v-tab-item key="tabListaRevisionHumedad" value="tabListaRevisionHumedad" eager>
            <v-container class="py-0">
              <DatatableRevisionHumedad class="py-0"></DatatableRevisionHumedad>
            </v-container>
          </v-tab-item>
        </v-tabs-items>
        <!-- Fin: Tabs -->
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para guardar cambios -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          :hidden="tab == 'tabListaRevisionHumedad'"
          width="300px"
          color="primary"
          :disabled="validarBotonCambios()"
          @click="guardarCambios"
          >Guardar cambios</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import FormAlmacenamiento from "./FormAlmacenamiento";
import FormRevisionHumedad from "./FormRevisionHumedad";
import DatatableRevisionHumedad from "./DatatableRevisionHumedad";
import { myMixin } from "../mixins/MyMixin";

import servicioAlmacenamiento from "../services/ServicioAlmacenamiento";
import servicioRevisionHumedad from "../services/ServicioRevisionHumedad";

export default {
  name: "DialogMostrarAlmacenamiento",

  components: {
    FormAlmacenamiento,
    FormRevisionHumedad,
    DatatableRevisionHumedad,
  },

  data() {
    return {
      tab: null,
    };
  },

  computed: {
    // Obtiene la variable formAlmacenamientoValido
    ...mapState("moduloAlmacenamiento", [
      "formAlmacenamientoValido",
      "almacenamiento",
      "cosecha",
    ]),
      revisionHumedad: {
      get() {
        return this.$store.getters["moduloRevisionHumedad/revisionHumedad"];
      },
      set(v) {
        return this.$store.commit("moduloRevisionHumedad/nuevoRevisionHumedad", v);
      },
    },
    // Obtiene la listaRevisionHumedad
    listaRevisionHumedad: {
      get() {
        return this.$store.getters["moduloRevisionHumedad/listaRevisionHumedad"];
      },
      set(v) {
        return this.$store.commit("moduloRevisionHumedad/asignarListaRevisionHumedad", v);
      },
    },
    // Obtiene y modifica el estado de la variable dialogMostrarAlmacenamiento
    dialogMostrarAlmacenamiento: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarAlmacenamiento"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogMostrarAlmacenamiento", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogNuevoRevisionHumedad
    dialogNuevoRevisionHumedad: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoRevisionHumedad"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoRevisionHumedad", v);
      },
    },

    // Obtiene y modifica la variable bloquearCamposFormAlmacenamiento
    bloquearCamposFormAlmacenamiento: {
      get() {
        return this.$store.getters[
          "moduloAlmacenamiento/bloquearCamposFormAlmacenamiento"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloAlmacenamiento/cambiarBloquearCamposFormAlmacenamiento",
          v
        );
      },
    },
        // Obtiene y modifica la variable listaAlmacenamiento
    listaAlmacenamiento: {
      get() {
        return this.$store.getters["moduloAlmacenamiento/listaAlmacenamiento"];
      },
      set(v) {
        return this.$store.commit("moduloAlmacenamiento/asignarListaAlmacenamiento", v);
      },
    },
     bloquearCamposFormRevisionHumedad: {
      get() {
        return this.$store.getters[
          "moduloRevisionHumedad/bloquearCamposFormRevisionHumedad"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloRevisionHumedad/cambiarBloquearCamposFormRevisionHumedad",
          v
        );
      },
    },

    // Obtiene la lista cosecha
    cosecha: {
      get() {
        return this.$store.getters["moduloAlmacenamiento/cosecha"];
      },
      set(v) {
        return this.$store.commit("moduloAlmacenamiento/asignarCosecha", v);
      },
    },
  },
  methods: {
    ...mapMutations("moduloAlmacenamiento", ["vaciarAlmacenamiento"]),

    // Cierra el dialogo
    cerrarDialogMostrarAlmacenamiento() {
      this.dialogMostrarAlmacenamiento = false;
      this.cosecha = [];
      this.va;
    },

 

    validarBotonCambios() {
      switch (this.tab) {
        case "tabAlmacenamiento":
          return this.formAlmacenamientoValido &&
            !this.bloquearCamposFormAlmacenamiento &&
            this.almacenamiento.centroacopioid !== "" &&
            this.almacenamiento.centroacopioid !== null &&
            this.almacenamiento.tratamientoid !== "" &&
            this.almacenamiento.tratamientoid !== null &&
            this.cosecha.length != 0
            ? false
            : true;
          break;

        case "tabRevisionHumedad":
          return !this.bloquearCamposFormRevisionHumedad
          ? false
            : true;
          break;
      }
    },
    async eliminaralmacenamiento(){
      try{
        let resultadoServicioAlmacenamiento = await servicioAlmacenamiento.eliminarAlmacenamiento(id);
        this.$toast.success(resultadoServicioAlmacenamiento.data.message);
        this.obtenerTodosAlmacenamiento();
        this.cerrarDialogMostrarAlmacenamiento();
      }catch (error) {
         //console.log('err', error);
         this.cerrarDialogMostrarAlmacenamiento();
      }
    },
    guardarItem(){
      this.revisionHumedad.almacenamientoid = this.almacenamiento.almacenamientoid;
      this.listaRevisionHumedad.push(this.revisionHumedad);
      this.vaciarRevisionHumedad();

    },
    async guardarCambios() {
      switch (this.tab) {
        case "tabAlmacenamiento":
          try {
            let resultadoServicioAlmacenamiento = await servicioAlmacenamiento.actualizarAlmacenamiento(
              this.almacenamiento
            );
            this.$toast.success(resultadoServicioAlmacenamiento.data.message);
            this.bloquearCamposFormAlmacenamiento = true;
            this.obtenerTodosAlmacenamiento();
          } catch (error) {
            this.$toast.error(error.response.data.message);
          }
          break;

        case "tabRevisionHumedad":
          try{
            let resultadoServicioRevisionHumedad = await servicioRevisionHumedad.actualizarRevisionHumedad(
              this.listaRevisionHumedad
              );
              this.$toast.success(resultadoServicioRevisionHumedad.data.message);
              this.bloquearCamposFormRevisionHumedad = true;
              this.obtenerTodosAlmacenamiento();
          } catch (errror){
            this.$toast.error(error.response.data.message);
          }
          break;
      }
    },

    // Llena la listaAlmacenamiento con datos del servidor backend
    async obtenerTodosAlmacenamiento() {
      let resultado = await servicioAlmacenamiento.obtenerTodosAlmacenamiento();
      resultado.data.forEach((almacenamiento) => {
        almacenamiento.almfechaacopio = this.formatDate(almacenamiento.almfechaacopio);
        almacenamiento.almfechaingresobodega = this.formatDate(
          almacenamiento.almfechaingresobodega
        );
      });
      this.listaAlmacenamiento = resultado.data;
    },
       ...mapMutations("moduloRevisionHumedad", ["vaciarRevisionHumedad"]),
  },

  mixins: [myMixin],

  watch: {
    // Cada vez que se abre el dialog, se resetean las validaciones del formulario
    dialogMostrarAlmacenamiento() {
      if (this.dialogMostrarAlmacenamiento) {
        setTimeout(() => {
          this.$refs.componentFormAlmacenamiento.$refs.formAlmacenamiento.resetValidation();
          this.$refs.componentTab.callSlider();
          this.$refs.componentFormRevisionHumedad.$refs.formRevisionHumedad.resetValidation();
          this.bloquearCamposFormAlmacenamiento = true;
          this.bloquearCamposFormRevisionHumedad = true;
        }, 100);
      }
    },
  },
};
</script>
