<template>
  <v-form ref="formCosecha" v-model="formCosechaValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12">
          <v-select
            id="vueSelect"
            v-model="cosecha.fincaid"
            placeholder="Seleccione una finca"
            class="style-chooser"
            label="findescripcionfinca"
            @input="ObtenerTodosLoteCultivadoDeFinca"
            :reduce="(listaFinca) => listaFinca.fincaid"
            :options="listaFinca"
            :disabled="bloquearCamposFormCosecha"
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
            v-model="cosecha.lotecultivadoid"
            placeholder="Seleccione un lote"
            class="style-chooser"
            label="lotnumero"
            @input="obtenerTodosListaCultivo"
            :reduce="(listaLoteStore) => listaLoteStore.lotecultivadoid"
            :options="listaLoteStore"
            :disabled="bloquearCamposFormCosecha"
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
            :reduce="(listaCultivoStore) => listaCultivoStore.cultivoid"
            :options="listaCultivoStore"
            :disabled="bloquearCamposFormCosecha"
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
                :rules="[reglas.campoVacio(cosecha.cosfecha)]"
                readonly
                v-bind="attrs"
                v-on="on"
                :disabled="bloquearCamposFormCosecha"
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
            v-model="cosecha.coscantidad"
            type="Number"
            @change="obtenerCodigoCosecha()"
            label="Cantidad"
            class="custom px-2"
            dense
            filled
            :rules="[reglas.campoVacio(cosecha.coscantidad), reglas.soloNumerosPositivos(cosecha.coscantidad)]"
            :disabled="bloquearCamposFormCosecha"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="cosecha.cosunidad"
            placeholder="Seleccione Unidad"
            class="style-chooser"
            :reduce="(listaunidad) => listaunidad"
            :options="listaunidad"
            :rules="[reglas.campoVacio(cosecha.cosunidad)]"
            :disabled="bloquearCamposFormCosecha"
          >
          </v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="cosecha.cospesototal"
            type="Number"
            label="Peso Total (Kg)"
            class="custom px-2"
            dense
            filled
            placeholder="Peso en Kg"
            :rules="[reglas.campoVacio(cosecha.cospesototal), reglas.soloNumerosPositivos(cosecha.cospesototal)]"
            :disabled="bloquearCamposFormCosecha"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field 
          v-model="cosecha.coscodigo"
          label="Código"
          :disabled="bloquearCamposFormCosecha"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-textarea
            v-model="cosecha.cosobservacion"
            label="Observación"
            class="custom px-2"
            dense
            filled
            :rules="[reglas.campoVacio(cosecha.cosobservacion)]"
            :disabled="bloquearCamposFormCosecha"
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
import ServicioCosecha from "../services/ServicioCosecha";

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
      preeditar:null,
      noeditar: true,
      selecionado: "",    
      };
  },

  computed: {
    // Obtiene el modelo lot
    ...mapState("moduloCosecha", ["cosecha"]),

    cosecha: {
      get() {
        return this.$store.getters["moduloCosecha/cosecha"];
      },
      set(v) {
        return this.$store.commit("moduloCosecha/setCosecha", v);
      },
    },


    // Obtiene la variable que indica si el formulario es valido
    formCosechaValido: {
      get() {
        return this.$store.getters["moduloCosecha/formCosechaValido"];
      },
      set(v) {
        return this.$store.commit("moduloCosecha/cambiarEstadoFormCosechaValido", v);
      },
    },

    listaCultivoStore: {
      get() {
        return this.$store.getters["moduloCosecha/listaCultivoStore"];
      },
      set(v) {
        //this.n_step = 1;
        return this.$store.commit("moduloCosecha/asignarListaCultivo", v);
      },
    },

    listaLoteStore: {
      get() {
        return this.$store.getters["moduloCosecha/listaLoteStore"];
      },
      set(v) {
        //this.n_step = 1;
        return this.$store.commit("moduloCosecha/asignarListaLote", v);
      },
    },

    bloquearCamposFormCosecha:{
      get() {
        return this.$store.getters["moduloCosecha/bloquearCamposFormCosecha"];
      },
      set(v) {
        return this.$store.commit("moduloCosecha/cambiarBloquearCamposFormCosecha", v);
      },
    },
    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {
     async changeState(valor) {
      this.selecionado = this.listaFinca[valor - 1];
    },
    async obtenerTodosFincas() {
      let resultado = await servicioFinca.obtenerTodosFincas();
      this.listaFinca = resultado.data;
      
    },
    async ObtenerTodosLoteCultivadoDeFinca() {
      let resultado = await servicioLote.obtenerTodosLoteCultivadoDeFinca(
        this.cosecha.fincaid
      );
      console.log(resultado.data);
      this.listaLoteStore = resultado.data;
    },
    async obtenerTodosListaCultivo() {
      console.log(this.cosecha.lotecultivadoid);
      let resultado = await servicioCultivo.obtenerCultivoDetalles(
        this.cosecha.lotecultivadoid
      );
      console.log(resultado.data);
      this.listaCultivoStore = resultado.data;
    },
    async obtenerCodigoCosecha(){
      let resultado = await servicioCultivo.obtenerCultivoDetalles(this.cosecha.loteid);
      const finca = this.listaFinca.find( finca => finca.fincaid === this.cosecha.fincaid );
      const cultivo =resultado.data.find( cultivo=> cultivo.cultivoid === this.cosecha.cultivoid )
      let division = cultivo.detalles.split('|');
      let fecha=this.cosecha.cosfecha.split('-');
      this.cosecha.coscodigo= finca.fincodigo +"-" +fecha[2]+fecha[1]+fecha[0] +"-"+division[1].trim()
      
    },

    cambiarEstadoEditar(){
      this.noeditar = !this.noeditar;
    }
  },

  mounted() {
    this.obtenerTodosFincas();    
  },
};
</script>
