<template>
  <v-container fluid>
    <!-- Dialog para registrar nueva Limpieza Centro Acopio -->
    <DialogoNuevaLimpiezaCentroAcopio
      ref="DialogoNuevaLimpiezaCentroAcopio"
    ></DialogoNuevaLimpiezaCentroAcopio>

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
              class="custom"
              filled
              v-model="buscarLimpiezaCA"
              append-icon="mdi-magnify"
              label="Buscar"
              dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra las Limpiezas del Centro de Acopio -->
        <v-data-table
          :headers="cabeceraTablaLimpiezaCA"
          :items="listaLimpiezaCentroAcopioStore"
          :search="buscarLimpiezaCA"
          sort-by="limcenfecha"
          :height="tablaResponsiva()"
          class="elevation-1"
        >
          <template v-slot:top>
            <DialogoMostrarLimpiezaCentroAcopio
              ref="DialogoMostrarLimpiezaCentroAcopio"
            ></DialogoMostrarLimpiezaCentroAcopio>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirTabsMostrarLimpiezaCentroAcopio(item)"
              >mdi-eye</v-icon
            >
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          large
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px"
          color="primary"
          @click="cargarDialogoNuevaLimpiezaCentroAcopio()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from "vuex"; // Trabajar con la tienda de Vue (Store)
import DialogoNuevaLimpiezaCentroAcopio from "../components/DialogoNuevaLimpiezaCentroAcopio"; // Dialogo para agregar una Limpieza
import DialogoMostrarLimpiezaCentroAcopio from "../components/DialogoMostrarLimpiezaCentroAcopio"; // Dialogo para editar una Limpieza
import ServicioLimpiezaCentroAcopio from "../services/ServicioLimpiezaCentroAcopio"; // Interactuar con el Backend
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseLimpiezaCA",

  components: {
    DialogoNuevaLimpiezaCentroAcopio,
    DialogoMostrarLimpiezaCentroAcopio,
  },

  mounted() {
    this.cargarListaLimpiezaCentroAcopio();
    this.cargarListaCentroAcopio();
  },

  data() {
    return {
      nombre: "Limpieza de Centro de Acopio",
      buscarLimpiezaCA: "", // Guarda el texto de búsqueda
      cabeceraTablaLimpiezaCA: [
        // Detalla los cabezales de la tabla
        { text: "Fecha", value: "limcenfecha", align: "center", class: "grey lighten-3" },
        {
          text: "Área",
          value: "limcenareas",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Materiales",
          value: "limcenmateriales",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Productos",
          value: "limcenproductos",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Motivo",
          value: "limcenmotivo",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Centro de Acopio",
          value: "centroacopiolista.centroacopionombre",
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
    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################

    listaLimpiezaCentroAcopioStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters[
              "moduloLimpiezaCentroAcopio/listaLimpiezaCentroAcopioStore"
            ]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloLimpiezaCentroAcopio/establecerListaLimpiezaCentroAcopioStore",
          v
        );
      },
    },

    listaCentroAcopioStore: {
      get() {
        return this.$store.getters["moduloLimpiezaCentroAcopio/listaCentroAcopioStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloLimpiezaCentroAcopio/establecerListaCentroAcopioStore",
          v
        );
      },
    },

    // ##############
    // #  DIALOGOS  #
    // ##############
    // Obtiene y modifica el estado de la variable dialogoNuevaLimpiezaCentroAcopio
    dialogoNuevaLimpiezaCentroAcopio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoNuevaLimpiezaCentroAcopio"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogoNuevaLimpiezaCentroAcopio",
          v
        );
      },
    },

    // Obtiene y modifica el estado de la variable dialogoMostrarLimpiezaCentroAcopio
    dialogoMostrarLimpiezaCentroAcopio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoMostrarLimpiezaCentroAcopio"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogoMostrarLimpiezaCentroAcopio",
          v
        );
      },
    },

    // #############
    // #  MODELOS  #
    // #############
    modeloLimpiezaCentroAcopioStore: {
      get() {
        return this.$store.getters[
          "moduloLimpiezaCentroAcopio/modeloLimpiezaCentroAcopioStore"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloLimpiezaCentroAcopio/establecerModeloLimpiezaCentroAcopioStore",
          v
        );
      },
    },
  },

  methods: {
    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    async cargarListaLimpiezaCentroAcopio() {
      let listaLimpiezaCentroAcopio = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioLimpiezaCentroAcopio.obtenerTodosLimpiezaCentroAcopio(); // Obtener respuesta de backend
      let datosLimpiezaCentroAcopio = await respuesta.data; // Rescatar datos de la respuesta
      datosLimpiezaCentroAcopio.forEach((dd) => {
        // Guardar cada registro en la 'lista de datos'
        listaLimpiezaCentroAcopio.push(dd);
      });
      this.listaLimpiezaCentroAcopioStore = listaLimpiezaCentroAcopio;
      //console.log(this.listaLimpiezaCentroAcopioStore);
    },

    async cargarListaCentroAcopio() {
      let listaCentroAcopio = []; // Limpiar la 'lista de centros de acopio'
      let respuesta = await ServicioLimpiezaCentroAcopio.obtenerTodosListaCentroAcopio(); // Obtener respuesta de backend
      let datosCentroAcopio = await respuesta.data; // Rescatar datos de la respuesta
      datosCentroAcopio.forEach((centroacopio) => {
        // Guardar cada registro en la 'lista de datos'
        listaCentroAcopio.push(centroacopio);
      });
      this.listaCentroAcopioStore = listaCentroAcopio;
      //console.log(this.listaCentroAcopioStore);
    },

    // ##############
    // #  DIALOGOS  #
    // ##############

    // Carga el DialogoNuevaLimpiezaCentroAcopio
    cargarDialogoNuevaLimpiezaCentroAcopio() {
      this.dialogoNuevaLimpiezaCentroAcopio = !this.dialogoNuevaLimpiezaCentroAcopio;
      this.vaciarModeloLimpiezaCentroAcopioStore(); // Reinicia el modelo Limpieza Centro Acopio
    },

    abrirTabsMostrarLimpiezaCentroAcopio(item) {
      this.dialogoMostrarLimpiezaCentroAcopio = !this.dialogoMostrarLimpiezaCentroAcopio;
      //this.$refs.DialogoTabsMostrarLimpiezaCentroAcopio.$refs.componenteFormularioLimpiezaCA.$refs.formularioLimpiezaCA.resetValidation(); // Reinicia las validaciones de formLimpiezaCA
      this.vaciarModeloLimpiezaCentroAcopioStore(); // Vacia el modelo Limpieza Centro Acopio
      this.modeloLimpiezaCentroAcopioStore = item;
    },

    // ###################
    // #  TIENDA DE VUE  #
    // ###################

    // Vacia el modelo
    ...mapMutations("moduloLimpiezaCentroAcopio", ["establecerListaCentroAcopioStore"]),
    ...mapMutations("moduloLimpiezaCentroAcopio", [
      "vaciarModeloLimpiezaCentroAcopioStore",
    ]),
  },

  mixins: [autenticacionMixin, myMixin],

  created() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario.rol === "Administrador")
      this.$store.commit("colocarLayout", "LayoutAdministrador");
    if (usuario.rol === "Responsable Centro Acopio")
      this.$store.commit("colocarLayout", "LayoutCentroAcopio");
  },
};
</script>
