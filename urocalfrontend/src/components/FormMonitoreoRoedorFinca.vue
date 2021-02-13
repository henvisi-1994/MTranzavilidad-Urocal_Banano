<template>
  <v-form ref="formMonitoreoRoedorFinca" v-model="formMonitoreoRoedorFincaValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-select
            v-model="finca"
            placeholder="Seleccione una finca"
            class="style-chooser"
            label="finnombrefinca"
            :reduce="(listaFincaStore) => listaFincaStore.fincaid"
            :options="listaFincaStore"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir una finca</em>
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
                v-model="modeloMonitoreoRoedorFincaStore.monfechatrampeo"
                :rules="[reglas.campoVacio(fecha)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="fecha"
              @input="menuMostrarCalendario = false"
              :show-current="fechaActual"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Tipo de trampa"
            v-model="modeloMonitoreoRoedorFincaStore.montipotrampa"
            :rules="[reglas.campoVacio(modeloMonitoreoRoedorFincaStore.montipotrampa)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Número de trampas"
            type="Number"
            v-model="modeloMonitoreoRoedorFincaStore.monnumerotrampas"
            :rules="[reglas.campoVacio(modeloMonitoreoRoedorFincaStore.monnumerotrampas),
             reglas.soloNumerosPositivos(modeloMonitoreoRoedorFincaStore.monnumerotrampas)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Cebo utilizado"
            v-model="modeloMonitoreoRoedorFincaStore.monceboutilizado"
            :rules="[reglas.campoVacio(modeloMonitoreoRoedorFincaStore.monceboutilizado)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Roedores muertos"
            type="Number"
            v-model="modeloMonitoreoRoedorFincaStore.monroedoresmuertos"
            :rules="[reglas.campoVacio(modeloMonitoreoRoedorFincaStore.monroedoresmuertos),
            reglas.soloNumerosPositivos(modeloMonitoreoRoedorFincaStore.monroedoresmuertos)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Operario"
            v-model="modeloMonitoreoRoedorFincaStore.monoperario"
            :rules="[reglas.campoVacio(modeloMonitoreoRoedorFincaStore.monoperario)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Inspector"
            v-model="modeloMonitoreoRoedorFincaStore.moninspector"
            :rules="[reglas.campoVacio(modeloMonitoreoRoedorFincaStore.moninspector)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Acciones tomadas"
            v-model="modeloMonitoreoRoedorFincaStore.monaccionestomadas"
            :rules="[reglas.campoVacio(modeloMonitoreoRoedorFincaStore.monaccionestomadas)]"
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
  name: "FormMonitoreoRoedorFinca",

  components: {
    vSelect,
  },

  data() {
    return {
      finca: null,
      fecha: null,
      menuMostrarCalendario: "", // Variable de referencia para el menú de fecha toma muestra
      fechaActual: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  watch: {
    finca (val) { //id
      this.modeloMonitoreoRoedorFincaStore.fincaid = this.finca;
  },

    fecha (val) {
      this.modeloMonitoreoRoedorFincaStore.monfechatrampeo = this.formatDate(this.fecha);
    },
  },

  computed: {
    // Obtiene el modelo MonitoreoRoedorFinca
    ...mapState("moduloMonitoreoRoedorFinca", ["monitoreoRoedorFinca"]),

    // Obtiene la variable que indica si el formulario es valido
    formMonitoreoRoedorFincaValido: {
      get() {
        return this.$store.getters["moduloMonitoreoRoedorFinca/formMonitoreoRoedorFincaValido"];
      },
      set(v) {
        return this.$store.commit("moduloMonitoreoRoedorFinca/cambiarEstadoValidoFormMonitoreoRoedorFinca", v);
      },
    },

    modeloMonitoreoRoedorFincaStore: {
      get() {
        return this.$store.getters["moduloMonitoreoRoedorFinca/monitoreoRoedorFinca"];
      },
      set(v) {
        return this.$store.commit("moduloMonitoreoRoedorFinca/nuevoMonitoreoRoedorFinca", v);
      },
    },

    listaFincaStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloMonitoreoRoedorFinca/listaFincaStore"]));
      },
      set(v) {
        return this.$store.commit("moduloMonitoreoRoedorFinca/establecerListaFincaStore", v);
      },
    },

    // Obtiene el modelo Ciudad
    ...mapState("moduloMonitoreoRoedorFinca", ["monitoreoRoedorFinca"]),
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
