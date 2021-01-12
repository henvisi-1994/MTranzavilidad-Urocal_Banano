<template>
  <v-form ref="formMonitoreoRoedorCentroAcopio" v-model="formMonitoreoRoedorCentroAcopioValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-select
            v-model="monitoreoRoedorCentroAcopio.centroacopioid"
            placeholder="Centro de acopio"
            class="style-chooser"
            label="nombreCentroAcopio"
            :reduce="(listaCentroAcopio) => listaCentroAcopio.centroacopioid"
            :options="listaCentroAcopio"
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
        <v-col cols="12" md="5">
          <v-menu
            v-model="menuMostrarCalendario"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="Fecha de trampeo"
                v-model="monitoreoRoedorCentroAcopio.monfechatrampeo"
                :rules="[reglas.campoVacio(monitoreoRoedorCentroAcopio.monfechatrampeo)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="monitoreoRoedorCentroAcopio.monfechatrampeo"
              @input="menuMostrarCalendario = false"
              :show-current="fechaActual"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            label="Tipo de trampa"
            v-model="monitoreoRoedorCentroAcopio.montipotrampa"
            :rules="[reglas.campoVacio(monitoreoRoedorCentroAcopio.montipotrampa)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Número de trampas"
            type="Number"
            v-model="monitoreoRoedorCentroAcopio.monnumerotrampas"
            :rules="[reglas.campoVacio(monitoreoRoedorCentroAcopio.monnumerotrampas)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            label="Cebo utilizado"
            v-model="monitoreoRoedorCentroAcopio.monceboutilizado"
            :rules="[reglas.campoVacio(monitoreoRoedorCentroAcopio.monceboutilizado)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Roedores muertos"
            type="Number"
            v-model="monitoreoRoedorCentroAcopio.monroedoresmuertos"
            :rules="[reglas.campoVacio(monitoreoRoedorCentroAcopio.monroedoresmuertos)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            label="Acciones tomadas"
            v-model="monitoreoRoedorCentroAcopio.monaccionestomadas"
            :rules="[reglas.campoVacio(monitoreoRoedorCentroAcopio.monaccionestomadas)]"
          ></v-text-field>
        </v-col>
       <v-col cols="12" md="5"></v-col>
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
      listaCentroAcopio: [
        {
          centroacopioid: 1,
          nombreCentroAcopio: "Centro Acopio 1",
        },
        {
          centroacopioid: 2,
          nombreCentroAcopio: "Centro Acopio 2",
        },
        {
          centroacopioid: 3,
          nombreCentroAcopio: "Centro Acopio 3",
        },
      ],
      menuMostrarCalendario: "", // Variable de referencia para el menú de fecha toma muestra
      fechaActual: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
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

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
