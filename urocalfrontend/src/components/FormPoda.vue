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
            v-model="fincaid"
            placeholder="Finca"
            class="style-chooser"
            label="findescripcionfinca"
            @input="obtenerTodosLoteCultivadoDeFinca"
            :reduce="(listaFinca) => listaFinca.fincaid"
            :options="listaFincaStore"
            :rules="[reglas.campoVacio(fincaid)]"
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
            v-model="loteid"
            placeholder="Lote"
            class="style-chooser"
            label="lotnumero"
            @input="obtenerTodosListaCultivo"
            :reduce="(listaLote) => listaLote.lotecultivadoid"
            :options="listaLote"
            :rules="[reglas.campoVacio(loteid)]"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else-if="!fincaid"
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
            :reduce="(listaCultivo) => listaCultivo.cultivoid"
            :options="listaCultivo"
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
                :rules="[reglas.campoVacio(modeloPodaStore.podfecha)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="fecha"
              :show-current="fechaActual"
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
            label="podatipo"
            :reduce="(listaTipo) => listaTipo.tipoid"
            :options="listaTipo"
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
      listaTipo: [
        {
          tipoid: 1,
          podatipo: "Poda Formación",
        },
        {
          tipoid: 2,
          podatipo: "Poda Mantenimiento",
        },
        {
          tipoid: 3,
          podatipo: "Poda Fitosanitaria",
        },
        {
          tipoid: 4,
          podatipo: "Poda de Descope",
        },
      ],
      fincaid: "",
      loteid: "",
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
    // DC i
    listaPodasStore: {
      get() {
        return this.$store.getters["moduloPoda/listaPodasStore"];
      },
      set(v) {
        return this.$store.commit("moduloPoda/establecerListaPodasStore", v);
      },
    },
    // //DC f
    ...mapState("moduloFinca", ["listaFincaStore"]),
    ...mapState("moduloPoda", ["editarPoda","modeloPodaStore"]),
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {
    async obtenerTodosListaCultivo() {
      let resultado = await servicioCultivo.obtenerCultivoDetalles(this.loteid);
      this.listaCultivo = resultado.data;
    },
    async obtenerTodosFincas() {
      let resultado = await servicioFinca.obtenerTodosFincas();
      this.listaFinca = resultado.data;
    },

    async obtenerTodosLoteCultivadoDeFinca() {
      let resultado = await servicioLote.obtenerTodosLoteCultivadoDeFinca(
        this.fincaid
      );
      this.listaLote = resultado.data;
    },
    limpiarIds() {
      this.fincaid = "";
      this.loteid = "";
      this.tipoid = "";
    },
    formatDate(fecha) {
      if (!fecha) return null;

      const [year, month, day] = fecha.split("-");
      return `${day}/${month}/${year}`;
    },
  },
};
</script>
