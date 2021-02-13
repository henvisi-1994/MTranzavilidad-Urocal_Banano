<template>
  <v-dialog
    v-model="dialogMostrarAsociacion"
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
          <v-icon class="primary--text" @click="cerrarDialogMostrarAsociacion()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Asociacion -->
      <v-card-text style="padding: 0px">
        <v-container>
          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Asociación"
                :disabled="noeditar"
                v-model="modeloAsociacionStore.asonombre"
                :rules="[reglas.campoVacio(modeloAsociacionStore.asonombre)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Nombre abreviado"
                :disabled="noeditar"
                v-model="modeloAsociacionStore.asoabreviado"
                :rules="[reglas.campoVacio(modeloAsociacionStore.asoabreviado)]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Ruc"
                :disabled="noeditar"
                type="Number"
                v-model="modeloAsociacionStore.asoruc"
                :rules="[reglas.campoVacio(modeloAsociacionStore.asoruc),
                reglas.soloNumerosPositivos(modeloAsociacionStore.asoruc)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Números de socios"
                :disabled="noeditar"
                type="Number"
                v-model="modeloAsociacionStore.asonumerosocios"
                :rules="[reglas.campoVacio(modeloAsociacionStore.asonumerosocios),
                reglas.soloNumerosPositivos(modeloAsociacionStore.asonumerosocios)]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Número de hombres"
                :disabled="noeditar"
                type="Number"
                v-model="modeloAsociacionStore.asonumerohombres"
                :rules="[reglas.campoVacio(modeloAsociacionStore.asonumerohombres),
                reglas.soloNumerosPositivos(modeloAsociacionStore.asonumerohombres)]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Número de mujeres"
                :disabled="noeditar"
                type="Number"
                v-model="modeloAsociacionStore.asonumeromujeres"
                :rules="[reglas.campoVacio(modeloAsociacionStore.asonumeromujeres),
                reglas.soloNumerosPositivos(modeloAsociacionStore.asonumeromujeres)]"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-select
                v-model="modeloAsociacionStore.asociacionresponsable.personaid"
                placeholder="Seleccione un responsable"
                class="style-chooser"
                :disabled="noeditar"
                label="responsable"
                :reduce="(listaResponsableStore) => listaResponsableStore.personaid"
                :options="listaResponsableStore"
              >
                <template v-slot:no-options="{ search, searching }">
                  <template v-if="searching">
                    No hay resultados para <em>{{ search }}</em
                    >.
                  </template>
                  <em style="opacity: 0.5" v-else>Empiece a escribir un responsable</em>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="6"
              ><v-textarea class="custom px-2" filled dense
                label="Observaciones"
                :disabled="noeditar"
                rows="2"
                v-model="modeloAsociacionStore.asoobservacion"
                :rules="[reglas.campoVacio(modeloAsociacionStore.asoobservacion)]"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Sitio -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          :disabled="noeditar"
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

import FormAsociacion from "@/components/FormAsociacion";
import ServicioAsociacion from '../services/ServicioAsociacion';

export default {
  name: "MostrarAsociacion",

  components: {
    FormAsociacion,
    vSelect
  },

  data() {
    return {
      noeditar: true,
      tab: "formAsociacion",
    };
  },

  computed: {

    
    listaResponsableStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloAsociacion/listaResponsableStore"]));
      },
      set(v) {
        return this.$store.commit("moduloAsociacion/establecerListaResponsableStore", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarAsociacion
    dialogMostrarAsociacion: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarAsociacion"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarAsociacion", v);
      },
    },

    listaAsociacionStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloAsociacion/listaAsociacionStore"]));
      },
      set(v) {
        return this.$store.commit("moduloAsociacion/establecerListaAsociacionStore", v);
      },
    },

    modeloAsociacionStore: {
      get() {
        return this.$store.getters["moduloAsociacion/asociacion"];
      },
      set(v) {
        return this.$store.commit("moduloAsociacion/nuevoAsociacion", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {

    // UPDATE: Actualiza un registro
    async actualizarRegistro () { 
      //console.log(this.modeloFincaStore)
      try {
          const respuesta = await ServicioAsociacion.actualizarAsociacion(this.modeloAsociacionStore.asociacionid, this.modeloAsociacionStore);
          this.$toast.success(respuesta.data.message);
          this.cargarListaAsociacion();
          this.cerrarDialogMostrarAsociacion();        
        } catch (error) {
          this.$toast.error(error.response.data.message);
      } 
    },

    // #  MANIPULACIÓN DE DATOS  #
    async cargarListaAsociacion () { 
      let listaAsociacion = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioAsociacion.obtenerTodosAsociacion();  // Obtener respuesta de backend
      let datosAsociacion = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosAsociacion.forEach((Asociacion) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaAsociacion.push(Asociacion);
      });
      this.listaAsociacionStore = listaAsociacion;
    },

    async eliminarRegistro() {
       try {
          const respuesta = await ServicioAsociacion.eliminarAsociacion(this.modeloAsociacionStore.asociacionid);
          this.$toast.success(respuesta.data.message);
          this.cargarListaAsociacion();
          this.cerrarDialogMostrarAsociacion();
       } catch (error) {
          this.$toast.error(error.response.data.message);
      } 
    },

    // Vacia el modelo Asociacion
    ...mapMutations("moduloAsociacion", ["vaciarAsociacion"]),

    cerrarDialogMostrarAsociacion() {
      this.dialogMostrarAsociacion = !this.dialogMostrarAsociacion; // Cierra el dialogMostrarAsociacion
      this.vaciarAsociacion(); // Vacia el modelo Asociacion
      this.cargarListaAsociacion();
      this.noeditar = true;
    },

    cambiarEstadoEditar () { 
      this.noeditar = !this.noeditar;
    },
  },
};
</script>
