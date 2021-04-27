<template>
  <v-form ref="formFertilizante" v-model="formFertilizanteValido">
    <v-container>
      <v-row
        no-gutters
        justify-md="space-around"
        :class="$vuetify.breakpoint.xs ? '' : 'mb-5'"
      >
        <v-col cols="12" md="5">
          <v-select
            :disabled="bloquearCamposFormFertilizante"
            @input="obtenerTodosLoteCultivadoDeFinca" 
            v-model="modeloFertilizanteStore.fincaid"
            placeholder="Finca"
            class="style-chooser"
            label="finnombrefinca"
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
        <v-col cols="12" md="5">
          <v-select
            :disabled="bloquearCamposFormFertilizante"
            v-model="modeloFertilizanteStore.lotecultivadoid"
            placeholder="Lote"
            class="style-chooser"
            label="lotnumero"
            @input="obtenerTodosListaCultivo" 
            :reduce="(listaloteStore) => listaloteStore.lotecultivadoid"
            :options="listaloteStore"

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
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
         <v-select
            :disabled="bloquearCamposFormFertilizante"
            v-model="modeloFertilizanteStore.cultivoid"
            placeholder="Cultivo"
            class="style-chooser"
            label="detalles"
            :reduce="(listacultivoStore) => listacultivoStore.cultivoid"
            :options="listacultivoStore"
            :rules="[reglas.campoVacio(modeloFertilizanteStore.cultivoid)]"
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
            :disabled="bloquearCamposFormFertilizante"
            placeholder="Ciclo"
            v-model="modeloFertilizanteStore.ferciclo"
            :rules="[
                      reglas.soloNumerosPositivos(modeloFertilizanteStore.ferciclo),
                      reglas.campoVacio(modeloFertilizanteStore.ferciclo)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
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
                :disabled="bloquearCamposFormFertilizante"
                label="Fecha"
                v-model="modeloFertilizanteStore.ferfecha"
                :rules="[reglas.campoVacio(modeloFertilizanteStore.ferfecha)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="modeloFertilizanteStore.ferfecha"
              @input="menuMostrarCalendario = false"
              :show-current="fechaActual"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="bloquearCamposFormFertilizante"
            placeholder="Nombre comercial"
            v-model="modeloFertilizanteStore.fernombrecomercial"
            :rules="[reglas.campoVacio(modeloFertilizanteStore.fernombrecomercial)]"
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="bloquearCamposFormFertilizante"
            placeholder="Elementos"
            v-model="modeloFertilizanteStore.ferelementos"
            :rules="[reglas.campoVacio(modeloFertilizanteStore.ferelementos)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="bloquearCamposFormFertilizante"
            placeholder="Concentración: (%)"
            v-model="modeloFertilizanteStore.ferconcentracion"
            :rules="[
                    reglas.soloNumerosPositivos(modeloFertilizanteStore.ferconcentracion),
                    reglas.campoVacio(modeloFertilizanteStore.ferconcentracion)]"
                   
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="bloquearCamposFormFertilizante"
            placeholder="Área aplicada (HA)"
            v-model="modeloFertilizanteStore.ferareaaplicada"
            :rules="[
                      //reglas.soloNumeros(modeloFertilizanteStore.ferareaaplicada),
                      reglas.soloNumerosPositivos(modeloFertilizanteStore.ferareaaplicada),
                      reglas.campoVacio(modeloFertilizanteStore.ferareaaplicada),
                      ]"
                      error-count="2"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="bloquearCamposFormFertilizante"
            placeholder="Cantidad aplicada"
            v-model="modeloFertilizanteStore.fercantidadaplicada"
            :rules="[
                      //reglas.soloNumeros(modeloFertilizanteStore.fercantidadaplicada),
                      reglas.soloNumerosPositivos(modeloFertilizanteStore.fercantidadaplicada),
                      reglas.campoVacio(modeloFertilizanteStore.fercantidadaplicada),
                      ]"
                      error-count="2"
           ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="bloquearCamposFormFertilizante"
            placeholder="Unidad de medida"
            v-model="modeloFertilizanteStore.ferunidadmedida"
            :rules="[reglas.campoVacio(modeloFertilizanteStore.ferunidadmedida)]"
            
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="bloquearCamposFormFertilizante"
            placeholder="Equipo de aplicación"
            v-model="modeloFertilizanteStore.ferequipoaplicacion"
            :rules="[reglas.campoVacio(modeloFertilizanteStore.ferequipoaplicacion)]"
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="bloquearCamposFormFertilizante"
            placeholder="Método de aplicación"
            v-model="modeloFertilizanteStore.fermetodoaplicacion"
            :rules="[reglas.campoVacio(modeloFertilizanteStore.fermetodoaplicacion)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            :disabled="bloquearCamposFormFertilizante"
            placeholder="Operario"
            v-model="modeloFertilizanteStore.feroperario"
            :rules="[reglas.campoVacio(modeloFertilizanteStore.feroperario)]"
          ></v-text-field>           
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from "vuex";
import servicioCultivo from "../services/ServicioCultivo";
import servicioLote from "../services/ServicioLote";
import servicioFinca from "../services/ServicioFinca";
import vSelect from "vue-select";

import "vue-select/dist/vue-select.css";

export default {
  name: "FormFertilizante",

  components: {
    vSelect,
  },
  mounted() {
    this.obtenerTodosFincas();
    
  },
  data() {
    return {
      listaFinca: [],
      listaLote: [],
      listaCultivo: [],
      listaOperario: [],
      menuMostrarCalendario: "", // Variable de referencia para el menú de fecha toma muestra
      fechaActual: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  computed: {
    ...mapState("moduloFertilizante", ["modeloFertilizanteStore"]),

    // Obtiene la variable que indica si el formulario es valido
    formFertilizanteValido: {
      get() {
        return this.$store.getters["moduloFertilizante/formFertilizanteValido"];
      },
      set(v) {
        return this.$store.commit("moduloFertilizante/cambiarEstadoValidoFormFertilizante", v);
      },
    },

    modeloFertilizanteStore: {
      get() {
        return this.$store.getters["moduloFertilizante/modeloFertilizanteStore"];
      },
      set(v) {
        return this.$store.commit("moduloFertilizante/establecerModeloFertilizanteStore", v);
      },
    },


    listacultivoStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloFertilizante/listacultivoStore"]));
      },
      set(v) {
        return this.$store.commit("moduloFertilizante/establecerlistacultivoStore", v);
      },
    },

    listaloteStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloFertilizante/listaloteStore"]));
      },
      set(v) {
        return this.$store.commit("moduloFertilizante/establecerlistaloteStore", v);
      },
    },



  bloquearCamposFormFertilizante: {
      get() {
        return this.$store.getters["moduloFertilizante/bloquearCamposFormFertilizante"];
      },
      set(v) {
        return this.$store.commit("moduloFertilizante/cambiarBloquearCamposFormFertilizante", v);
      },
    },
    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  
  methods: {
      async obtenerTodosListaCultivo() {
      let resultado = await servicioCultivo.obtenerCultivoDetalles(this.modeloFertilizanteStore.lotecultivadoid);
      this.listacultivoStore = resultado.data; 
    },
      async obtenerTodosFincas() {
      let resultado = await servicioFinca.obtenerTodosFincas();
      this.listaFinca = resultado.data; 
    },
      async obtenerTodosLoteCultivadoDeFinca() {
      let resultado = await servicioLote.obtenerTodosLoteCultivadoDeFinca(this.modeloFertilizanteStore.fincaid);
      this.listaloteStore = resultado.data; 
      
    },
      
   



  },
  
};
</script>
