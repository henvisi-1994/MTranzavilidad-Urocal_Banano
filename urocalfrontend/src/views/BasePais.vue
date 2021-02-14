<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo Pais -->
    <DialogNuevoPais
      ref="DialogNuevoPais"
    ></DialogNuevoPais>

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
              v-model="buscarPais"
              append-icon="mdi-magnify"
              label="Buscar" class="custom" filled dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra los Pais -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaPais"
          sort-by="paisid"
          :items="listaPaisStore"
          :search="buscarPais"
          class="elevation-1">
          <template v-slot:top>
            <!-- Tabs que muestra la informacion detallada de Pais -->
            <DialogMostrarPais
              ref="DialogMostrarPais"
            ></DialogMostrarPais>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarPais(item)">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo Pais -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          @click="cargarDialogNuevoPais()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";

import DialogNuevoPais from "../components/DialogNuevoPais";
import DialogMostrarPais from "../components/DialogMostrarPais";
import ServicioPais from '../services/ServicioPais';
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BasePais",

  components: {
    DialogNuevoPais,
    DialogMostrarPais,
  },

  mounted() {
    this.cargarListaPais();
  },

  data() {
    return {
      nombre: "Gestión de Países",
      buscarPais: "", // Guarda el texto de búsqueda
      cabeceraTablaPais: [
        // Detalla las cabeceras de la tabla
        {
          text: "País",
          value: "paisnombre",
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
        return JSON.parse(JSON.stringify(this.$store.getters["moduloPais/listaPaisStore"]));
      },
      set(v) {
        return this.$store.commit("moduloPais/establecerListaPaisStore", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogNuevoPais
    dialogNuevoPais: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoPais"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoPais", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarPais
    dialogMostrarPais: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarPais"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogMostrarPais", v);
      },
    },

    modeloPaisStore: {
      get() {
        return this.$store.getters["moduloPais/pais"];
      },
      set(v) {
        return this.$store.commit("moduloPais/nuevoPais", v);
      },
    },
  },

  methods: {

    // #  MANIPULACIÓN DE DATOS  #
    async cargarListaPais () { 
      let listaPais = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioPais.obtenerTodosPaises();  // Obtener respuesta de backend
      let datosPais = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosPais.forEach((pais) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaPais.push(pais);
      });
      this.listaPaisStore = listaPais;
    },

    // Vacia el modelo Pais
    ...mapMutations("moduloPais", ["vaciarPais"]),

    // Carga el DialogNuevoPais
    cargarDialogNuevoPais() {
      this.dialogNuevoPais = !this.dialogNuevoPais; // Abre el dialogNuevoPais
      this.$refs.DialogNuevoPais.$refs.componentFormPais.$refs.formPais.resetValidation(); // Reinicia las validaciones de formPais
      this.vaciarPais(); // Vacia el modelo Pais
    },

    abrirMostrarPais(item) {
      this.dialogMostrarPais = !this.dialogMostrarPais;
      this.vaciarPais(); // Vacia el modelo Pais
      const indiceEditar = this.listaPaisStore.indexOf(item);
      this.modeloPaisStore = item;
    },
  },

  mixins: [autenticacionMixin, myMixin],

  created() {
    this.$store.commit("colocarLayout", "LayoutAdministrador");
  },
};
</script>
