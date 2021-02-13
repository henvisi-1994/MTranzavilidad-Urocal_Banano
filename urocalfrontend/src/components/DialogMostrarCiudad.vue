<template>
  <v-dialog
    v-model="dialogMostrarCiudad"
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
          <v-icon class="primary--text" @click="cerrarDialogMostrarCiudad()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Ciudad -->
      <v-card-text style="padding: 0px">
        <v-container>
          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                :disabled="noeditar"
                label="Ciudad"
                v-model="modeloCiudadStore.ciudadnombre"
                :rules="[reglas.campoVacio(modeloCiudadStore.ciudadnombre)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-select
                v-model="modeloCiudadStore.ciudadprovincia.provinciaid"
                :disabled="noeditar"
                placeholder="Seleccione una provincia"
                class="style-chooser"
                label="provincianombre"
                :reduce="(listaProvinciaStore) => listaProvinciaStore.provinciaid"
                :options="listaProvinciaStore"
              >
                <template v-slot:no-options="{ search, searching }">
                  <template v-if="searching">
                    No hay resultados para <em>{{ search }}</em
                    >.
                  </template>
                  <em style="opacity: 0.5" v-else>Empiece a escribir una provincia</em>
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

import FormCiudad from "@/components/FormCiudad";
import ServicioCiudad from '../services/ServicioCiudad';  // Interactuar con el Backend

export default {
  name: "MostrarCiudad",

  components: {
    FormCiudad,
    vSelect
  },

  data() {
    return {
      noeditar: true,
      tab: "formCiudad",
    };
  },

  computed: {

    listaProvinciaStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloCiudad/listaProvinciaStore"]));
      },
      set(v) {
        return this.$store.commit("moduloCiudad/establecerListaProvinciaStore", v);
      },
    },
    
    // Obtiene y modifica el estado de la variable dialogMostrarCiudad
    dialogMostrarCiudad: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarCiudad"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarCiudad", v);
      },
    },

    modeloCiudadStore: {
      get() {
        return this.$store.getters["moduloCiudad/ciudad"];
      },
      set(v) {
        return this.$store.commit("moduloCiudad/nuevoCiudad", v);
      },
    },

    listaCiudadStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloCiudad/listaCiudadStore"]));
      },
      set(v) {
        return this.$store.commit("moduloCiudad/establecerListaCiudadStore", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },


  methods: {

    // UPDATE: Actualiza un registro
    async actualizarRegistro () { 
      try {
        const respuesta = await ServicioCiudad.actualizarCiudad(this.modeloCiudadStore.ciudadid, this.modeloCiudadStore);
        this.$toast.success(respuesta.data.message);
        this.cargarListaCiudad();
        this.cerrarDialogMostrarCiudad();        
        } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    async cargarListaCiudad () { 
      let listaCiudad = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioCiudad.obtenerTodosCiudades();  // Obtener respuesta de backend
      let datosCiudad = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosCiudad.forEach((modeloCiudadStore) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaCiudad.push(modeloCiudadStore);
      });
      this.listaCiudadStore = listaCiudad;
    },

    async eliminarRegistro() {
      try {
        const respuesta = await ServicioCiudad.eliminarCiudad(this.modeloCiudadStore.ciudadid);
        this.$toast.success(respuesta.data.message); 
        this.cargarListaCiudad();
        this.cerrarDialogMostrarCiudad();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    // Vacia el modelo Ciudad
    ...mapMutations("moduloCiudad", ["vaciarCiudad"]),

    cerrarDialogMostrarCiudad() {
      this.dialogMostrarCiudad = !this.dialogMostrarCiudad; // Cierra el dialogMostrarCiudad
      this.vaciarCiudad(); // Vacia el modelo Ciudad
      this.cargarListaCiudad();
      this.noeditar = true;
    },

    cambiarEstadoEditar () { 
      this.noeditar = !this.noeditar;
    },
  },
};
</script>
