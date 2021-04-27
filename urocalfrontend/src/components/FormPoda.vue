<template>
  <v-form ref="formPoda" v-model="formPodaValido">
    <v-container>
      <v-row
        no-gutters
        justify-md="space-around"
        :class="$vuetify.breakpoint.xs ? '' : 'mb-5'"
      >
        <v-col cols="12" md="5">
          <v-select
            :disabled="editarPoda"
            v-model="modeloPodaStore.fincaid"
            placeholder="Finca"
            class="style-chooser"
            label="findescripcionfinca"
            @input="obtenerTodosLoteCultivadoDeFinca"
            :reduce="(listaFincaStore) => listaFincaStore.fincaid"
            :options="listaFincaStore"
            :rules="[reglas.campoVacio(modeloPodaStore.fincaid)]"
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
          <v-select
            :disabled="editarPoda"
            v-model="modeloPodaStore.lotecultivadoid"
            placeholder="Lote"
            class="style-chooser"
            label="lotnumero"
            @input="obtenerTodosListaCultivo"
            :reduce="(listaloteStore) => listaloteStore.lotecultivadoid"
            :options="listaloteStore"
            :rules="[reglas.campoVacio(modeloPodaStore.lotecultivadoid)]"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else-if="!modeloPodaStore.fincaid"
                >Escoja una finca</em
              >
              <em style="opacity: 0.5" v-else>Empiece a escribir un lote</em>
            </template>
          </v-select>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-select
            :disabled="editarPoda"
            v-model="modeloPodaStore.cultivoid"
            placeholder="Cultivo"
            class="style-chooser"
            label="detalles"
            :reduce="(listaCultivoStore) => listaCultivoStore.cultivoid"
            :options="listaCultivoStore"
            :rules="[reglas.campoVacio(modeloPodaStore.cultivoid)]"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir un cultivo</em>
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
                :disabled="editarPoda"
                label="Fecha de poda"
                v-model="modeloPodaStore.podfecha"
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
        <v-col cols="12" md="5">
          <v-select
          
            :disabled="editarPoda"
            v-model="modeloPodaStore.podtipo"
            placeholder="Tipo de poda"
            class="style-chooser"
            label="podtipo"
            :reduce="(listaTipoStore) => listaTipoStore.podtipo"
            :options="listaTipoStore"
            :rules="[reglas.campoVacio(modeloPodaStore.podtipo)]"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else
                >Empiece a escribir un tipo de poda</em
              >
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="editarPoda"
            placeholder="Hectáreas"
            v-model="modeloPodaStore.podhectareas"
            :rules="[
              reglas.campoVacio(modeloPodaStore.podhectareas),
              reglas.soloNumerosPositivos(modeloPodaStore.podhectareas),
            ]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="editarPoda"
            placeholder="Cantidad de plantas"
            v-model="modeloPodaStore.podcantidadplantas"
            :rules="[
              reglas.campoVacio(modeloPodaStore.podcantidadplantas),
              reglas.soloNumerosPositivos(modeloPodaStore.podcantidadplantas),
            ]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="editarPoda"
            placeholder="Herramienta"
            v-model="modeloPodaStore.podherramienta"
            :rules="[reglas.campoVacio(modeloPodaStore.podherramienta)]"
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

import servicioLote from "../services/ServicioLote";
import servicioFinca from "../services/ServicioFinca";
import servicioCultivo from "../services/ServicioCultivo";

export default {
  name: "FormPoda",

  components: {
    vSelect,
  },

  mounted() {
    this.obtenerTodosFincas();
  },

  data() {
    return {
      listaLote: [],
      listaFinca: [],
      tipoid: "",
      listaCultivo: [],
      fecha: null,
      menuMostrarCalendario: "", // Variable de referencia para el menú de fecha toma muestra
      fechaActual: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },
  watch: {
    fecha(val) {
      this.modeloPodaStore.podfecha = this.formatDate(this.fecha);
    },
  },
  computed: {
    // Obtiene la variable que indica si el formulario es valido
    formPodaValido: {
      get() {
        return this.$store.getters["moduloPoda/formPodaValido"];
      },
      set(v) {
        return this.$store.commit("moduloPoda/cambiarEstadoValidoFormPoda", v);
      },
    },

    modeloPodaStore: {
      get() {
        return this.$store.getters["moduloPoda/modeloPodaStore"];
      },
      set(v) {
        return this.$store.commit("moduloPoda/establecerModeloPodaStore", v);
      },
    },
    listaPodasStore: {
      get() {
        return this.$store.getters["moduloPoda/listaPodasStore"];
      },
      set(v) {
        return this.$store.commit("moduloPoda/establecerListaPodasStore", v);
      },
    },
    listaCultivoStore: {
      get() {
        return JSON.parse(
          JSON.stringify(this.$store.getters["moduloPoda/listaCultivoStore"])
        );
      },
      set(v) {
        return this.$store.commit("moduloPoda/establecerListaCultivoStore", v);
      },
    },
    listaloteStore: {
      get() {
        return JSON.parse(
          JSON.stringify(this.$store.getters["moduloPoda/listaloteStore"])
        );
      },
      set(v) {
        return this.$store.commit("moduloPoda/establecerlistaloteStore", v);
      },
    },
    listaTipoStore: {
      get() {
        return JSON.parse(
          JSON.stringify(this.$store.getters["moduloPoda/listaTipoStore"])
        );
      },
      set(v) {
        return this.$store.commit("moduloPoda/establecerlistaTipoStore", v);
      },
    },
    listaFincaStore: {
      get() {
        return JSON.parse(
          JSON.stringify(this.$store.getters["moduloFinca/listaFincaStore"])
        );
      },
      set(v) {
        return this.$store.commit("moduloFinca/establecerListaFincaStore", v);
      },
    },
    ...mapState("moduloPoda", ["editarPoda", "modeloPodaStore"]),
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {
    async obtenerTodosListaCultivo() {
      let resultado = await servicioCultivo.obtenerCultivoDetalles(
        this.modeloPodaStore.lotecultivadoid
      );
      this.listaCultivoStore = resultado.data;
    },
    async obtenerTodosFincas() {
      let resultado = await servicioFinca.obtenerTodosFincas();
      this.listaFincaStore = resultado.data;
    },

    async obtenerTodosLoteCultivadoDeFinca() {
      let resultado = await servicioLote.obtenerTodosLoteCultivadoDeFinca(
        this.modeloPodaStore.fincaid
      );
      this.listaloteStore = resultado.data;
    },

    formatDate(fecha) {
      if (!fecha) return null;

      const [year, month, day] = fecha.split("-");
      return `${day}/${month}/${year}`;
    },
  },
};
</script>
