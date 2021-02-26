<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo Despacho -->
    <DialogoNuevoDespacho ref="DialogoNuevoDespacho"></DialogoNuevoDespacho>

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
              v-model="buscarDespacho"
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
        <!-- Tabla que muestra los Despachos -->
        <v-data-table
          :headers="cabeceraTablaDespacho"
          :items="listaDespacho"
          :search="buscarDespacho"
          sort-by="desnumero"
          :height="tablaResponsiva()"
          class="elevation-1"
        >
          <template v-slot:top>
            <DialogoMostrarDespacho
              ref="DialogoTabsMostrarDespacho"
            ></DialogoMostrarDespacho>
          </template>

          <template v-slot:item.desorganico="{ item }">
            <v-simple-checkbox v-model="item.desorganico" disabled> </v-simple-checkbox>
          </template>

          <template v-slot:item.desspp="{ item }">
            <v-simple-checkbox v-model="item.desspp" disabled> </v-simple-checkbox>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirTabsMostrarDespacho(item.despachoid)">
              mdi-eye</v-icon
            >
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo Despacho -->
        <v-btn
          large
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" elevation="0"
          color="primary"
          @click="cargarDialogoNuevoDespacho()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import DialogoNuevoDespacho from "../components/DialogoNuevoDespacho";
import DialogoMostrarDespacho from "../components/DialogoMostrarDespacho";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

import servicioDespacho from "../services/ServicioDespacho";
import servicioDetalleDespacho from "../services/ServicioDetalleDespacho";

export default {
  name: "BaseDespacho",

  components: {
    DialogoNuevoDespacho,
    DialogoMostrarDespacho,
  },

  data() {
    return {
      nombre: "Gestión de Despacho",
      buscarDespacho: "", // Guarda el texto de búsqueda
      cabeceraTablaDespacho: [
        // Detalla los cabezales de la tabla
        //{ text: "ID", value: "despachoid", align: "center", class: "grey lighten-3", },
        { text: "Número", value: "desnumero", align: "center", class: "grey lighten-3" },
        {
          text: "Fecha de Salida",
          value: "desfechasalida",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Almacén",
          value: "centroacopionombre",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        //{ text: "Motivo", value: "desmotivo", sortable: false, align: "center", class: "grey lighten-3", },
        {
          text: "N° Bultos",
          value: "detdesnumerobultos",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Destino",
          value: "desdestino",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Orgánico",
          value: "desorganico",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "SPP",
          value: "desspp",
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
    // Obtiene y modifica el estado de la variable dialogoNuevoDespacho
    dialogoNuevoDespacho: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoNuevoDespacho"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogoNuevoDespacho", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogoMostrarDespacho
    dialogoMostrarDespacho: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoMostrarDespacho"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogoMostrarDespacho", v);
      },
    },

    // Obtiene el modelo despacho
    despacho: {
      get() {
        return this.$store.getters["moduloDespacho/despacho"];
      },
      set(v) {
        return this.$store.commit("moduloDespacho/agregarDespacho", v);
      },
    },

    // Obtiene el modelo detalledespacho
    detalledespacho: {
      get() {
        return this.$store.getters["moduloDetalleDespacho/detalledespacho"];
      },
      set(v) {
        return this.$store.commit("moduloDetalleDespacho/agregarDetalleDespacho", v);
      },
    },

    // Obtiene listaDespacho
    ...mapState("moduloDespacho", ["listaDespacho"]),
  },

  methods: {
    // Obtiene mutaciones del moduloDespacho
    ...mapMutations("moduloDespacho", ["vaciarDespacho", "asignarListaDespacho"]),

    // Vacia el modelo moduloDetalleDespacho
    ...mapMutations("moduloDetalleDespacho", ["vaciarDetalleDespacho"]),

    // Carga el DialogoNuevoDespacho
    cargarDialogoNuevoDespacho() {
      this.dialogoNuevoDespacho = true; // Abre el DialogoNuevoDespacho
      this.vaciarDespacho(); // Reinicia el modelo Despacho
      this.vaciarDetalleDespacho(); // Reinicia el modelo Detalle Despacho
    },

    // Carga el TabsMostrarDespacho
    async abrirTabsMostrarDespacho(despachoid) {
      try {
        // Obtener datos de despacho y detalledespacho
        let despacho = await servicioDespacho.obtenerDespacho(despachoid);
        let detalledespacho = await servicioDetalleDespacho.obtenerDetalleDespacho(
          despachoid
        );

        // Se asignan los datos a los modelos
        this.despacho = despacho.data;
        this.detalledespacho = detalledespacho.data;
      } catch (error) {
        this.$store.error(error.response.data.message);
      }
      this.dialogoMostrarDespacho = true;
      //this.$refs.DialogoTabsMostrarDespacho.$refs.componentTab.callSlider();
    },

    // Llena la listaDespacho con datos del servidor backend
    async obtenerTodosDespacho() {
      let resultado = await servicioDespacho.obtenerTodosDespacho();
      this.asignarListaDespacho(resultado.data);
    },
  },

  mixins: [autenticacionMixin, myMixin],

  created() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario.rol === "Administrador")
      this.$store.commit("colocarLayout", "LayoutAdministrador");
    if (usuario.rol === "Responsable Centro Acopio")
      this.$store.commit("colocarLayout", "LayoutCentroAcopio");
  },

  mounted() {
    this.obtenerTodosDespacho();
  },
};
</script>
