<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo Finca -->
    <DialogNuevoFinca ref="DialogNuevoFinca"></DialogNuevoFinca>

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0" class="mt-5">
      <v-card-title class="py-2">
        <v-row no-gutters justify-md="space-between">
          <v-col cols="12" md="6">
            <div
              :class="[`text-h4`, `mb-4`]"
              class="transition-swing primary--text"
              v-text="nombre"
            ></div>
          </v-col>
          <v-col cols="12" md="6">
            <!-- Caja de búsqueda -->
            <v-text-field
              v-model="buscarFinca"
              append-icon="mdi-magnify"
              label="Buscar"
              class="custom"
              filled
              dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra los Finca -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaFinca"
          sort-by="fincaid"
          :items="listaFincaStore"
          :search="buscarFinca"
          class="elevation-1"
        >
          <template v-slot:top>
            <!-- Tabs que muestra la informacion detallada de Finca -->
            <DialogMostrarFinca ref="DialogMostrarFinca"></DialogMostrarFinca>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarFinca(item)">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo Finca -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px"
          large
          elevation="0"
          color="primary"
          @click="cargarDialogNuevoFinca()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";

import DialogNuevoFinca from "../components/DialogNuevoFinca";
import DialogMostrarFinca from "../components/DialogMostrarFinca";
import ServicioFinca from "../services/ServicioFinca";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseFinca",

  components: {
    DialogNuevoFinca,
    DialogMostrarFinca,
  },

  mounted() {
    this.cargarListaFinca();
    this.cargarListaSitio();
    this.cargarListaAsociacion();
    this.cargarListaPropietario();
  },

  data() {
    return {
      nombre: "Gestión de Fincas",
      buscarFinca: "", // Guarda el texto de búsqueda
      cabeceraTablaFinca: [
        // Detalla las cabeceras de la tabla
        {
          text: "Nombre",
          value: "finnombrefinca",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Superficie total",
          value: "finsuperficietotal",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Superficie cultivada",
          value: "finsuperficiecultivada",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha primera inspección",
          value: "finprimerainspeccion",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha ultima inspección",
          value: "finultimainspeccion",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Observación",
          value: "finobservacion",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Asociación",
          value: "asociacionfinca.asonombre",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Propietario",
          value: "fincapropietario.propietario",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Sitio",
          value: "sitiofinca.sitionombre",
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
    listaSitioStore: {
      get() {
        return this.$store.getters["moduloFinca/listaSitioStore"];
      },
      set(v) {
        return this.$store.commit("moduloFinca/establecerListaSitioStore", v);
      },
    },

    listaAsociacionStore: {
      get() {
        return this.$store.getters["moduloFinca/listaAsociacionStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloFinca/establecerListaAsociacionStore",
          v
        );
      },
    },

    listaPropietarioStore: {
      get() {
        return this.$store.getters["moduloFinca/listaPropietarioStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloFinca/establecerListaPropietarioStore",
          v
        );
      },
    },

    listaFincaStore: {
      get() {
        return JSON.parse(
          JSON.stringify(this.$store.getters["moduloFinca/listaFincaStore"])
        );
      },
      set(v) {
        return this.$store.commit("moduloFinca/establecerListaFincaStore", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogNuevoFinca
    dialogNuevoFinca: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoFinca"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoFinca", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarFinca
    dialogMostrarFinca: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarFinca"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogMostrarFinca",
          v
        );
      },
    },

    modeloFincaStore: {
      get() {
        return this.$store.getters["moduloFinca/finca"];
      },
      set(v) {
        return this.$store.commit("moduloFinca/nuevoFinca", v);
      },
    },
  },

  methods: {
    // #  MANIPULACIÓN DE DATOS  #
    async cargarListaFinca() {
      let listaFinca = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioFinca.obtenerTodosFincas(); // Obtener respuesta de backend
      let datosFinca = await respuesta.data; // Rescatar datos de la respuesta
      datosFinca.forEach((finca) => {
        // Guardar cada registro en la 'lista de datos'
        listaFinca.push(finca);
      });
      this.listaFincaStore = listaFinca;
    },

    async cargarListaSitio() {
      let listaSitio = []; // Limpiar la 'lista de ciudades'
      let respuesta = await ServicioFinca.obtenerTodosSitios(); // Obtener respuesta de backend
      let datosSitio = await respuesta.data; // Rescatar datos de la respuesta
      datosSitio.forEach((sitio) => {
        // Guardar cada registro en la 'lista de datos'
        listaSitio.push(sitio);
      });
      this.listaSitioStore = listaSitio;
    },

    async cargarListaAsociacion() {
      let listaAsociacion = []; // Limpiar la 'lista de ciudades'
      let respuesta = await ServicioFinca.obtenerTodosAsociaciones(); // Obtener respuesta de backend
      let datosAsociacion = await respuesta.data; // Rescatar datos de la respuesta
      datosAsociacion.forEach((asociacion) => {
        // Guardar cada registro en la 'lista de datos'
        listaAsociacion.push(asociacion);
      });
      this.listaAsociacionStore = listaAsociacion;
    },

    async cargarListaPropietario() {
      let listaPropietario = []; // Limpiar la 'lista de ciudades'
      let respuesta = await ServicioFinca.obtenerTodosPropietarios(); // Obtener respuesta de backend
      let datosPropietario = await respuesta.data; // Rescatar datos de la respuesta
      datosPropietario.forEach((propietario) => {
        // Guardar cada registro en la 'lista de datos'
        listaPropietario.push(propietario);
      });
      this.listaPropietarioStore = listaPropietario;
    },

    // #  TIENDA DE VUE  #
    ...mapMutations("moduloFinca", ["establecerListaSitioStore"]),
    // #  TIENDA DE VUE  #
    ...mapMutations("moduloFinca", ["establecerListaAsociacionStore"]),
    // #  TIENDA DE VUE  #
    ...mapMutations("moduloFinca", ["establecerListaPropietarioStore"]),
    // Vacia el modelo Finca
    ...mapMutations("moduloFinca", ["vaciarFinca"]),

    // Carga el DialogNuevoFinca
    cargarDialogNuevoFinca() {
      this.dialogNuevoFinca = !this.dialogNuevoFinca; // Abre el dialogNuevoFinca
      this.$refs.DialogNuevoFinca.$refs.componentFormFinca.$refs.formFinca.resetValidation(); // Reinicia las validaciones de formFinca
      this.vaciarFinca(); // Vacia el modelo Finca
    },

    async abrirMostrarFinca(item) {
      this.dialogMostrarFinca = !this.dialogMostrarFinca;
      this.vaciarFinca(); // Vacia el modelo Finca
      let respuesta = await ServicioFinca.obtenerDetalleFinca(item.fincaid);
      let detalle = respuesta.data;
      this.modeloFincaStore = {
        fincaid : item.fincaid,
        fincodigo : item.fincodigo,
        finnombrefinca : item.finnombrefinca,
        finsuperficietotal : item.finsuperficietotal,
        finsuperficiecultivada : item.finsuperficiecultivada,
        fincoordenadax : item.fincoordenadax,
        fincoordenaday : item.fincoordenaday,
        finproductosprohibidos : item.finproductosprohibidos,
        finprimerainspeccion : item.finprimerainspeccion,
        finultimainspeccion : item.finultimainspeccion,
        finnoconformidades : item.finnoconformidades,
        fincertificacioneu : item.fincertificacioneu,
        fincertificacionnop : item.fincertificacionnop,
        fincertificacionjas : item.fincertificacionjas,
        finobservacion : item.finobservacion,
        asociacionfinca : {
            asociacionid: item.asociacionfinca.asociacionid,
            asonombre: item.asociacionfinca.asonombre
        },
        fincapropietario : {
            propietarioid: item.fincapropietario.propietarioid,
            propietario: item.fincapropietario.propietario
        },
        sitiofinca : {
            sitioid: item.sitiofinca.sitioid,
            sitionombre: item.sitiofinca.sitionombre
        },
        detalle : detalle
      };
    },
  },

  mixins: [autenticacionMixin, myMixin],

  created() {
    this.$store.commit("colocarLayout", "LayoutAdministrador");
  },
};
</script>
