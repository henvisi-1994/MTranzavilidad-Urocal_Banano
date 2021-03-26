<template>
  <v-form ref="formCosecha" v-model="formCosechaValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12">
          <v-select
            v-model="cosecha.fincaid"
            placeholder="Seleccione una finca"
            class="style-chooser"
            label="findescripcionfinca"
            @input="ObtenerTodosLoteCultivadoDeFinca"
            :reduce="(listaFinca) => listaFinca.fincaid"
            :options="listaFinca"
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
        <v-col cols="12">
          <v-select
            v-model="cosecha.loteid"
            placeholder="Seleccione un lote"
            class="style-chooser"
            label="lotnumero"
            @input="obtenerTodosListaCultivo"
            :reduce="(listaLote) => listaLote.lotecultivadoid"
            :options="listaLote"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir un lote</em>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12">
          <v-select
            v-model="cosecha.cultivoid"
            placeholder="Seleccione un Cultivo"
            class="style-chooser"
            label="detalles"
            :reduce="(listacultivo) => listacultivo.cultivoid"
            :options="listacultivo"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir un Cultivo</em>
            </template>
          </v-select>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-menu
            v-model="menuMostrarCalendario"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="cosecha.cosfecha"
                class="custom px-2"
                dense
                filled
                label="Fecha"
                readonly
                v-bind="attrs"
                v-on="on"
              >
              </v-text-field>
            </template>
            <v-date-picker
              v-model="cosecha.cosfecha"
              @input="menuMostrarCalendario = false"
              :show-current="fechaActual"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Cantidad"
            class="custom px-2"
            dense
            filled
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            placeholder="Seleccione Unidad"
            class="style-chooser"
            :reduce="(listaunidad) => listaunidad"
            :options="listaunidad"
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Peso Total (Kg)"
            class="custom px-2"
            dense
            filled
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field label="Código"></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea
            label="Observación"
            class="custom px-2"
            dense
            filled
          ></v-textarea>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from "vuex";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import servicioCultivo from "../services/ServicioCultivo";
import servicioFinca from "../services/ServicioFinca";
import servicioLote from "../services/ServicioLote";
export default {
  name: "formCosecha",

  components: {
    vSelect,
  },

  data() {
    return {
      menuMostrarCalendario: "",
      fechaActual: new Date().toISOString().substr(0, 10), // Fecha actual
      listacultivo: [],
      listaFinca: [],
      listaLote: [],
      listaunidad: ["Quintales", "Tachos"],
    };
  },

  computed: {
    // Obtiene el modelo lot
    ...mapState("moduloCosecha", ["cosecha"]),

    // Obtiene la variable que indica si el formulario es valido
    formCosechaValido: {
      get() {
        return this.$store.getters["moduloCosecha/ormCosechaValido"];
      },
      set(v) {
        return this.$store.commit(
          "moduloCosecha/cambiarEstadoFormCosechaValido",
          v
        );
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {
    async obtenerTodosFincas() {
      let resultado = await servicioFinca.obtenerTodosFincas();
      this.listaFinca = resultado.data;
      
    },
    async ObtenerTodosLoteCultivadoDeFinca() {
      let resultado = await servicioLote.obtenerTodosLoteCultivadoDeFinca(
        this.cosecha.fincaid
      );
      console.log(resultado.data);
      this.listaLote = resultado.data;
    },
    async obtenerTodosListaCultivo() {
      let resultado = await servicioCultivo.obtenerCultivoDetalles(
        this.cosecha.loteid
      );
      console.log(resultado.data);
      this.listacultivo = resultado.data;
    },
  },

  mounted() {
    this.obtenerTodosFincas();
  },
};
</script>
