<template>
  <v-form ref="formEgresoInsumo" v-model="formEgresoInsumoValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
       <!-- Buscador para Ingreso Insumo(ingresoinsumoid) -->
          <v-select
            v-model="egresoInsumo.ingresoinsumoid"
            placeholder="Insumo"
            class="style-chooser"
            label="nombreInsumo"
            :reduce="(listaInsumos) => listaInsumos.ingresoinsumoid"
            :options="listaInsumos"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir un insumo</em>
            </template>
          </v-select>
        <!-- Buscador para Finca(fincaid) -->  
          <v-select
            v-model="egresoInsumo.fincaid"
            placeholder="Finca"
            class="style-chooser"
            label="nombreFinca"
            :reduce="(listaFincas) => listaFincas.fincaid"
            :options="listaFincas"
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
                label="Fecha de egreso"
                v-model="egresoInsumo.egrinsfechaegreso"
                :rules="[reglas.campoVacio(egresoInsumo.egrinsfechaegreso)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="egresoInsumo.egrinsfechaegreso"
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
            label="Control de egreso"
            v-model="egresoInsumo.egrinsparacontrolar"
            :rules="[reglas.campoVacio(egresoInsumo.egrinsparacontrolar)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Dosis"
            v-model="egresoInsumo.egrinsdosis"
            :rules="[reglas.campoVacio(egresoInsumo.egrinsdosis)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            label="Cantidad entregada"
            v-model="egresoInsumo.egrinscantidadentregada"
            :rules="[reglas.campoVacio(egresoInsumo.egrinscantidadentregada)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Encargado"
            v-model="egresoInsumo.egrinsencargado"
            :rules="[reglas.campoVacio(egresoInsumo.egrinsencargado)]"
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
  name: "FormEgresoInsumo",

  components: {
    vSelect,
  },

  data() {
    return {
      listaInsumos: [
        {
          ingresoinsumoid: 1,
          nombreInsumo: "Insumo 1",
        },
        {
          ingresoinsumoid: 2,
          nombreInsumo: "Insumo 2",
        },
        {
          ingresoinsumoid: 3,
          nombreInsumo: "Insumo 3",
        },
      ],

      listaFincas: [
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
    // Obtiene el modelo egresoInsumo
    ...mapState("moduloEgresoInsumo", ["egresoInsumo"]),

    // Obtiene la variable que indica si el formulario es valido
    formEgresoInsumoValido: {
      get() {
        return this.$store.getters["moduloEgresoInsumo/formEgresoInsumoValido"];
      },
      set(v) {
        return this.$store.commit("moduloEgresoInsumo/cambiarEstadoValidoFormEgresoInsumo",v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>