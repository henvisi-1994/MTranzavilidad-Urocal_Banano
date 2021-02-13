<template>
  <v-dialog
    v-model="dialogMostrarSitio"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
    persistent
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="white primary--text">
        <h5>Actualizar/eliminar</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon :disabled="!noeditar" class="primary--text" @click="cambiarEstadoEditar()">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon :disabled="!noeditar" class="primary--text" @click="eliminarRegistro()">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="primary--text" @click="cerrarDialogMostrarSitio()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Sitio -->
      <v-card-text style="padding: 0px">
      <v-container>
        <v-row no-gutters justify-md="space-around">
          <v-col cols="12" md="6">
            <v-text-field class="custom px-2" filled dense
              :disabled="noeditar"
              label="Sitio"
              v-model="modeloSitioStore.sitionombre"
              :rules="[reglas.campoVacio(modeloSitioStore.sitionombre)]"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              v-model="modeloSitioStore.sitiociudad.ciudadid"
              :disabled="noeditar"
              placeholder="Seleccione una Ciudad"
              class="style-chooser"
              label="ciudadnombre"
              :reduce="(listaCiudadStore) => listaCiudadStore.ciudadid"
              :options="listaCiudadStore"
            >
              <template v-slot:no-options="{ search, searching }">
                <template v-if="searching">
                  No hay resultados para <em>{{ search }}</em
                  >.
                </template>
                <em style="opacity: 0.5" v-else>Empiece a escribir una ciudad</em>
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
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import { mapMutations, mapState } from "vuex";

import FormSitio from "@/components/FormSitio";
import ServicioSitio from '../services/ServicioSitio';  // Interactuar con el Backend

export default {
  name: "MostrarSitio",

  components: {
    FormSitio,
    vSelect
  },

  data() {
    return {
      noeditar: true,
      tab: "formSitio",
    };
  },
  

  computed: {

    listaCiudadStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloSitio/listaCiudadStore"]));
      },
      set(v) {
        return this.$store.commit("moduloSitio/establecerListaCiudadStore", v);
      },
    },
    
    // Obtiene y modifica el estado de la variable dialogMostrarSitio
    dialogMostrarSitio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarSitio"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarSitio", v);
      },
    },

    modeloSitioStore: {
      get() {
        return this.$store.getters["moduloSitio/sitio"];
      },
      set(v) {
        return this.$store.commit("moduloSitio/nuevoSitio", v);
      },
    },

    listaSitioStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloSitio/listaSitioStore"]));
      },
      set(v) {
        return this.$store.commit("moduloSitio/establecerListaSitioStore", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {

    // UPDATE: Actualiza un registro
    async actualizarRegistro () { 
        try {
          const respuesta = await ServicioSitio.actualizarSitio(this.modeloSitioStore.sitioid, this.modeloSitioStore);
          this.$toast.success(respuesta.data.message);
          this.cargarListaSitio();
          this.cerrarDialogMostrarSitio();
        } catch (error) {
          this.$toast.error(error.response.data.message);
      }
    },

    async cargarListaSitio () { 
      let listaSitio = [];                                              // Limpiar la 'lista de datos'
      let respuesta = await ServicioSitio.obtenerTodosSitios();  // Obtener respuesta de backend
      let datosUsuario = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosUsuario.forEach((modeloSitioStore) => {                       // Guardar cada registro en la 'lista de datos' 
        listaSitio.push(modeloSitioStore);
      });
      this.listaSitioStore = listaSitio;
    },

    async eliminarRegistro() {
      try {
          const respuesta = await ServicioSitio.eliminarSitio(this.modeloSitioStore.sitioid);
          this.$toast.success(respuesta.data.message);
          this.cargarListaSitio();
          this.cerrarDialogMostrarSitio();
        } catch (error) {
          this.$toast.error(error.response.data.message);
      }
    },
    // Vacia el modelo Sitio
    ...mapMutations("moduloSitio", ["vaciarSitio"]),

    cerrarDialogMostrarSitio() {
      this.dialogMostrarSitio = !this.dialogMostrarSitio; // Cierra el dialogMostrarSitio
      this.vaciarSitio(); // Vacia el modelo Sitio
      this.cargarListaSitio();
      this.noeditar = true;
    },

    cambiarEstadoEditar () { 
      this.noeditar = !this.noeditar;
    },
  },
};
</script>
