<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo Asociacion -->
    <DialogNuevoAsociacion ref="DialogNuevoAsociacion"></DialogNuevoAsociacion>

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
              v-model="buscarAsociacion"
              append-icon="mdi-magnify"
              label="Buscar" class="custom" filled dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra los Asociacion -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaAsociacion"
          sort-by="asociacionid"
          :items="listaAsociacionStore"
          :search="buscarAsociacion"
          class="elevation-1">
          <template v-slot:top>
            <!-- Tabs que muestra la informacion detallada de Asociacion -->
            <DialogMostrarAsociacion
              ref="DialogMostrarAsociacion"
            ></DialogMostrarAsociacion>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarAsociacion(item)">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo Asociación -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          @click="cargarDialogNuevoAsociacion()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";

import DialogNuevoAsociacion from "../components/DialogNuevoAsociacion";
import DialogMostrarAsociacion from "../components/DialogMostrarAsociacion";
import ServicioAsociacion from "../services/ServicioAsociacion";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseAsociacion",

  components: {
    DialogNuevoAsociacion,
    DialogMostrarAsociacion,
  },

  mounted() {
    this.cargarListaAsociacion();
    this.cargarListaResponsable();
  },

  data() {
    return {
      nombre: "Gestión de Asociaciones",
      buscarAsociacion: "", // Guarda el texto de búsqueda
      cabeceraTablaAsociacion: [
        // Detalla las cabeceras de la tabla
        {
          text: "Asociación",
          value: "asonombre",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Ruc",
          value: "asoruc",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Número de socios",
          value: "asonumerosocios",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Número de hombres",
          value: "asonumerohombres",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Número de mujeres",
          value: "asonumeromujeres",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Responsable",
          value: "asociacionresponsable.responsable",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Observación",
          value: "asoobservacion",
          sortable: false,
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
    // Obtiene y modifica el estado de la variable dialogNuevoAsociacion
    dialogNuevoAsociacion: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoAsociacion"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoAsociacion", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarAsociacion
    dialogMostrarAsociacion: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarAsociacion"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogMostrarAsociacion", v);
      },
    },

    listaAsociacionStore: {
      get() {
        return JSON.parse(
          JSON.stringify(this.$store.getters["moduloAsociacion/listaAsociacionStore"])
        );
      },
      set(v) {
        return this.$store.commit("moduloAsociacion/establecerListaAsociacionStore", v);
      },
    },

    listaResponsableStore: {
      get() {
        return this.$store.getters["moduloAsociacion/listaResponsableStore"];
      },
      set(v) {
        return this.$store.commit("moduloAsociacion/establecerListaResponsableStore", v);
      },
    },

    modeloAsociacionStore: {
      get() {
        return this.$store.getters["moduloAsociacion/asociacion"];
      },
      set(v) {
        return this.$store.commit("moduloAsociacion/nuevoAsociacion", v);
      },
    },
  },

  methods: {
    // #  MANIPULACIÓN DE DATOS  #
    async cargarListaAsociacion() {
      let listaAsociacion = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioAsociacion.obtenerTodosAsociacion(); // Obtener respuesta de backend
      let datosAsociacion = await respuesta.data; // Rescatar datos de la respuesta
      datosAsociacion.forEach((Asociacion) => {
        // Guardar cada registro en la 'lista de datos'
        listaAsociacion.push(Asociacion);
      });
      this.listaAsociacionStore = listaAsociacion;
      //console.log(this.listaAsociacionStore);
    },

    async cargarListaResponsable() {
      let listaResponsable = []; // Limpiar la 'lista de ciudades'
      let respuesta = await ServicioAsociacion.obtenerTodosResponsable(); // Obtener respuesta de backend
      let datosResponsable = await respuesta.data; // Rescatar datos de la respuesta
      datosResponsable.forEach((Responsable) => {
        // Guardar cada registro en la 'lista de datos'
        listaResponsable.push(Responsable);
      });
      this.listaResponsableStore = listaResponsable;
    },

    ...mapMutations("moduloAsociacion", ["establecerListaResponsableStore"]),
    // Vacia el modelo Asociacion
    ...mapMutations("moduloAsociacion", ["vaciarAsociacion"]),

    // Carga el DialogNuevoAsociacion
    cargarDialogNuevoAsociacion() {
      this.dialogNuevoAsociacion = !this.dialogNuevoAsociacion; // Abre el dialogNuevoAsociacion
      this.$refs.DialogNuevoAsociacion.$refs.componentFormAsociacion.$refs.formAsociacion.resetValidation(); // Reinicia las validaciones de formAsociacion
      this.vaciarAsociacion(); // Vacia el modelo Asociacion
    },

    abrirMostrarAsociacion(item) {
      this.dialogMostrarAsociacion = !this.dialogMostrarAsociacion;
      this.vaciarAsociacion(); // Vacia el modelo Asociacion
      const indiceEditar = this.listaAsociacionStore.indexOf(item);
      this.modeloAsociacionStore = item;
    },
  },

  mixins: [autenticacionMixin, myMixin],

  created() {
    this.$store.commit("colocarLayout", "LayoutAdministrador");
  },
};
</script>
