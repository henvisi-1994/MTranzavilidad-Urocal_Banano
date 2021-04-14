<template>
  <v-form ref="formRegistroEnvio" v-model="formRegistroEnvioValido">
    <v-container>
      <v-row
        no-gutters
        justify-md="space-around"
        :class="$vuetify.breakpoint.xs ? '' : 'mb-5'"
      >
      </v-row>

      <v-card-text style="padding: 0px">
        <v-container>
          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-text-field
                class="custom px-2"
                filled
                dense
                label="Fecha"
                v-model="modeloRegistroEnvioStore.regfecha"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                class="custom px-2"
                filled
                dense
                label="Tipo"
                v-model="modeloRegistroEnvioStore.regtipo"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-text-field
                class="custom px-2"
                filled
                dense
                label="Lote"
                v-model="modeloRegistroEnvioStore.reglote"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                class="custom px-2"
                filled
                dense
                label="Destino"
                v-model="modeloRegistroEnvioStore.regdestino"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider></v-divider>

          <v-card elevation="0">
            <v-card-title class="primary--text">
              <v-col cols="12" md="6"> Detalle </v-col>
              <v-col cols="12" md="6">
                <v-autocomplete
                  :items="listaCodigos"
                  :filter="filtroCodigos"
                  item-text="codigo"
                  label="Buscar"
                  class="custom"
                  dense
                  filled
                ></v-autocomplete>
              </v-col>
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="cabeceraTablaDetalle"
                :items="listaDetalles"
                class="elevation-1"
              >
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-container>
      </v-card-text>
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
  name: "FormRegistroEnvio",

  components: {
    vSelect,
  },

  mounted() {
    // this.obtenerTodosFincas();
    // this.obtenerTodosListaCultivo();
    // this.obtenerTodosLoteCultivadoDeFinca();
  },

  data() {
    return {
      cabeceraTablaDetalle: [
        {
          text: "Código",
          value: "codigo",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha",
          value: "fecha",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Productor",
          value: "productor",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "QQ Entregados",
          value: "qqentregados",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Acciones",
          value: "actions",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
      ],
      listaDetalles: [],
      listaCodigos: [
        {
          codigo: "Uro-054",
          fecha: "07/02/2018",
          productor: "Miguel Gonzales",
          qqentregados: "2,246",
        },
        {
          codigo: "Uro-123",
          fecha: "10/03/2020",
          productor: "Angel Barrezueta",
          qqentregados: "1,372",
        },
      ],

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
      this.modeloRegistroEnvioStore.regfecha = this.formatDate(this.fecha);
    },
  },
  computed: {
    // Obtiene la variable que indica si el formulario es valido
    formRegistroEnvioValido: {
      get() {
        return this.$store.getters[
          "moduloRegistroEnvio/formRegistroEnvioValido"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloRegistroEnvio/cambiarEstadoValidoFormRegistroEnvio",
          v
        );
      },
    },

    modeloRegistroEnvioStore: {
      get() {
        return this.$store.getters[
          "moduloRegistroEnvio/modeloRegistroEnvioStore"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloRegistroEnvio/establecerModeloRegistroEnvioStore",
          v
        );
      },
    },
    listaRegistroEnvioStore: {
      get() {
        return this.$store.getters[
          "moduloRegistroEnvio/listaRegistroEnvioStore"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloRegistroEnvio/establecerListaRegistroEnvioStore",
          v
        );
      },
    },
    ...mapState("moduloFinca", ["listaFincaStore"]),
    //
    ...mapState("moduloRegistroEnvio", ["editarRegistroEnvio", "modeloRegistroEnvioStore"]),
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {
    async obtenerTodosListaCultivo() {
      let resultado = await servicioCultivo.obtenerCultivoDetalles(
        this.modeloPodaStore.lotecultivadoid
      );
      this.listaCultivo = resultado.data;
    },
    async obtenerTodosFincas() {
      let resultado = await servicioFinca.obtenerTodosFincas();
      this.listaFinca = resultado.data;
    },

    async obtenerTodosLoteCultivadoDeFinca() {
      let resultado = await servicioLote.obtenerTodosLoteCultivadoDeFinca(
        this.modeloPodaStore.fincaid
      );
      this.listaLote = resultado.data;
    },

    formatDate(fecha) {
      if (!fecha) return null;

      const [year, month, day] = fecha.split("-");
      return `${day}/${month}/${year}`;
    },

    filtroCodigos(item, queryText) {
      const texto = item.codigo.toLowerCase();
      const busqueda = queryText.toLowerCase();

      return texto.indexOf(busqueda) > -1;
    },
    // Cierra el dialogo
    cerrarDialogNuevoRegistroEnvio() {
      this.dialogNuevoRegistroEnvio = !this.dialogNuevoRegistroEnvio; // Cierra el dialogNuevoRegistroEnvio
    },
  },
};
</script>
