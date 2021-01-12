<template>
  <v-form ref="formMonitoreoRoedorFinca" v-model="formMonitoreoRoedorFincaValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-select
            v-model="monitoreoRoedorFinca.fincaid"
            placeholder="Finca"
            class="style-chooser"
            label="nombreFinca"
            :reduce="(listaFinca) => listaFinca.fincaid"
            :options="listaFinca"
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
                v-model="monitoreoRoedorFinca.monfechatrampeo"
                :rules="[reglas.campoVacio(monitoreoRoedorFinca.monfechatrampeo)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="monitoreoRoedorFinca.monfechatrampeo"
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
            v-model="monitoreoRoedorFinca.montipotrampa"
            :rules="[reglas.campoVacio(monitoreoRoedorFinca.montipotrampa)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Número de trampas"
            type="Number"
            v-model="monitoreoRoedorFinca.monnumerotrampas"
            :rules="[reglas.campoVacio(monitoreoRoedorFinca.monnumerotrampas)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            label="Cebo utilizado"
            v-model="monitoreoRoedorFinca.monceboutilizado"
            :rules="[reglas.campoVacio(monitoreoRoedorFinca.monceboutilizado)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Roedores muertos"
            type="Number"
            v-model="monitoreoRoedorFinca.monroedoresmuertos"
            :rules="[reglas.campoVacio(monitoreoRoedorFinca.monroedoresmuertos)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            label="Acciones tomadas"
            v-model="monitoreoRoedorFinca.monaccionestomadas"
            :rules="[reglas.campoVacio(monitoreoRoedorFinca.monaccionestomadas)]"
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
  name: "FormMonitoreoRoedorFinca",

  components: {
    vSelect,
  },

  data() {
    return {
      listaFinca: [
        {
          fincaid: 1,
          nombreFinca: "Finca 1",
        },
        {
          fincaid: 2,
          nombreFinca: "Finca 2",
        },
        {
          fincaid: 3,
          nombreFinca: "Finca 3",
        },
      ],
      menuMostrarCalendario: "", // Variable de referencia para el menú de fecha toma muestra
      fechaActual: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
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

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
