<template>
  <v-form ref="formSiembra" v-model="formSiembraValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12">
          <v-select
            v-model="siembra.fincaid"
            placeholder="Seleccione una finca"
            class="style-chooser"
            label="findescripcionfinca"
            @input="obtenerTodosLoteCultivadoDeFinca"
            :reduce="(listaFinca) => listaFinca.fincaid"
            :options="listaFinca"
            :disabled="bloquearCamposFormSiembra"
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
            v-model="siembra.loteid"
            placeholder="Seleccione un lote"
            class="style-chooser"
            label="lotnumero"
            @input="obtenerTodosListaCultivo"
            :reduce="(listaLote) => listaLote.lotecultivadoid"
            :options="listaLote"
            :disabled="bloquearCamposFormSiembra"
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
            v-model="siembra.cultivoid"
            placeholder="Seleccione un Cultivo"
            class="style-chooser"
            label="detalles"
            :reduce="(listaCultivo) => listaCultivo.cultivoid"
            :options="listaCultivo"
            :disabled="bloquearCamposFormSiembra"
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
            v-model="menuDateShowb"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="Fecha de compra semilla"
                v-model="siembra.siefechacomprasemilla" class="custom px-2" filled dense
                :rules="[reglas.campoVacio(siembra.siefechacomprasemilla)]"
                readonly
                v-bind="attrs"
                v-on="on"
                :disabled="bloquearCamposFormSiembra"
              ></v-text-field>
            </template>
            <v-date-picker v-model="siembra.siefechacomprasemilla" @input="menuDateShowb = false" :show-current="currentDate" locale="es-419" ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Proveedor de la Semilla"
            v-model="siembra.sieproveedorsemilla"
            class="custom px-2"
            filled
            dense
            :rules="[reglas.campoVacio(siembra.sieproveedorsemilla)]"
            :disabled="bloquearCamposFormSiembra"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-menu
            v-model="menuDateShow"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="Fecha de Siembra"
                v-model="siembra.siefechasiembra" class="custom px-2" filled dense
                :rules="[reglas.campoVacio(siembra.siefechasiembra)]"
                readonly
                v-bind="attrs"
                v-on="on"
                :disabled="bloquearCamposFormSiembra"
              ></v-text-field>
            </template>
            <v-date-picker v-model="siembra.siefechasiembra" @input="menuDateShow = false" :show-current="currentDate" locale="es-419" ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6"
          ><v-text-field
            label="Hectareas"
            type="Number"
            v-model="siembra.siehectareas"
            class="custom px-2"
            filled
            dense
            :rules="[
              reglas.campoVacio(siembra.siehectareas),
              reglas.soloNumerosPositivos(siembra.siehectareas),
            ]"
            error-count="2"
            :disabled="bloquearCamposFormSiembra"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            label="Operario"
            v-model="siembra.sieoperario"
            class="custom px-2"
            filled
            dense
            :rules="[reglas.campoVacio(siembra.sieoperario)]"
            :disabled="bloquearCamposFormSiembra"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Cantidad de Plantas"
            type="Number"
            v-model="siembra.siecantidadplantas"
            class="custom px-2"
            filled
            dense
            :rules="[
              reglas.campoVacio(siembra.siecantidadplantas),
              reglas.soloNumeros(siembra.siecantidadplantas),
              reglas.soloNumerosPositivos(siembra.siecantidadplantas),
            ]"
            error-count="3"
            :disabled="bloquearCamposFormSiembra"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import servicioSiembra from "../services/ServicioSiembra";

//Se importa los servicios para el encabezado de finca/lote/cultivo
import servicioLote from "../services/ServicioLote";
import servicioFinca from "../services/ServicioFinca";
import servicioCultivo from "../services/ServicioCultivo";

export default {
  name: "FormularioSiembra",

  components: {
    vSelect,
  },

  data() {
    return {
      listaCultivosDetalle: [],
      listaLote: [],
      listaFinca:[],
      listaCultivo: [],
      menuDateShow: "", // Variable de referencia para el menú de fecha toma muestra
      menuDateShowb: "",// Variable de referencia para el menú de fecha toma muestra
      currentDate: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  computed: {

    ...mapState("moduloFinca", ["listaFincaStore"]),

    // Obtiene el modelo Control Maleza
    siembra: {
      get() {
        return this.$store.getters["moduloSiembra/siembra"];
      },
      set(v) {
        return this.$store.commit("moduloSiembra/agregarSiembra", v);
      },
    },


    // Obtiene la variable que indica si el formulario es valido
    formSiembraValido: {
      get() {
        return this.$store.getters["moduloSiembra/formSiembraValido"];
      },
      set(v) {
        return this.$store.commit("moduloSiembra/cambiarEstadoFormSiembraValido", v);
      },
    },


    // Obtiene la variable bloquearCamposFormSiembra
    bloquearCamposFormSiembra: {
      get() {
        return this.$store.getters["moduloSiembra/bloquearCamposFormSiembra"];
      },
      set(v) {
        return this.$store.commit("moduloSiembra/cambiarBloquearCamposFormSiembra", v);
      },
    },


    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
    
  },

  methods: {
    async obtenerTodosListaCultivoDetalles() {
      let resultado = await servicioSiembra.obtenerTodosListaCultivoDetalles();
      this.listaCultivosDetalle = resultado.data;
    },

    //Se obtiene la lista de finca/lote/cultivo
    async obtenerTodosListaCultivo() {
      console.log(this.siembra.loteid);
      let resultado = await servicioCultivo.obtenerCultivoDetalles(this.siembra.loteid);
      this.listaCultivo = resultado.data; 

    },
      async obtenerTodosFincas() {
      let resultado = await servicioFinca.obtenerTodosFincas();
      this.listaFinca = resultado.data;
       
    },
      async obtenerTodosLoteCultivadoDeFinca() {
      let resultado = await servicioLote.obtenerTodosLoteCultivadoDeFinca(this.siembra.fincaid);
      this.listaLote = resultado.data; 
      
    },



  },


  mounted() {
    this.obtenerTodosListaCultivoDetalles();
    this.obtenerTodosFincas();
  },
};
</script>
