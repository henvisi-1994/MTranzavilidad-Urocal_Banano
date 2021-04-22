<template>
  <v-form ref="formularioDetalleDespacho" v-model="formDetalleDespachoValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12">
          <v-select
            v-model="detalledespacho.almacenamientoid"
            placeholder="Seleccione un Almacén"
            class="style-chooser"
            label="detalles"
            :reduce="(listaAlmacenAcopio) => listaAlmacenAcopio.almacenamientoid"
            :options="listaAlmacenAcopio"
            :disabled="bloquearCamposFormDetalleDespacho"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Escriba el Almacenamiento</em>
            </template>
          </v-select>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            label="Número de Bultos"
            @change="CambiaNumeroBultos"
            v-model="detalledespacho.detdesnumerobultos"
            type="Number"   
            class="custom px-2"
            filled
            dense
            :rules="[
              reglas.campoVacio(detalledespacho.detdesnumerobultos),
              reglas.soloNumerosPositivos(detalledespacho.detdesnumerobultos),
            ]"
            error-count="3"
             
            :disabled="bloquearCamposFormDetalleDespacho"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            label="Peso Unitario"
            type="Number"
            @change="CambiaPesoUnitario"
            v-model="detalledespacho.detdespesounitario"
            class="custom px-2"
            filled
            dense
            :rules="[
              reglas.campoVacio(detalledespacho.detdespesounitario),
              reglas.soloNumerosPositivos(detalledespacho.detdespesounitario),]"
            error-count="3"
             
            :disabled="bloquearCamposFormDetalleDespacho"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            label="Peso Total"
            type="Number"
            v-model="detalledespacho.detdespesototal"
            class="custom px-2"
            filled
            dense
            :rules="[
              reglas.campoVacio(detalledespacho.detdespesototal),
              reglas.soloNumerosPositivos(detalledespacho.detdespesototal),
              ]"
            error-count="3"
            
            :disabled=1
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>


<script>
import { mapMutations, mapState } from "vuex";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import servicioDetalleDespacho from "../services/ServicioDetalleDespacho";

export default {
  name: "FormularioDetalleDespacho",

  components: {
    vSelect,
  },

  data() {
    return {
      listaAlmacenAcopio: [],
      

    };
  },

  computed: {

    // Obtiene el modelo detalledespacho
    detalledespacho: {
      get() {
        return this.$store.getters["moduloDetalleDespacho/detalledespacho"];
      },
      set(v) {
        return this.$store.commit("moduloDetalleDespacho/agregarDetalleDespacho", v);
      },
    },


    // Obtiene la variable que indica si el formulario es valido
    formDetalleDespachoValido: {
      get() {
        return this.$store.getters["moduloDetalleDespacho/formDetalleDespachoValido"];
      },
      set(v) {
        return this.$store.commit("moduloDetalleDespacho/cambiarEstadoFormDetalleDespachoValido", v);
      },
    },


    // Obtiene la variable bloquearCamposFormDetalleDespacho
    bloquearCamposFormDetalleDespacho: {
      get() {
        return this.$store.getters["moduloDetalleDespacho/bloquearCamposFormDetalleDespacho"];
      },
      set(v) {
        return this.$store.commit("moduloDetalleDespacho/cambiarBloquearCamposFormDetalleDespacho", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {

    // Llena la listaAlmacenAcopio con datos del servidor backend
    async obtenerTodosListaAcopio() {
      let resultado = await servicioDetalleDespacho.obtenerTodosListaAcopio();
      this.listaAlmacenAcopio = resultado.data;
    },
    
    //Calcula Peso total cuando cambia peso unitario
    CambiaPesoUnitario(event){
      
      let numBultos, pesUnitario;
      numBultos=this.detalledespacho.detdesnumerobultos;
      pesUnitario=this.detalledespacho.detdespesounitario;
      this.detalledespacho.detdespesototal=numBultos*pesUnitario;
      
    },
    // Calcula peso total cuando cambia numero de bultos
    CambiaNumeroBultos(event){
      
      let numBultos, pesUnitario;
      numBultos=this.detalledespacho.detdesnumerobultos;
      pesUnitario=this.detalledespacho.detdespesounitario;
      this.detalledespacho.detdespesototal=numBultos*pesUnitario;
      
    }
    



  },

  mounted() {
    // Llama al metodo obtenerTodosListaAcopio
    this.obtenerTodosListaAcopio();
  },
};
</script>