<template>
  <v-form ref="formLimpiezaHerramienta" v-model="formLimpiezaHerramientaValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-select
            :disabled="editarLimpiezaHerramienta"
            v-model="modeloLimpiezaHerramientaStore.fincaid"
            placeholder="Finca"
            class="style-chooser"
            label="findescripcionfinca"
            @input="obtenerTodosLoteCultivadoDeFinca"
            :reduce="(listaFincaStore) => listaFincaStore.fincaid"
            :options="listaFincaStore"
            :rules="[reglas.campoVacio(modeloLimpiezaHerramientaStore.fincaid)]"
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

        <v-col cols="12" md="6">
          <v-select
            :disabled="editarLimpiezaHerramienta"
            v-model="modeloLimpiezaHerramientaStore.lotecultivadoid"
            placeholder="Lote"
            class="style-chooser"
            label="lotnumero"
            @input="obtenerTodosListaCultivo"
            :reduce="(listaloteStore) => listaloteStore.lotecultivadoid"
            :options="listaloteStore"
            :rules="[reglas.campoVacio(modeloLimpiezaHerramientaStore.lotecultivadoid)]"
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
        <v-col cols="12" md="6">
          <v-select
            :disabled="editarLimpiezaHerramienta"
            v-model="modeloLimpiezaHerramientaStore.cultivoid"
            placeholder="Cultivo"
            class="style-chooser"
            label="detalles"
            :reduce="(listaCultivoStore) => listaCultivoStore.cultivoid"
            :options="listaCultivoStore"
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

        <v-col cols="12" md="6">
          <v-menu
            v-model="menuMostrarCalendario"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :disabled="editarLimpiezaHerramienta"
                class="custom px-2"
                filled
                dense
                label="Fecha de limpieza"
                v-model="modeloLimpiezaHerramientaStore.limfecha"
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
        <v-col cols="12" md="6">
          <v-text-field
            :disabled="editarLimpiezaHerramienta"
            class="custom px-2"
            filled
            dense
            label="Producto utilizado"
            v-model="modeloLimpiezaHerramientaStore.limproducto"
            :rules="[
              reglas.campoVacio(modeloLimpiezaHerramientaStore.limproducto),
            ]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :disabled="editarLimpiezaHerramienta"
            class="custom px-2"
            filled
            dense
            label="Equipos"
            v-model="modeloLimpiezaHerramientaStore.limequipos"
            :rules="[
              reglas.campoVacio(modeloLimpiezaHerramientaStore.limequipos),
            ]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            :disabled="editarLimpiezaHerramienta"
            class="custom px-2"
            filled
            dense
            label="Maquinaria"
            v-model="modeloLimpiezaHerramientaStore.limmaquinaria"
            :rules="[
              reglas.campoVacio(modeloLimpiezaHerramientaStore.limmaquinaria),
            ]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :disabled="editarLimpiezaHerramienta"
            class="custom px-2"
            filled
            dense
            label="Herramientas"
            v-model="modeloLimpiezaHerramientaStore.limherramientas"
            :rules="[
              reglas.campoVacio(modeloLimpiezaHerramientaStore.limherramientas),
            ]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            :disabled="editarLimpiezaHerramienta"
            class="custom px-2"
            filled
            dense
            label="Cajones"
            v-model="modeloLimpiezaHerramientaStore.limcajones"
            :rules="[
              reglas.campoVacio(modeloLimpiezaHerramientaStore.limcajones),
              reglas.soloNumerosPositivos(
                modeloLimpiezaHerramientaStore.limcajones
              ),
            ]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            :disabled="editarLimpiezaHerramienta"
            class="custom px-2"
            filled
            dense
            label="Tendales"
            v-model="modeloLimpiezaHerramientaStore.limtendales"
            :rules="[
              reglas.campoVacio(modeloLimpiezaHerramientaStore.limtendales),
              reglas.soloNumerosPositivos(
                modeloLimpiezaHerramientaStore.limtendales
              ),
            ]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6"
          ><v-text-field
            :disabled="editarLimpiezaHerramienta"
            class="custom px-2"
            filled
            dense
            label="Operario"
            v-model="modeloLimpiezaHerramientaStore.limoperario"
            :rules="[
              reglas.campoVacio(modeloLimpiezaHerramientaStore.limoperario),
            ]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6"></v-col>
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
  name: "FormLimpiezaHerramienta",

  components: {
    vSelect,
  },
  mounted() {
    this.obtenerTodosFincas();
  },

  data() {
    return {
      // cultivo: null,
      fecha: null,
      menuMostrarCalendario: "", // Variable de referencia para el menú de fecha toma muestra
      fechaActual: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
      listaFinca: [],
      listaLote: [],
      fincaid: "",
      loteid: "",
      listaCultivo: [],
    };
  },

  watch: {
    fecha(val) {
      this.modeloLimpiezaHerramientaStore.limfecha = this.formatDate(
        this.fecha
      );
    },
  },

  computed: {
    // Obtiene el modelo limpiezaHerramienta
    ...mapState("moduloLimpiezaHerramienta", [
      "limpiezaHerramienta",
      "editarLimpiezaHerramienta",
    ]),

    ...mapState("moduloFinca", ["listaFincaStore"]),

    // Obtiene la variable que indica si el formulario es valido
    formLimpiezaHerramientaValido: {
      get() {
        return this.$store.getters[
          "moduloLimpiezaHerramienta/formLimpiezaHerramientaValido"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloLimpiezaHerramienta/cambiarEstadoValidoFormLimpiezaHerramienta",
          v
        );
      },
    },
    // Eliminar en caso de que todo vaya bien
    listaCultivoStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloLimpiezaHerramienta/listaCultivoStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloLimpiezaHerramienta/establecerListaCultivoStore",
          v
        );
      },
    },
    listaloteStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloLimpiezaHerramienta/listaloteStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloLimpiezaHerramienta/establecerlistaloteStore",
          v
        );
      },
    },

    // Descomentar cuando el modulo cultivos este finalizado
    // listaCultivoStore: {
    //   get() {
    //     return JSON.parse(JSON.stringify(this.$store.getters["moduloCultivo/listaCultivoStore"]));
    //   },
    //   set(v) {
    //     return this.$store.commit("moduloCultivo/establecerListaCultivoStore", v);
    //   },
    // },

    modeloLimpiezaHerramientaStore: {
      get() {
        return this.$store.getters[
          "moduloLimpiezaHerramienta/limpiezaHerramienta"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloLimpiezaHerramienta/nuevoLimpiezaHerramienta",
          v
        );
      },
    },

    // Obtiene el modelo

    //Parece redundanyte
    ...mapState("moduloLimpiezaHerramienta", ["limpiezaHerramienta"]),

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {
    // FORMATO: Modifica el formato de la fecha a dd/mm/aaaa
    formatDate(fecha) {
      if (!fecha) return null;

      const [year, month, day] = fecha.split("-");
      return `${day}/${month}/${year}`;
    },

    async obtenerTodosListaCultivo() {
      let resultado = await servicioCultivo.obtenerCultivoDetalles(this.modeloLimpiezaHerramientaStore.lotecultivadoid);
      // this.listaCultivo = resultado.data;
      this.listaCultivoStore = resultado.data;
    },

    async obtenerTodosFincas() {
      let resultado = await servicioFinca.obtenerTodosFincas();
      this.listaFinca = resultado.data;
    },

    async obtenerTodosLoteCultivadoDeFinca() {
      let resultado = await servicioLote.obtenerTodosLoteCultivadoDeFinca(
        this.modeloLimpiezaHerramientaStore.fincaid
      );
      // this.listaLote = resultado.data;
      this.listaloteStore = resultado.data;
    },

    limpiarIds() {
      this.fincaid = "";
      this.loteid = "";
    },
  },
};
</script>
