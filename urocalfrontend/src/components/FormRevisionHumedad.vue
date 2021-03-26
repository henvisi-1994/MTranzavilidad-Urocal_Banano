<template>
  <v-form ref="formRevisionHumedad" v-model="formRevisionHumedadValido">
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-text-field
          label="Almacenamiento"
          v-model="revisionHumedad.almacenamientoid"
          class="custom px-2"
          dense
          filled
          :rules="[reglas.campoVacio(revisionHumedad.almacenamientoid)]"
          :disabled="true"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="Porcentaje de humedad"
          type="Number"
          v-model="revisionHumedad.revporcentajehumedad"
          class="custom px-2"
          dense
          filled
          :rules="[reglas.campoVacio(revisionHumedad.revporcentajehumedad)]"
          error-count="2"
          :disabled="bloquearCamposFormRevisionHumedad"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-menu
          v-model="menuMostrarFechaIngresoSecadora"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="Fecha ingreso secadora"
              v-model="revisionHumedad.revfechaingresosecadora"
              class="custom px-2"
              dense
              filled
              :rules="[
                reglas.campoVacio(revisionHumedad.revfechaingresosecadora),
              ]"
              readonly
              v-bind="attrs"
              v-on="on"
              :disabled="bloquearCamposFormRevisionHumedad"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="fechaIngresoSecadora"
            @input="menuMostrarFechaIngresoSecadora = false"
            :show-current="fechaActual"
            locale="es-419"
            :disabled="bloquearCamposFormRevisionHumedad"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          type="time"
          label="Hora ingreso secadora"
          v-model="revisionHumedad.revhoraingresosecadora"
          class="custom px-2"
          dense
          filled
          :rules="[reglas.campoVacio(revisionHumedad.revhoraingresosecadora)]"
          error-count="2"
          :disabled="bloquearCamposFormRevisionHumedad"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-menu
          v-model="menuMostrarFechaSalidaSecadora"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="Fecha salida secadora"
              v-model="revisionHumedad.revfechasalidasecadora"
              class="custom px-2"
              dense
              filled
              :rules="[
                reglas.campoVacio(revisionHumedad.revfechasalidasecadora),
              ]"
              readonly
              v-bind="attrs"
              v-on="on"
              :disabled="bloquearCamposFormRevisionHumedad"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="fechaSalidaSecadora"
            @input="menuMostrarFechaSalidaSecadora = false"
            :show-current="fechaActual"
            locale="es-419"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          type="time"
          label="Hora salida secadora"
          v-model="revisionHumedad.revhorasalidasecadora"
          class="custom px-2"
          dense
          filled
          :rules="[reglas.campoVacio(revisionHumedad.revhorasalidasecadora)]"
          error-count="2"
          :disabled="bloquearCamposFormRevisionHumedad"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from "vuex";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { myMixin } from "../mixins/MyMixin";

export default {
  name: "FormRevisionHumedad",

  components: {
    vSelect,
  },

  data() {
    return {
      fechaIngresoSecadora: null,
      fechaSalidaSecadora: null,
      menuMostrarFechaIngresoSecadora: "", // Variable de referencia para el menuMostrarFechaIngresoSecadora
      menuMostrarFechaSalidaSecadora: "", // Variable de referencia para el menuMostrarFechaSalidaSecadora
      fechaActual: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  computed: {
    // Obtiene el ModeloRevisionHumedad
    ...mapState("moduloRevisionHumedad", ["revisionHumedad"]),

    // Obtiene la variable que indica si el formulario es valido
    formRevisionHumedadValido: {
      get() {
        return this.$store.getters[
          "moduloRevisionHumedad/formRevisionHumedadValido"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloRevisionHumedad/cambiarEstadoValidoFormRevisionHumedad",
          v
        );
      },
    },
    // Obtiene la variable bloquearCamposFormAlmacenamiento
    bloquearCamposFormRevisionHumedad: {
      get() {
        return this.$store.getters[
          "moduloRevisionHumedad/bloquearCamposFormRevisionHumedad"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloRevisionHumedad/cambiarbloquearCamposFormRevisionHumedad",
          v
        );
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},

  mixins: [myMixin],

  watch: {
    fechaIngresoSecadora() {
      this.revisionHumedad.revfechaingresosecadora = this.formatDate(
        this.fechaIngresoSecadora
      );
    },

    fechaSalidaSecadora() {
      this.revisionHumedad.revfechasalidasecadora = this.formatDate(
        this.fechaSalidaSecadora
      );
    },
  },
};
</script>
