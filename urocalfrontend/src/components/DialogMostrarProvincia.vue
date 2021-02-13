<template>
  <v-dialog
    v-model="dialogMostrarProvincia"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
    persistent
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="primary--text">
        <h5>Actualizar/eliminar</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon :disabled="!noeditar" class="primary--text" @click="cambiarEstadoEditar()">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon :disabled="!noeditar" class="primary--text" @click="eliminarRegistro()">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="primary--text" @click="cerrarDialogMostrarProvincia()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Provincia -->
      <v-card-text style="padding: 0px">
        <v-container>
          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                :disabled="noeditar"
                label="Provincia"
                v-model="modeloProvinciaStore.provincianombre"
                :rules="[reglas.campoVacio(modeloProvinciaStore.provincianombre)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="modeloProvinciaStore.provinciapais.paisid"
                :disabled="noeditar"
                placeholder="Seleccione un país"
                class="style-chooser"
                label="paisnombre"
                :reduce="(listaPaisStore) => listaPaisStore.paisid"
                :options="listaPaisStore"
              >
                <template v-slot:no-options="{ search, searching }">
                  <template v-if="searching">
                    No hay resultados para <em>{{ search }}</em
                    >.
                  </template>
                  <em style="opacity: 0.5" v-else>Empiece a escribir un país</em>
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Sitio -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          :disabled="noeditar"
          width="300px" large elevation="0"
          color="primary"
          @click="actualizarRegistro()"
          >Guardar Cambios</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import FormProvincia from "@/components/FormProvincia";
import ServicioProvincia from '../services/ServicioProvincia';  // Interactuar con el Backend

export default {
  name: "MostrarProvincia",

  components: {
    FormProvincia,
    vSelect
  },

  data() {
    return {
      noeditar: true,
      tab: "formProvincia",
    };
  },

  computed: {

    // #  MANIPULACIÓN DE DATOS  #
    listaPaisStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloProvincia/listaPaisStore"]));
      },
      set(v) {
        return this.$store.commit("moduloProvincia/establecerListaPaisStore", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarProvincia
    dialogMostrarProvincia: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarProvincia"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarProvincia", v);
      },
    },

    modeloProvinciaStore: {
      get() {
        return this.$store.getters["moduloProvincia/provincia"];
      },
      set(v) {
        return this.$store.commit("moduloProvincia/nuevoProvincia", v);
      },
    },

    listaProvinciaStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloProvincia/listaProvinciaStore"]));
      },
      set(v) {
        return this.$store.commit("moduloProvincia/establecerListaProvinciaStore", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {

    // UPDATE: Actualiza un registro
    async actualizarRegistro () { 
      try {
        const respuesta = await ServicioProvincia.actualizarProvincia(this.modeloProvinciaStore.provinciaid, this.modeloProvinciaStore);
        this.$toast.success(respuesta.data.message);
        this.cargarListaProvincia();
        this.cerrarDialogMostrarProvincia();        
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    async cargarListaProvincia () { 
      let listaProvincia = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioProvincia.obtenerTodosProvincias();  // Obtener respuesta de backend
      let datosProvincia = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosProvincia.forEach((provincia) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaProvincia.push(provincia);
      });
      this.listaProvinciaStore = listaProvincia;
    },

    async eliminarRegistro() {
      try {
        const respuesta = await ServicioProvincia.eliminarProvincia(this.modeloProvinciaStore.provinciaid);
        this.$toast.success(respuesta.data.message);
        this.cargarListaProvincia();
        this.cerrarDialogMostrarProvincia();
        } catch (error) {
        this.$toast.error(error.response.data.message);
      } 
    },

    // Vacia el modelo Provincia
    ...mapMutations("moduloProvincia", ["vaciarProvincia"]),

    cerrarDialogMostrarProvincia() {
      this.dialogMostrarProvincia = !this.dialogMostrarProvincia; // Cierra el dialogMostrarProvincia
      this.vaciarProvincia(); // Vacia el modelo Provincia
      this.cargarListaProvincia();
      this.noeditar = true;
    },

    cambiarEstadoEditar () { 
      this.noeditar = !this.noeditar;
    },
  },
};
</script>
