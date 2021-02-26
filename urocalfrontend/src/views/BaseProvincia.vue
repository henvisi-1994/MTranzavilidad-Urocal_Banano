<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo Provincia -->
    <DialogNuevoProvincia ref="DialogNuevoProvincia"></DialogNuevoProvincia>

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
              v-model="buscarProvincia"
              append-icon="mdi-magnify"
              label="Buscar" class="custom" filled dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra los Provincia -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaProvincia"
          sort-by="provinciaid"
          :items="listaProvinciaStore"
          :search="buscarProvincia"
          class="elevation-1">
          <template v-slot:top>
            <!-- Tabs que muestra la informacion detallada de Provincia -->
            <DialogMostrarProvincia ref="DialogMostrarProvincia"></DialogMostrarProvincia>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarProvincia(item)">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo Provincia -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          @click="cargarDialogNuevoProvincia()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";

import DialogNuevoProvincia from "../components/DialogNuevoProvincia";
import DialogMostrarProvincia from "../components/DialogMostrarProvincia";
import ServicioProvincia from "../services/ServicioProvincia";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseProvincia",

  components: {
    DialogNuevoProvincia,
    DialogMostrarProvincia,
  },

  mounted() {
    this.cargarListaPais();
    this.cargarListaProvincia();
  },

  data() {
    return {
      nombre: "Gestión de Provincias",
      buscarProvincia: "", // Guarda el texto de búsqueda
      cabeceraTablaProvincia: [
        // Detalla las cabeceras de la tabla
        {
          text: "Provincia",
          value: "provincianombre",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "País",
          value: "provinciapais.paisnombre",
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
    listaPaisStore: {
      get() {
        return this.$store.getters["moduloProvincia/listaPaisStore"];
      },
      set(v) {
        return this.$store.commit("moduloProvincia/establecerListaPaisStore", v);
      },
    },

    listaProvinciaStore: {
      get() {
        return JSON.parse(
          JSON.stringify(this.$store.getters["moduloProvincia/listaProvinciaStore"])
        );
      },
      set(v) {
        return this.$store.commit("moduloProvincia/establecerListaProvinciaStore", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogNuevoProvincia
    dialogNuevoProvincia: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoProvincia"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoProvincia", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarProvincia
    dialogMostrarProvincia: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarProvincia"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogMostrarProvincia", v);
      },
    },

    modeloProvinciaStore: {
      get() {
        return this.$store.getters["moduloProvincia/provincia"];
      },
      set(v) {
        return this.$store.commit("moduloProvincia/nuevoProvincia", v);
      },
    },
  },

  methods: {
    // #  MANIPULACIÓN DE DATOS  #
    async cargarListaProvincia() {
      let listaProvincia = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioProvincia.obtenerTodosProvincias(); // Obtener respuesta de backend
      let datosProvincia = await respuesta.data; // Rescatar datos de la respuesta
      datosProvincia.forEach((provincia) => {
        // Guardar cada registro en la 'lista de datos'
        listaProvincia.push(provincia);
      });
      this.listaProvinciaStore = listaProvincia;
    },

    async cargarListaPais() {
      let listaPais = []; // Limpiar la 'lista de ciudades'
      let respuesta = await ServicioProvincia.obtenerTodosPaises(); // Obtener respuesta de backend
      let datosPais = await respuesta.data; // Rescatar datos de la respuesta
      datosPais.forEach((pais) => {
        // Guardar cada registro en la 'lista de datos'
        listaPais.push(pais);
      });
      this.listaPaisStore = listaPais;
    },

    // #  TIENDA DE VUE  #
    ...mapMutations("moduloProvincia", ["establecerListaPaisStore"]),
    // Vacia el modelo Provincia
    ...mapMutations("moduloProvincia", ["vaciarProvincia"]),

    // Carga el DialogNuevoProvincia
    cargarDialogNuevoProvincia() {
      this.dialogNuevoProvincia = !this.dialogNuevoProvincia; // Abre el dialogNuevoProvincia
      this.$refs.DialogNuevoProvincia.$refs.componentFormProvincia.$refs.formProvincia.resetValidation(); // Reinicia las validaciones de formProvincia
      this.vaciarProvincia(); // Vacia el modelo Provincia
    },

    abrirMostrarProvincia(item) {
      this.dialogMostrarProvincia = !this.dialogMostrarProvincia;
      this.vaciarProvincia(); // Vacia el modelo Provincia
      const indiceEditar = this.listaProvinciaStore.indexOf(item);
      this.modeloProvinciaStore = item;
    },
  },

  mixins: [autenticacionMixin, myMixin],

  created() {
    this.$store.commit("colocarLayout", "LayoutAdministrador");
  },
};
</script>
