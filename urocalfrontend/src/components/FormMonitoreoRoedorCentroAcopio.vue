<template>
  <v-form ref="formMonitoreoRoedorCentroAcopio" v-model="formMonitoreoRoedorCentroAcopioValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-select
            v-model="acopio"
            placeholder="Seleccione un centro de acopio"
            class="style-chooser"
            label="centroacopionombre"
            :reduce="(listaAcopioStore) => listaAcopioStore.centroacopioid"
            :options="listaAcopioStore"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir un  centro de acopio</em>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-menu
            v-model="menuMostrarCalendario"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field class="custom px-2" filled dense
                label="Fecha de trampeo"
                v-model="modeloMonitoreoRoedorCentroAcopioStore.monfechatrampeo"
                :rules="[reglas.campoVacio(fecha)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="fecha"
              @input="menuMostrarCalendario = false"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Tipo de trampa"
            v-model="modeloMonitoreoRoedorCentroAcopioStore.montipotrampa"
            :rules="[reglas.campoVacio(modeloMonitoreoRoedorCentroAcopioStore.montipotrampa)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Número de trampas"
            type="Number"
            v-model="modeloMonitoreoRoedorCentroAcopioStore.monnumerotrampas"
            :rules="[reglas.campoVacio(modeloMonitoreoRoedorCentroAcopioStore.monnumerotrampas),
            reglas.soloNumerosPositivos(modeloMonitoreoRoedorCentroAcopioStore.monnumerotrampas)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Cebo utilizado"
            v-model="modeloMonitoreoRoedorCentroAcopioStore.monceboutilizado"
            :rules="[reglas.campoVacio(modeloMonitoreoRoedorCentroAcopioStore.monceboutilizado)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Roedores muertos"
            type="Number"
            v-model="modeloMonitoreoRoedorCentroAcopioStore.monroedoresmuertos"
            :rules="[reglas.campoVacio(modeloMonitoreoRoedorCentroAcopioStore.monroedoresmuertos),
            reglas.soloNumerosPositivos(modeloMonitoreoRoedorCentroAcopioStore.monroedoresmuertos)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Operario"
            v-model="modeloMonitoreoRoedorCentroAcopioStore.monoperario"
            :rules="[reglas.campoVacio(modeloMonitoreoRoedorCentroAcopioStore.monoperario)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Inspector"
            v-model="modeloMonitoreoRoedorCentroAcopioStore.moninspector"
            :rules="[reglas.campoVacio(modeloMonitoreoRoedorCentroAcopioStore.moninspector)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Acciones tomadas"
            v-model="modeloMonitoreoRoedorCentroAcopioStore.monaccionestomadas"
            :rules="[reglas.campoVacio(modeloMonitoreoRoedorCentroAcopioStore.monaccionestomadas)]"
          ></v-text-field>
        </v-col>
       <v-col cols="12" md="6"></v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from "vuex";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "FormMonitoreoRoedorCentroAcopio",

  components: {
    vSelect,
  },

  data() {
    return {
      acopio: null,
      fecha: null,
      menuMostrarCalendario: "", // Variable de referencia para el menú de fecha toma muestra
      fechaActual: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  watch: {
    acopio (val) { //id
      this.modeloMonitoreoRoedorCentroAcopioStore.centroacopioid = this.acopio;
  },

    fecha (val) {
      this.modeloMonitoreoRoedorCentroAcopioStore.monfechatrampeo = this.formatDate(this.fecha);
    },
  },

  computed: {
    // Obtiene el modelo MonitoreoRoedorCentroAcopio
    ...mapState("moduloMonitoreoRoedorCentroAcopio", ["monitoreoRoedorCentroAcopio"]),

    // Obtiene la variable que indica si el formulario es valido
    formMonitoreoRoedorCentroAcopioValido: {
      get() {
        return this.$store.getters["moduloMonitoreoRoedorCentroAcopio/formMonitoreoRoedorCentroAcopioValido"];
      },
      set(v) {
        return this.$store.commit("moduloMonitoreoRoedorCentroAcopio/cambiarEstadoValidoFormMonitoreoRoedorCentroAcopio", v);
      },
    },

    listaAcopioStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloMonitoreoRoedorCentroAcopio/listaAcopioStore"]));
      },
      set(v) {
        return this.$store.commit("moduloMonitoreoRoedorCentroAcopio/establecerListaAcopioaStore", v);
      },
    },

    modeloMonitoreoRoedorCentroAcopioStore: {
      get() {
        return this.$store.getters["moduloMonitoreoRoedorCentroAcopio/monitoreoRoedorCentroAcopio"];
      },
      set(v) {
        return this.$store.commit("moduloMonitoreoRoedorCentroAcopio/nuevoMonitoreoRoedorCentroAcopio", v);
      },
    },

    // Obtiene el modelo Ciudad
    ...mapState("moduloMonitoreoRoedorCentroAcopio", ["monitoreoRoedorCentroAcopio"]),
    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {
    // FORMATO: Modifica el formato de la fecha a dd/mm/aaaa
    formatDate (fecha) {
        if (!fecha) return null

        const [year, month, day] = fecha.split('-')
        return `${day}/${month}/${year}`
    },
  },
};
</script>
