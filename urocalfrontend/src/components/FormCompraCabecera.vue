<template>
  <v-form ref="formCompra" v-model="formCompraValidoCabecera">
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <v-text-field
          label="Número"
          v-model="compra.comnumero"
          :rules="[reglas.campoVacio(compra.comnumero),reglas.soloNumerosPositivos(compra.comnumero)]"
          class="custom px-2"
          dense
          filled
          :disabled="bloquearCamposFormCompra"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
          <v-select
            placeholder="Productor"
            class="style-chooser"
            label="productor"
            v-model="compra.productorid"
            :disabled="bloquearCamposFormCompra"
            :reduce="(listaProductorPersona) => listaProductorPersona.id"
            :options="listaProductorPersona"
            :rules="[reglas.campoVacio(compra.productorid)]"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else
                >Empiece a escribir un Productor</em
              >
            </template>
          </v-select>
        </v-col>
      <v-col cols="12" md="4">
        <v-text-field
          label="Código"
          v-model="compra.comcod"
          :rules="[reglas.campoVacio(compra.comcod)]"
          class="custom px-2"
          dense
          filled
          :disabled="bloquearCamposFormCompra"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="4">
        <v-select
          placeholder="Organización"
          class="style-chooser"
          v-model="compra.asociacionid"
          label="asonombre"
          :reduce="(asociaciones) => asociaciones.asociacionid"
          :options="asociaciones"
        >
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              No hay resultados para <em>{{ search }}</em
              >.
            </template>
            <em style="opacity: 0.5" v-else
              >Empiece a escribir nombre de asociación</em
            >
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          placeholder="Transporte"
          class="style-chooser"
          v-model="compra.vehiculoid"
          @input="getGuiaRemision"
          label="vehplaca"
          :reduce="(transportes) => transportes.vehiculoid"
          :options="transportes"
        >
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              No hay resultados para <em>{{ search }}</em
              >.
            </template>
            <em style="opacity: 0.5" v-else
              >Empiece a escribir nombre de asociación</em
            >
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          placeholder="Guia de Remision"
          class="style-chooser"
          v-model="compra.guiaremisionid"
          label="guinumero"
          :reduce="(listaGuiaRemisionStore) => listaGuiaRemisionStore.guiaremisionid"
          :options="listaGuiaRemisionStore"
        >
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              No hay resultados para <em>{{ search }}</em
              >.
            </template>
            <em style="opacity: 0.5" v-else
              >Empiece a escribir numero de guia de Remision</em
            >
          </template>
        </v-select>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="6" md="4">
        <v-menu
          v-model="menuMostrarFechaEmision"
          transition="scale-transition"
          offset-y
          min-width="290px"
          max-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              label="Fecha de emisión"
              v-model="compra.comfechaemision"
              :rules="[reglas.campoVacio(compra.comfechaemision)]"
              readonly
              v-bind="attrs"
              v-on="on"
              class="custom px-2"
              dense
              filled
              hide-details="auto"
              :disabled="bloquearCamposFormCompra"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="compra.comfechaemision"
            @input="menuMostrarFechaEmision = false"
            :show-current="fechaActual"
            locale="es-419"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" md="8">
        <v-text-field
          label="Lugar"
          v-model="compra.comlugar"
          :rules="[reglas.campoVacio(compra.comlugar)]"
          class="custom px-2"
          dense
          filled
          :disabled="bloquearCamposFormCompra"
        ></v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapState } from "vuex";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import cars from "../services/ServicioVehiculo";
import servicioAsociacion from "../services/ServicioAsociacion";
import servicioGuiaRemision from "../services/ServicioGuiaRemision";
import servicioProductorPersona from "../services/ServicioProductorPersona";
export default {
  name: "FormCompra",

  components: {
    vSelect,
  },

  data() {
    return {
      transportes: [],
      asociaciones: [],
      listaProductorPersona: [],
      menuMostrarFechaEmision: "", // Variable de referencia para el menuMostrarFechaEmision
      fechaActual: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },
  mounted() {
    this.getTrans();
    this.getAsociaciones();
    this.obtenerTodosProductorPersona();
  },
  computed: {
    // Obtiene el modelo compra
    ...mapState("moduloCompra", ["compra"]),

    // Obtiene la variable que indica si el formulario es valido
    formCompraValidoCabecera: {
      get() {
        return this.$store.getters["moduloCompra/formCompraValidoCabecera"];
      },
      set(v) {
        return this.$store.commit(
          "moduloCompra/cambiarEstadoValidoFormCompraCabecera",
          v
        );
      },
    },
      listaGuiaRemisionStore: {
      get() {
        return this.$store.getters["moduloCompra/listaGuiaRemisionStore"];
      },
      set(v) {
        return this.$store.commit("moduloCompra/asignarListaGuiaRemision", v);
      },
    },

    // Obtiene la variable bloquearCamposFormCompra
    bloquearCamposFormCompra: {
      get() {
        return this.$store.getters["moduloCompra/bloquearCamposFormCompra"];
      },
      set(v) {
        return this.$store.commit(
          "moduloCompra/cambiarBloquearCamposFormCompra",
          v
        );
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {
    getTrans() {
      cars.obtenerTodosVehiculos().then((res) => {
        this.transportes = res.data;
      });
    },
    getAsociaciones() {
      servicioAsociacion.obtenerTodosAsociacion().then((res) => {
        this.asociaciones = res.data;
      });
    },
    getGuiaRemision(){
      servicioGuiaRemision.obtenerTodosGuiaRemision().then((res)=>{
        let guia= res.data.filter(guiaRemision => guiaRemision.vehiculoid == this.compra.vehiculoid);
       this.listaGuiaRemisionStore = guia;
      })
    },
     async obtenerTodosProductorPersona() {
      let resultado = await servicioProductorPersona.obtenerTodosProductorPersona();
      resultado.data.map((productor) => {
        this.listaProductorPersona.push({
          id: productor.personaid,
          productor: `${productor.pernombres} ${productor.perapellidos} | RUC/CI. ${productor.percedula}`,
        });
      });
    },
  },
};
</script>
