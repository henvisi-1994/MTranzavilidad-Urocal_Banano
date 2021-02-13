<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo lote -->
    <DialogStepperLoteNuevo ref="DialogStepperLoteNuevo"></DialogStepperLoteNuevo>

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0" :class="$vuetify.breakpoint.xs ? '' : 'mt-5'">
      <v-card-title class="py-2">
        <v-row no-gutters justify-md="space-between">
          <v-col cols="12" md="6" class="centrar-vertical">
            <div class="transition-swing primary--text text-h4">Gestión de lotes</div>
          </v-col>
          <v-col cols="12" md="6">
            <!-- Caja de búsqueda -->
            <v-text-field
              v-model="buscarLote"
              append-icon="mdi-magnify"
              label="Buscar"
              class="custom"
              filled
              dense
              hide-details="false"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra los Lotes -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaLotes"
          sort-by="id_farm"
          :items="listaLotes"
          :search="buscarLote"
          class="elevation-1"
        >
          <template v-slot:top>
            <!-- Tabs que muestra la informacion detallada del lote -->
            <DialogTabMostrarLote ref="DialogTabsMostrarLote"></DialogTabMostrarLote>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirTabsMostrarLote(item.lotecultivadoid)">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo Lote -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px"
          large
          elevation="0"
          color="primary"
          @click="cargarDialogStepperLoteNuevo()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations, mapState } from "vuex";

import DialogStepperLoteNuevo from "../components/DialogStepperNuevoLote";
import DialogTabMostrarLote from "../components/DialogTabMostrarLote";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

import servicioLote from "../services/ServicioLote";
import servicioMedioAmbiente from "../services/ServicioMedioAmbiente";
import servicioSuelo from "../services/ServicioSuelo";
import servicioCultivo from "../services/ServicioCultivo";

export default {
  name: "BaseLote",

  components: {
    DialogStepperLoteNuevo,
    DialogTabMostrarLote,
  },

  data() {
    return {
      buscarLote: "", // Guarda el texto de búsqueda

      // Detalla las cabeceras de la tabla
      cabeceraTablaLotes: [
        {
          text: "Finca",
          value: "finnombrefinca",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Número de lotes",
          value: "lotnumero",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Hectareas",
          value: "lotnumerohectareas",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Observaciones",
          value: "lotobservacion",
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
    // Obtiene y modifica el estado de la variable dialogStepperLoteNuevo
    dialogStepperLoteNuevo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogStepperLoteNuevo"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogStepperLoteNuevo", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogTabMostrarLote
    dialogTabsMostrarLote: {
      get() {
        return this.$store.getters["gestionDialogos/dialogTabsMostrarLote"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogTabsMostrarLote", v);
      },
    },

    // Obtiene el modelo lote
    lote: {
      get() {
        return this.$store.getters["moduloLote/lote"];
      },
      set(v) {
        return this.$store.commit("moduloLote/agregarLote", v);
      },
    },

    // Obtiene el modelo suelo
    suelo: {
      get() {
        return this.$store.getters["moduloSuelo/suelo"];
      },
      set(v) {
        return this.$store.commit("moduloSuelo/agregarSuelo", v);
      },
    },

    // Obtiene el modelo medioambiente
    medAmbiente: {
      get() {
        return this.$store.getters["moduloMedioAmbiente/medAmbiente"];
      },
      set(v) {
        return this.$store.commit("moduloMedioAmbiente/agregarMedioAmbiente", v);
      },
    },

    // Obtiene la lista de IDs de productos
    listaIDsProductos: {
      get() {
        return this.$store.getters["moduloProducto/listaIDsProductos"];
      },
      set(v) {
        return this.$store.commit("moduloProducto/agregarListaIDsProductos", v);
      },
    },

    // Obtiene listaLotes
    ...mapState("moduloLote", ["listaLotes"]),
  },

  methods: {
    // Obtiene mutaciones del moduloLote
    ...mapMutations("moduloLote", ["vaciarLote", "asignarListaLotes"]),

    // Vacia el modelo environment
    ...mapMutations("moduloMedioAmbiente", ["vaciarMedioAmbiente"]),

    // Vacia la lista de IDs de productos
    ...mapMutations("moduloProducto", ["vaciarlistaIDsProductos"]),

    // Vacia el modelo soil
    ...mapMutations("moduloSuelo", ["vaciarSuelo"]),

    // Carga el DialogStepperLoteNuevo
    cargarDialogStepperLoteNuevo() {
      this.dialogStepperLoteNuevo = true; // Abre el DialogStepperLoteNuevo
      this.vaciarLote(); // Vacia el modelo Lote
      this.vaciarMedioAmbiente(); // Vacia el modelo MedioAmbiente
      this.vaciarlistaIDsProductos(); // Vacia la listaIDsProductos
      this.vaciarSuelo(); // Vacia el modelo Suelo
    },

    // Carga el TabMostrarLote
    async abrirTabsMostrarLote(lotecultivadoid) {
      try {
        // Obtener datos de lote, cultivos, medioAmbiente y suelo
        let lote = await servicioLote.obtenerLote(lotecultivadoid);
        let cultivos = await servicioCultivo.obtenerCultivoPorIdLote(lotecultivadoid);
        let medioAmbiente = await servicioMedioAmbiente.obtenerMedioAmbiente(
          lotecultivadoid
        );
        let suelo = await servicioSuelo.obtenerSuelo(lotecultivadoid);

        // Se asignan los datos a los modelos
        this.lote = lote.data;
        this.suelo = suelo.data;
        this.medAmbiente = medioAmbiente.data;

        // los cultivos devuelven una lista de objetos {lotecultivadoid, productoid}, por eso se hace un recorrido para almacenar solo los ids
        let listaIDsCultivos = [];
        cultivos.data.forEach((cultivo) => {
          listaIDsCultivos.push(cultivo.productoid);
        });
        this.listaIDsProductos = listaIDsCultivos;
      } catch (error) {
        this.$store.error(error.response.data.message);
      }
      this.dialogTabsMostrarLote = true;
      //this.$refs.DialogTabsMostrarLote.$refs.componentTab.callSlider();
    },

    // Llena la listaLotes con datos del servidor backend
    async obtenerTodosLote() {
      let resultado = await servicioLote.obtenerTodosLote();
      this.asignarListaLotes(resultado.data);
    },
  },

  mixins: [autenticacionMixin, myMixin],

  created() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario.rol === "Administrador")
      this.$store.commit("colocarLayout", "LayoutAdministrador");
    if (usuario.rol === "Productor")
      this.$store.commit("colocarLayout", "LayoutProductor");
  },

  mounted() {
    this.obtenerTodosLote();
  },
};
</script>
