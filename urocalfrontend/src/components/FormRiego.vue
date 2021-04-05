<template>
  <v-form ref="formRiego" v-model="formRiegoValido">
    <v-container>
      <v-row
        no-gutters
        justify-md="space-around"
        :class="$vuetify.breakpoint.xs ? '' : 'mb-5'"
      >
        <v-col cols="12" md="5">
          <v-select
            :disabled="editarRiego"
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
            :disabled="editarRiego"
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
              <em style="opacity: 0.5" v-else-if="!fincaid">Escoja una finca</em>
              <em style="opacity: 0.5" v-else>Empiece a escribir un lote</em>
            </template>
          </v-select>
        </v-col>


      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-select
            :disabled="editarRiego"
            v-model="modeloRiegoStore.cultivoid"
            placeholder="Cultivo"
            class="style-chooser"
            label="detalles"
            :reduce="(listaCultivo) => listaCultivo.cultivoid"
            :options="listaCultivo"
            :rules="[reglas.campoVacio(modeloRiegoStore.cultivoid)]"
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
          <v-text-field
            :disabled="editarRiego"
            placeholder="Superficie"
            v-model="modeloRiegoStore.riesuperficie"
            :rules="[reglas.campoVacio(modeloRiegoStore.riesuperficie),
            reglas.soloNumeros(modeloRiegoStore.riesuperficie)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="editarRiego"
            placeholder="Módulos"
            v-model="modeloRiegoStore.riemodulos"
            :rules="[reglas.campoVacio(modeloRiegoStore.riemodulos),
            reglas.soloNumeros(modeloRiegoStore.riemodulos)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="editarRiego"
            placeholder="Semana"
            v-model="modeloRiegoStore.riesemana"
            :rules="[reglas.campoVacio(modeloRiegoStore.riesemana),
            reglas.soloNumeros(modeloRiegoStore.riesemana)]"
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="editarRiego"
            placeholder="Año"
            v-model="modeloRiegoStore.rieanio"
            :rules="[reglas.campoVacio(modeloRiegoStore.rieanio),
            reglas.soloNumeros(modeloRiegoStore.rieanio)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="editarRiego"
            placeholder="Horas regadas (HH:MM:SS)"
            v-model="modeloRiegoStore.riehorasregadas"
            :rules="[reglas.campoVacio(modeloRiegoStore.riehorasregadas)]"
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="editarRiego"
            placeholder="Porcentaje de eficiencia"
            v-model="modeloRiegoStore.rieporcentajeeficiencia"
            :rules="[reglas.campoVacio(modeloRiegoStore.rieporcentajeeficiencia),
            reglas.soloNumeros(modeloRiegoStore.rieporcentajeeficiencia)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="editarRiego"
            placeholder="Volumen de agua utilizado"
            v-model="modeloRiegoStore.rievolumenutilizado"
            :rules="[reglas.campoVacio(modeloRiegoStore.rievolumenutilizado),
            reglas.soloNumeros(modeloRiegoStore.rievolumenutilizado)]"
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="editarRiego"
            placeholder="Operador"
            v-model="modeloRiegoStore.rieoperario"
            :rules="[reglas.campoVacio(modeloRiegoStore.rieoperario)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="editarRiego"
            placeholder="Sistema de riego"
            v-model="modeloRiegoStore.riesistemariego"
            :rules="[reglas.campoVacio(modeloRiegoStore.riesistemariego)]"
          ></v-text-field
        ></v-col>
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
  name: "FormRiego",

  components: {
    vSelect,
  },

  mounted() {
    this.obtenerTodosFincas();
  },

  data() {
    return {
      listaLote: [],
      listaFinca:[],
      fincaid: '',
      loteid: '',
      listaCultivo: [],
    }
  },

  computed: {
    ...mapState("moduloRiego", ["modeloRiegoStore", "editarRiego"]),
    ...mapState("moduloFinca", ["listaFincaStore"]),

    formRiegoValido: {
      get() {
        return this.$store.getters["moduloRiego/formRiegoValido"];
      },
      set(v) {
        return this.$store.commit("moduloRiego/cambiarEstadoValidoFormRiego", v);
      },
    },

    modeloRiegoStore: {
      get() {
        return this.$store.getters["moduloRiego/modeloRiegoStore"];
      },
      set(v) {
        return this.$store.commit("moduloRiego/establecerModeloRiegoStore", v);
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
      let resultado = await servicioLote.obtenerTodosLoteCultivadoDeFinca(this.fincaid);
      this.listaLote = resultado.data; 
      
    },
    limpiarIds(){
      this.fincaid = '';
      this.loteid = '';
    }
  },
};
</script>
