<template>
  <v-form ref="formAlmacenamiento" v-model="formAlmacenamientoValido">
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-text-field
          label="Contrato"
          v-model="almacenamiento.almcontrato"
          class="custom px-2"
          dense
          filled
          :rules="[reglas.campoVacio(almacenamiento.almcontrato)]"
          :disabled="bloquearCamposFormAlmacenamiento"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-menu
          v-model="menuMostrarFechaAcopio"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="Fecha acopio"
              v-model="almacenamiento.almfechaacopio"
              class="custom px-2"
              dense
              filled
              hint="DD/MM/YYYY"
              persistent-hint
              :rules="[reglas.campoVacio(almacenamiento.almfechaacopio)]"
              readonly
              v-bind="attrs"
              v-on="on"
              :disabled="bloquearCamposFormAlmacenamiento"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="fechaAcopio"
            @input="menuMostrarFechaAcopio = false"
            :show-current="fechaActual"
            locale="es-419"
          ></v-date-picker>
        </v-menu>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-menu
          v-model="menuMostrarFechaIngresoBodega"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="Fecha ingreso a bodega"
              v-model="almacenamiento.almfechaingresobodega"
              class="custom px-2"
              dense
              filled
              hint="DD/MM/YYYY"
              persistent-hint
              :rules="[reglas.campoVacio(almacenamiento.almfechaingresobodega)]"
              readonly
              v-bind="attrs"
              v-on="on"
              :disabled="bloquearCamposFormAlmacenamiento"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="fechaIngresoBodega"
            @input="menuMostrarFechaIngresoBodega = false"
            :show-current="fechaActual"
            locale="es-419"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="Número de bultos"
          type="Number"
          v-model="almacenamiento.almnumerobultos"
          class="custom px-2"
          dense
          filled
          :rules="[reglas.campoVacio(almacenamiento.almnumerobultos),
              reglas.soloNumerosPositivos(almacenamiento.almnumerobultos),
            ]"
          error-count="2"
          :disabled="bloquearCamposFormAlmacenamiento"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-text-field
          label="Peso de bultos"
          type="Number"
          v-model="almacenamiento.almpesobulto"
          class="custom px-2"
          dense
          filled
          :rules="[reglas.campoVacio(almacenamiento.almpesobulto),reglas.soloNumerosPositivos(almacenamiento.almpesobulto)]"
          :disabled="bloquearCamposFormAlmacenamiento"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          label="Peso total ingreso"
          type="Number"
          v-model="pesoTotalIngreso"
          class="custom px-2"
          dense
          filled
          disabled
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-text-field
          label="Saldo"
          type="Number"
          v-model="almacenamiento.almsaldo"
          class="custom px-2"
          dense
          filled
          :rules="[reglas.campoVacio(almacenamiento.almsaldo),reglas.soloNumerosPositivos(almacenamiento.almsaldo)]"
          :disabled="bloquearCamposFormAlmacenamiento"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="almacenamiento.centroacopioid"
          placeholder="Seleccione un centro de acopio"
          class="style-chooser custom px-2"
          dense
          filled
          label="centroacopionombre"
          :reduce="(listaCentroAcopio) => listaCentroAcopio.centroacopioid"
          :options="listaCentroAcopio"
          :disabled="bloquearCamposFormAlmacenamiento"
        >
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              No hay resultados para <em>{{ search }}</em
              >.
            </template>
            <em style="opacity: 0.5" v-else>Empiece a escribir un centro de acopio</em>
          </template>
        </v-select>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-select
          v-model="cosecha"
          placeholder="Seleccione una cosecha"
          class="style-chooser custom px-2"
          dense
          filled
          label="pronombre"
          :reduce="(listaCosecha) => listaCosecha.cosechaid"
          :options="listaCosecha"
          multiple
          :disabled="bloquearCamposFormAlmacenamiento"
        >
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              No hay resultados para <em>{{ search }}</em
              >.
            </template>
            <em style="opacity: 0.5" v-else>Empiece a escribir una cosecha</em>
          </template>
        </v-select></v-col
      >
      <v-col cols="12" md="6">
        <v-select
          v-model="almacenamiento.tratamientoid"
          placeholder="Seleccione un tratamiento"
          class="style-chooser custom px-2"
          dense
          filled
          label="tratamientoOperario"
          :reduce="(listaTratamiento) => listaTratamiento.tratamientoid"
          :options="listaTratamiento"
          :disabled="bloquearCamposFormAlmacenamiento"
        >
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              No hay resultados para <em>{{ search }}</em
              >.
            </template>
            <em style="opacity: 0.5" v-else>Empiece a escribir un tratamiento</em>
          </template>
        </v-select>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-textarea
          label="Observaciones"
          rows="2"
          v-model="almacenamiento.almobservaciones"
          class="custom px-2"
          dense
          filled
          :rules="[reglas.campoVacio(almacenamiento.almobservaciones)]"
          :disabled="bloquearCamposFormAlmacenamiento"
          no-resize
        ></v-textarea>
      </v-col>
      <v-col cols="12" md="5"> </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from "vuex";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import { myMixin } from "../mixins/MyMixin";

import servicioTratamiento from "../services/ServicioTratamiento";
import servicioCentroAcopio from "../services/ServicioCentroAcopio";
import servicioCosecha from "../services/ServicioCosecha";

export default {
  name: "FormAlmacenamiento",

  components: {
    vSelect,
  },

  data() {
    return {
      fechaAcopio: null,
      fechaIngresoBodega: null,
      menuMostrarFechaAcopio: "", // Variable de referencia para el menuMostrarFechaAcopio
      menuMostrarFechaIngresoBodega: "", // Variable de referencia para el menuMostrarFechaIngresoBodega
      fechaActual: new Date().toISOString().substr(0, 10), // Almacena la fecha actual

      listaTratamiento: [],

      listaCentroAcopio: [],

      listaCosecha: [],
    };
  },

  computed: {
    // Obtiene el ModeloAlmacenamiento
    ...mapState("moduloAlmacenamiento", ["almacenamiento"]),

    pesoTotalIngreso() {
      let numeroBultos = parseFloat(this.almacenamiento.almnumerobultos);
      let pesoBulto = parseFloat(this.almacenamiento.almpesobulto);
      if (isNaN(numeroBultos)) numeroBultos = 0;
      if (isNaN(pesoBulto)) pesoBulto = 0;
      let pesoTotal = numeroBultos * pesoBulto;
      this.almacenamiento.almpesototalingreso = pesoTotal;
      return pesoTotal;
    },

    // Obtiene la variable que indica si el formulario es valido
    formAlmacenamientoValido: {
      get() {
        return this.$store.getters["moduloAlmacenamiento/formAlmacenamientoValido"];
      },
      set(v) {
        return this.$store.commit(
          "moduloAlmacenamiento/cambiarEstadoValidoFormAlmacenamiento",
          v
        );
      },
    },

    // Obtiene la variable bloquearCamposFormAlmacenamiento
    bloquearCamposFormAlmacenamiento: {
      get() {
        return this.$store.getters[
          "moduloAlmacenamiento/bloquearCamposFormAlmacenamiento"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloAlmacenamiento/cambiarBloquearCamposFormAlmacenamiento",
          v
        );
      },
    },

    // Obtiene la lista cosecha
    cosecha: {
      get() {
        return this.$store.getters["moduloAlmacenamiento/cosecha"];
      },
      set(v) {
        return this.$store.commit("moduloAlmacenamiento/asignarCosecha", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {
    async obtenerTodosTratamiento() {
      let respuestaServicioTratamiento = await servicioTratamiento.obtenerTodosTratamiento();
      respuestaServicioTratamiento.data.forEach((tratamiento) => {
        tratamiento.tratamientoOperario = `Tipo secado: ${tratamiento.tratiposecado} | Operario: ${tratamiento.traoperario}`;
      });
      this.listaTratamiento = respuestaServicioTratamiento.data;
    },

    async obtenerTodosCentroAcopio() {
      let respuestaServicioCentroAcopio = await servicioCentroAcopio.obtenerTodosCentroAcopio();
      this.listaCentroAcopio = respuestaServicioCentroAcopio.data;
    },

    async obtenerTodosCosecha() {
      let respuestaServicioCosecha = await servicioCosecha.obtenerCosechasConDetalleCompra();
      this.listaCosecha = respuestaServicioCosecha.data;
    },
  },

  mixins: [myMixin],

  mounted() {
    this.obtenerTodosTratamiento();
    this.obtenerTodosCentroAcopio();
    this.obtenerTodosCosecha();
  },

  watch: {
    fechaAcopio() {
      this.almacenamiento.almfechaacopio = this.formatDate(this.fechaAcopio);
    },

    fechaIngresoBodega() {
      this.almacenamiento.almfechaingresobodega = this.formatDate(
        this.fechaIngresoBodega
      );
    },
  },
};
</script>
