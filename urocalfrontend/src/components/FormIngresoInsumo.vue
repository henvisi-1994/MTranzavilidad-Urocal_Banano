<template>
  <v-form ref="formIngresoInsumo" v-model="formIngresoInsumoValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-select
            v-model="ingresoInsumo.centroacopioid"
            placeholder="Centro de Acopio"
            class="style-chooser"
            label="nombreCentroAcopio"
            :reduce="(listaCentroAcopios) => listaCentroAcopios.centroacopioid"
            :options="listaCentroAcopios"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir un codigo para Centro Acopio</em>
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
                label="Fecha del ingreso"
                v-model="ingresoInsumo.inginsfechaingreso"
                :rules="[reglas.campoVacio(ingresoInsumo.inginsfechaingreso)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="ingresoInsumo.inginsfechaingreso"
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
            label="Producto utilizado"
            v-model="ingresoInsumo.inginsproducto"
            :rules="[reglas.campoVacio(ingresoInsumo.inginsproducto)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Factura"
            v-model="ingresoInsumo.inginsfactura"
            :rules="[reglas.campoVacio(ingresoInsumo.inginsfactura)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            label="Proveedor"
            v-model="ingresoInsumo.inginsproveedor"
            :rules="[reglas.campoVacio(ingresoInsumo.inginsproveedor)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Cantidad de ingresos"
            v-model="ingresoInsumo.inginscantidadingreso"
            :rules="[reglas.campoVacio(ingresoInsumo.inginscantidadingreso)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            label="Unidad"
            v-model="ingresoInsumo.inginsunidad"
            :rules="[reglas.campoVacio(ingresoInsumo.inginsunidad)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Saldo"
            v-model="ingresoInsumo.inginssaldo"
            :rules="[reglas.campoVacio(ingresoInsumo.inginssaldo)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            label="Encargado"
            v-model="ingresoInsumo.inginsencargado"
            :rules="[reglas.campoVacio(ingresoInsumo.inginsencargado)]"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from "vuex";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "FormIngresoInsumo",

  components: {
    vSelect,
  },

  data() {
    return {
      listaCentroAcopios: [
        {
          centroacopioid: 1,
          nombreCentroAcopio: "Centro Acopio 1",
        },
        {
          centroacopioid: 2,
          nombreCultivo: "Centro Acopio 2",
        },
        {
          centroacopioid: 3,
          nombreCultivo: "Centro Acopio 3",
        },
      ],
      menuMostrarCalendario: "", // Variable de referencia para el menú de fecha toma muestra
      fechaActual: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  computed: {
    // Obtiene el modelo ingresoInsumo
    ...mapState("moduloIngresoInsumo", ["ingresoInsumo"]),

    // Obtiene la variable que indica si el formulario es valido
    formIngresoInsumoValido: {
      get() {
        return this.$store.getters["moduloIngresoInsumo/formIngresoInsumoValido"];
      },
      set(v) {
        return this.$store.commit("moduloIngresoInsumo/cambiarEstadoValidoFormIngresoInsumo", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
