<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo Sitio -->
    <DialogNuevoSitio ref="DialogNuevoSitio"></DialogNuevoSitio>

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
              class="custom" filled dense
              v-model="buscarSitio"
              append-icon="mdi-magnify"
              label="Buscar"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra los Sitio -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaSitio"
          sort-by="sitioid"
          :items="listaSitioStore"
          :search="buscarSitio"
          class="elevation-1">
          <template v-slot:top>
            <!-- Tabs que muestra la informacion detallada de Sitio -->
            <DialogMostrarSitio ref="DialogMostrarSitio"></DialogMostrarSitio>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarSitio(item)"> mdi-eye </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo Sitio -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          @click="cargarDialogNuevoSitio()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";

import DialogNuevoSitio from "../components/DialogNuevoSitio";
import DialogMostrarSitio from "../components/DialogMostrarSitio";
import ServicioSitio from "../services/ServicioSitio";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseSitio",

  components: {
    DialogNuevoSitio,
    DialogMostrarSitio,
  },

  mounted() {
    this.cargarListaCiudad();
    this.cargarListaSitio();
  },

  data() {
    return {
      nombre: "Gestión de Sitios",
      buscarSitio: "", // Guarda el texto de búsqueda
      cabeceraTablaSitio: [
        // Detalla las cabeceras de la tabla
        {
          text: "Sitio",
          value: "sitionombre",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Ciudad",
          value: "sitiociudad.ciudadnombre",
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
    listaCiudadStore: {
      get() {
        return this.$store.getters["moduloSitio/listaCiudadStore"];
      },
      set(v) {
        return this.$store.commit("moduloSitio/establecerListaCiudadStore", v);
      },
    },

    listaSitioStore: {
      get() {
        return JSON.parse(
          JSON.stringify(this.$store.getters["moduloSitio/listaSitioStore"])
        );
      },
      set(v) {
        return this.$store.commit("moduloSitio/establecerListaSitioStore", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogNuevoSitio
    dialogNuevoSitio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoSitio"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoSitio", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarSitio
    dialogMostrarSitio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarSitio"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogMostrarSitio", v);
      },
    },

    // #  MODELOS  #
    modeloSitioStore: {
      get() {
        return this.$store.getters["moduloSitio/sitio"];
      },
      set(v) {
        return this.$store.commit("moduloSitio/nuevoSitio", v);
      },
    },
  },

  methods: {
    // #  MANIPULACIÓN DE DATOS  #
    async cargarListaSitio() {
      let listaSitio = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioSitio.obtenerTodosSitios(); // Obtener respuesta de backend
      let datosSitio = await respuesta.data; // Rescatar datos de la respuesta
      datosSitio.forEach((sitio) => {
        // Guardar cada registro en la 'lista de datos'
        listaSitio.push(sitio);
      });
      this.listaSitioStore = listaSitio;
      //console.log(this.listaUsuarioPersonaStore);
    },

    async cargarListaCiudad() {
      let listaCiudad = []; // Limpiar la 'lista de ciudades'
      let respuesta = await ServicioSitio.obtenerTodosCiudad(); // Obtener respuesta de backend
      let datosCiudad = await respuesta.data; // Rescatar datos de la respuesta
      datosCiudad.forEach((ciudad) => {
        // Guardar cada registro en la 'lista de datos'
        listaCiudad.push(ciudad);
      });
      this.listaCiudadStore = listaCiudad;
      //console.log(this.listaCiudadStore);
    },

    // #  TIENDA DE VUE  #
    ...mapMutations("moduloSitio", ["establecerListaCiudadStore"]),
    // Vacia el modelo Sitio
    ...mapMutations("moduloSitio", ["vaciarSitio"]),

    // Carga el DialogNuevoSitio
    cargarDialogNuevoSitio() {
      this.dialogNuevoSitio = !this.dialogNuevoSitio; // Abre el dialogNuevoSitio
      this.$refs.DialogNuevoSitio.$refs.componentFormSitio.$refs.formSitio.resetValidation(); // Reinicia las validaciones de formSitio
      this.vaciarSitio(); // Vacia el modelo Sitio
    },

    abrirMostrarSitio(item) {
      this.dialogMostrarSitio = !this.dialogMostrarSitio;
      this.vaciarSitio(); // Vacia el modelo Sitio
      const indiceEditar = this.listaSitioStore.indexOf(item);
      this.modeloSitioStore = item;
    },
  },

  mixins: [autenticacionMixin, myMixin],

  created() {
    this.$store.commit("colocarLayout", "LayoutAdministrador");
  },
};
</script>
