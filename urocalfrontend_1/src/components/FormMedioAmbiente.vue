<template>
  <v-form ref="formMedioAmbiente" v-model="formMedioAmbienteValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            label="Temperatura promedio"
            type="Number"
            v-model="medAmbiente.medtemperaturapromedio"
            :rules="[
              reglas.campoVacio(medAmbiente.medtemperaturapromedio),
              reglas.soloNumerosPositivos(medAmbiente.medtemperaturapromedio),
            ]"
            error-count="2"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Altitud"
            type="Number"
            v-model="medAmbiente.medaltitud"
            :rules="[
              reglas.campoVacio(medAmbiente.medaltitud),
              reglas.soloNumerosPositivos(medAmbiente.medaltitud),
            ]"
            error-count="2"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            label="Topografía"
            v-model="medAmbiente.medtopografia"
            :rules="[reglas.campoVacio(medAmbiente.medtopografia)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Humedad relativa"
            type="Number"
            v-model="medAmbiente.medhumedadrelativa"
            :rules="[
              reglas.campoVacio(medAmbiente.medhumedadrelativa),
              reglas.soloNumerosPositivos(medAmbiente.medhumedadrelativa),
            ]"
            error-count="2"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            label="Pluviosidad"
            v-model="medAmbiente.medpluviosidad"
            :rules="[reglas.campoVacio(medAmbiente.medpluviosidad)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Otros datos de medio ambiente"
            v-model="medAmbiente.medotros"
            :rules="[reglas.campoVacio(medAmbiente.medotros)]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
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
                label="Fecha toma muestra"
                v-model="medAmbiente.medtomamuestra"
                :rules="[reglas.campoVacio(medAmbiente.medtomamuestra)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="medAmbiente.medtomamuestra"
              @input="menuMostrarCalendario = false"
              :show-current="fechaActual"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="5"> </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "FormMedioAmbiente",

  data() {
    return {
      menuMostrarCalendario: "", // Variable de referencia para el menú de fecha toma muestra
      fechaActual: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  computed: {
    // Obtiene el modelo environment
    ...mapState("moduloMedioAmbiente", ["medAmbiente"]),

    // Obtiene la variable que indica si el formulario es valido
    formMedioAmbienteValido: {
      get() {
        return this.$store.getters["moduloMedioAmbiente/formMedioAmbienteValido"];
      },
      set(v) {
        return this.$store.commit("moduloMedioAmbiente/cambiarEstadoFormMedioAmbienteValido", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
