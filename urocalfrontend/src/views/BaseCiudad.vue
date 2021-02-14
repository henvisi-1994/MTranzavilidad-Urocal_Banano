<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo Ciudad -->
    <DialogNuevoCiudad
      ref="DialogNuevoCiudad"
    ></DialogNuevoCiudad>

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0" class="mt-5">
      <v-card-title class="py-2">
        <v-row no-gutters justify-md="space-between">
          <v-col cols="12" md="6">
            <div :class="[`text-h4`, `mb-4`]" class="transition-swing primary--text" v-text="nombre"></div>            
          </v-col>
          <v-col cols="12" md="6">
            <!-- Caja de búsqueda -->
            <v-text-field
              v-model="buscarCiudad"
              append-icon="mdi-magnify"
              label="Buscar" class="custom" filled dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra los Ciudad -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaCiudad"
          sort-by="ciudadid"
          :items="listaCiudadStore"
          :search="buscarCiudad"
          class="elevation-1">
          <template v-slot:top>
            <!-- Tabs que muestra la informacion detallada de Ciudad -->
            <DialogMostrarCiudad
              ref="DialogMostrarCiudad"
            ></DialogMostrarCiudad>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarCiudad(item)">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo Ciudad -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          @click="cargarDialogNuevoCiudad()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";

import DialogNuevoCiudad from "../components/DialogNuevoCiudad";
import DialogMostrarCiudad from "../components/DialogMostrarCiudad";
import ServicioCiudad from '../services/ServicioCiudad';
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseCiudad",

  components: {
    DialogNuevoCiudad,
    DialogMostrarCiudad
  },

 mounted() {
    this.cargarListaProvincia();
    this.cargarListaCiudad();
 },

  data() {
    return {
      nombre: "Gestión de Ciudades",
      buscarCiudad: "", // Guarda el texto de búsqueda
      cabeceraTablaCiudad: [
        // Detalla las cabeceras de la tabla
        {
          text: "Ciudad",
          value: "ciudadnombre",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Provincia",
          value: "ciudadprovincia.provincianombre",
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
    };
  },

  computed: {

    listaProvinciaStore: {
      get() {
        return this.$store.getters["moduloCiudad/listaProvinciaStore"];
      },
      set(v) {
        return this.$store.commit("moduloCiudad/establecerListaProvinciaStore", v);
      },
    },

    listaCiudadStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloCiudad/listaCiudadStore"]));
      },
      set(v) {
        return this.$store.commit("moduloCiudad/establecerListaCiudadStore", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogNuevoCiudad
    dialogNuevoCiudad: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoCiudad"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoCiudad", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarCiudad
    dialogMostrarCiudad: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarCiudad"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogMostrarCiudad", v);
      },
    },

    modeloCiudadStore: {
      get() {
        return this.$store.getters["moduloCiudad/ciudad"];
      },
      set(v) {
        return this.$store.commit("moduloCiudad/nuevoCiudad", v);
      },
    },
  },

  methods: {

    // #  MANIPULACIÓN DE DATOS  #
    async cargarListaCiudad () { 
      let listaCiudad = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioCiudad.obtenerTodosCiudades();  // Obtener respuesta de backend
      let datosCiudad = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosCiudad.forEach((ciudad) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaCiudad.push(ciudad);
      });
      this.listaCiudadStore = listaCiudad;
    },

    async cargarListaProvincia () { 
      let listaProvincia = [];                                                       // Limpiar la 'lista de ciudades'
      let respuesta = await ServicioCiudad.obtenerTodosProvincias();          // Obtener respuesta de backend
      let datosProvincia = await respuesta.data;                                     // Rescatar datos de la respuesta
      datosProvincia.forEach((provincia) => {                                           // Guardar cada registro en la 'lista de datos' 
        listaProvincia.push(provincia);
      });
      this.listaProvinciaStore = listaProvincia;
    },

    // #  TIENDA DE VUE  #
    ...mapMutations("moduloCiudad", ["establecerListaProvinciaStore"]), 
    // Vacia el modelo Ciudad
    ...mapMutations("moduloCiudad", ["vaciarCiudad"]),

    // Carga el DialogNuevoCiudad
    cargarDialogNuevoCiudad() {
      this.dialogNuevoCiudad = !this.dialogNuevoCiudad; // Abre el dialogNuevoCiudad
      this.$refs.DialogNuevoCiudad.$refs.componentFormCiudad.$refs.formCiudad.resetValidation(); // Reinicia las validaciones de formCiudad
      this.vaciarCiudad(); // Vacia el modelo Ciudad
    },

    abrirMostrarCiudad(item) {
      this.dialogMostrarCiudad = !this.dialogMostrarCiudad;
      this.vaciarCiudad(); // Vacia el modelo Ciudad
      const indiceEditar = this.listaCiudadStore.indexOf(item);
      this.modeloCiudadStore = item;
      //console.log(this.modeloCiudadStore)
    },
  },

  mixins: [autenticacionMixin, myMixin],

  created() {
    this.$store.commit("colocarLayout", "LayoutAdministrador");
  },
};
</script>
