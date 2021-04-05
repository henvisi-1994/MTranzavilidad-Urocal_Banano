<template>
  <v-form ref="formTratamiento" v-model="formTratamientoValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-select
            placeholder="Finca"
            class="style-chooser"
            label="findescripcionfinca"
            v-model="modeloTratamientoStore.fincaid"
            :disabled="editarTratamiento"
            @input="obtenerTodosLoteCultivadoDeFinca"
            :reduce="(listaFinca) => listaFinca.fincaid"
            :options="listaFinca"
            :rules="[reglas.campoVacio(modeloTratamientoStore.fincaid)]"
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
            placeholder="Lote"
            class="style-chooser"
            label="lotnumero"
            v-model="loteid"
            :disabled="editarTratamiento"
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
              <em
                style="opacity: 0.5"
                v-else-if="!modeloTratamientoStore.fincaid"
                >Escoja una finca</em
              >
              <em style="opacity: 0.5" v-else>Empiece a escribir un lote</em>
            </template>
          </v-select>
        </v-col>

        <v-col cols="12" md="5">
          <v-select
            placeholder="Cultivo"
            class="style-chooser"
            v-model="modeloTratamientoStore.cultivoid"
            label="detalles"
            :disabled="editarTratamiento"
            :reduce="(listaCultivo) => listaCultivo.cultivoid"
            :options="listaCultivo"
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
          <v-text-field
            v-model="modeloTratamientoStore.traubicacion"
            :disabled="editarTratamiento"
            label="Ubicación "
          >
          </v-text-field>
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
                label="Fecha de Tratamiento"
                v-model="modeloTratamientoStore.trafecha"
                class="custom px-2"
                filled
                dense
                :disabled="editarTratamiento"
                :rules="[reglas.campoVacio(modeloTratamientoStore.trafecha)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="modeloTratamientoStore.trafecha"
              @input="menuDateShowb = false"
              :show-current="currentDate"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="12">
          <v-textarea
            v-model="modeloTratamientoStore.traobservacion"
            :disabled="editarTratamiento"
            label="Observación"
          ></v-textarea>
        </v-col>
        <v-col cols="12" md="5"> </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-select
            placeholder="Tipo  de Tratamiento"
            class="style-chooser"
            v-model="detalle.dtratipo"
            :disabled="editarTratamiento"
            label="nombre"
            :reduce="(listaTipo) => listaTipo.descripcion"
            :options="listaTipo"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else
                >Empiece a escribir una Tipo de Tratamiento</em
              >
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" md="5"></v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-select
            placeholder="Unidad de peso"
            class="style-chooser"
            v-model="detalle.dtraunidad"
            :disabled="editarTratamiento"
            label="nombre"
            :reduce="(listaUnidad) => listaUnidad.descripcion"
            :options="listaUnidad"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else
                >Empiece a escribir una Tipo de Tratamiento</em
              >
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            class="custom px-2"
            filled
            dense
            v-model="detalle.dtracantidad"
            :disabled="editarTratamiento"
            label="Cantidad"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-menu
            v-model="menuMostrarCalendarioFi"
            :disabled="editarTratamiento"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="Fecha de Inicio"
                v-model="detalle.dtrafechainicio"
                :disabled="editarTratamiento"
                class="custom px-2"
                filled
                dense
                :rules="[reglas.campoVacio(detalle.dtrafechainicio)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="detalle.dtrafechainicio"
              @input="menuMostrarCalendarioFi = false"
              :show-current="currentDate"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-menu
            v-model="menuMostrarCalendarioFf"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="Fecha de Finalización"
                v-model="detalle.dtrafechafin"
                :disabled="editarTratamiento"
                class="custom px-2"
                filled
                dense
                :rules="[reglas.campoVacio(detalle.dtrafechafin)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="detalle.dtrafechafin"
              @input="menuMostrarCalendarioFf = false"
              :show-current="currentDate"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-btn
          elevation="0"
          large
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px"
          color="primary"
          :disabled="editarTratamiento"
          @click="agregarDetalleTra()"
          >Agregar Detalle de Tratamiento</v-btn
        >
      </v-row>
      <v-row no-gutters justify-md="space-around" class="mt-10">
        <v-col cols="11">
          <v-data-table
            :headers="cabeceraTablaDetalleTratamiento"
            :items="modeloTratamientoStore.detalle"
            class="elevation-1"
            no-data-text="No se han agregado detalle"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon color="primary" :disabled="editarTratamiento"  @click="eliminarDetalleTra(item)">
                mdi-trash-can
              </v-icon>
              <v-icon color="primary" :disabled="editarTratamiento" @click="editarDetalleTra(item)">
                mdi-eye
              </v-icon>
            </template>
          </v-data-table>
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
  name: "formTratamiento",

  components: {
    vSelect,
  },
  mounted() {
    this.obtenerTodosFincas();
  },
  data() {
    return {
      menuMostrarCalendario: "",
      menuMostrarCalendarioFi: "",
      menuMostrarCalendarioFf: "",
      cabeceraTablaDetalleTratamiento: [
        {
          text: "Tipo",
          value: "dtratipo",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Unidad",
          value: "dtraunidad",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Cantidad",
          value: "dtracantidad",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha Inicio",
          value: "dtrafechainicio",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha Fin",
          value: "dtrafechafin",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Detalles",
          value: "actions",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
      ],
      listaLote: [],
      listaFinca: [],
      listaCultivo: [],
      listaTipo: [
        { nombre: "Secado", descripcion: "SECADO" },
        { nombre: "Fermentacion", descripcion: "FERMENTACION" },
      ],
      listaUnidad: [
        { nombre: "Quintales", descripcion: "QUINTALES" },
        { nombre: "Libras", descripcion: "LIBRAS" },
      ],
      detalle: {
        dtratipo: "",
        dtraunidad: "",
        dtracantidad: "",
        dtrafechainicio: "",
        dtrafechafin: "",
      },
      loteid: "",
      currentDate: new Date().toISOString().substr(0, 10),
    };
  },

  computed: {
    ...mapState("moduloTratamiento", [
      "modeloTratamientoStore",
      "editarTratamiento",
    ]),
    // Obtiene la variable que indica si el formulario es valido
    formTratamientoValido: {
      get() {
        return this.$store.getters["moduloTratamiento/formTratamientoValido"];
      },
      set(v) {
        return this.$store.commit(
          "moduloTratamiento/cambiarEstadoValidoFormTratamiento",
          v
        );
      },
    },

    modeloTratamientoStore: {
      get() {
        return this.$store.getters["moduloTratamiento/modeloTratamientoStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloTratamiento/establecerModeloTratamientoStore",
          v
        );
      },
    },

    editarTratamiento: {
      get() {
        return this.$store.getters["moduloTratamiento/editarTratamiento"];
      },
      set(v) {
        return this.$store.commit(
          "moduloTratamiento/establecerEditarTratamiento",
          v
        );
      },
    },
    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {
    async obtenerTodosListaCultivo() {
      console.log(this.loteid);
      let resultado = await servicioCultivo.obtenerCultivoDetalles(this.loteid);
      this.listaCultivo = resultado.data;
    },
    async obtenerTodosFincas() {
      let resultado = await servicioFinca.obtenerTodosFincas();
      this.listaFinca = resultado.data;
    },
    async obtenerTodosLoteCultivadoDeFinca() {
      let resultado = await servicioLote.obtenerTodosLoteCultivadoDeFinca(
        this.modeloTratamientoStore.fincaid
      );
      this.listaLote = resultado.data;
    },
    agregarDetalleTra() {
      this.modeloTratamientoStore.detalle.push(this.detalle);
      this.vaciarDetalleTra();
    },
    vaciarDetalleTra() {
      this.detalle = JSON.parse(
        JSON.stringify({
          dtratipo: "",
          dtraunidad: "",
          dtracantidad: "",
          dtrafechainicio: "",
          dtrafechafin: "",
        })
      );
    },
    eliminarDetalleTra(item) {
      const index = this.modeloTratamientoStore.detalle.indexOf(item);
      this.modeloTratamientoStore.detalle.splice(index, 1);
    },
    editarDetalleTra(item) {
      const index = this.modeloTratamientoStore.detalle.indexOf(item);
       this.detalle = JSON.parse(
        JSON.stringify({
          dtratipo: item.dtratipo,
          dtraunidad: item.dtraunidad,
          dtracantidad: item.dtracantidad,
          dtrafechainicio: item.dtrafechainicio,
          dtrafechafin: item.dtrafechafin,
        })
      );
    },
  },
};
</script>
