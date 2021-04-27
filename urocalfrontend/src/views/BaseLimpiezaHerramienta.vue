<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo LimpiezaHerramienta -->
    <DialogNuevoLimpiezaHerramienta
      ref="DialogNuevoLimpiezaHerramienta"
    ></DialogNuevoLimpiezaHerramienta>

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
              v-model="buscarLimpiezaHerramienta"
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
        <!-- Tabla que muestra los LimpiezaHerramienta -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaLimpiezaHerramienta"
          sort-by="cultivoid"
          :items="listaLimpiezaHerramientaStore"
          :search="buscarLimpiezaHerramienta"
          class="elevation-1"
        >
          <template v-slot:top>
            <!-- Tabs que muestra la informacion detallada de LimpiezaHerramienta -->
            <DialogMostrarLimpiezaHerramienta
              ref="DialogMostrarLimpiezaHerramienta"
            ></DialogMostrarLimpiezaHerramienta>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon
              color="primary"
              @click="abrirMostrarLimpiezaHerramienta(item)"
            >
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo LimpiezaHerramienta -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px"
          large
          elevation="0"
          color="primary"
          @click="cargarDialogNuevoLimpiezaHerramienta()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";

import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion
import DialogNuevoLimpiezaHerramienta from "../components/DialogNuevoLimpiezaHerramienta";
import DialogMostrarLimpiezaHerramienta from "../components/DialogMostrarLimpiezaHerramienta";
import ServicioLimpiezaHerramienta from "../services/ServicioLimpiezaHerramienta";

import ServicioFinca from "../services/ServicioFinca";
import servicioCultivo from "../services/ServicioCultivo";
import servicioLote from "../services/ServicioLote";

export default {
  name: "BaseLimpiezaHerramienta",

  components: {
    DialogNuevoLimpiezaHerramienta,
    DialogMostrarLimpiezaHerramienta,
  },

  mounted() {
    this.cargarListaLimpiezaHerramienta();
    // this.cargarListaCultivos();
  },

  data() {
    return {
      nombre: "Limpieza de Herramientas",
      buscarLimpiezaHerramienta: "", // Guarda el texto de búsqueda
      cabeceraTablaLimpiezaHerramienta: [
        // Detalla las cabeceras de la tabla
        {
          text: "Cultivo",
          value: "cultivo",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha de limpieza",
          value: "limfecha",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Producto utilizado",
          value: "limproducto",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Equipos",
          value: "limequipos",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Maquinaria",
          value: "limmaquinaria",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Herramientas",
          value: "limherramientas",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Cajones",
          value: "limcajones",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Tendales",
          value: "limtendales",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Operario",
          value: "limoperario",
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
    editarLimpiezaHerramienta: {
      get() {
        return this.$store.getters[
          "moduloLimpiezaHerramienta/editarLimpiezaHerramienta"
        ];
      },
      set(v) {
        //establecerEditarimpiezaHerramienta en vez de editar en caso de dar error
        return this.$store.commit(
          "moduloLimpiezaHerramienta/establecerEditarimpiezaHerramienta",
          v
        );
      },
    },
    // Obtiene y modifica el estado de la variable dialogNuevoLimpiezaHerramienta
    dialogNuevoLimpiezaHerramienta: {
      get() {
        return this.$store.getters[
          "gestionDialogos/dialogNuevoLimpiezaHerramienta"
        ];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogNuevoLimpiezaHerramienta",
          v
        );
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarLimpiezaHerramienta
    dialogMostrarLimpiezaHerramienta: {
      get() {
        return this.$store.getters[
          "gestionDialogos/dialogMostrarLimpiezaHerramienta"
        ];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogMostrarLimpiezaHerramienta",
          v
        );
      },
    },

    listaLimpiezaHerramientaStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters[
              "moduloLimpiezaHerramienta/listaLimpiezaHerramientaStore"
            ]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloLimpiezaHerramienta/establecerListaLimpiezaHerramientaStore",
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

    listaCultivoStore: {
      get() {
        return this.$store.getters[
          "moduloLimpiezaHerramienta/listaCultivoStore"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloLimpiezaHerramienta/establecerListaCultivoStore",
          v
        );
      },
    },
    listaloteStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloLimpiezaHerramienta/listaloteStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloLimpiezaHerramienta/establecerlistaloteStore",
          v
        );
      },
    },

    modeloLimpiezaHerramientaStore: {
      get() {
        return this.$store.getters[
          "moduloLimpiezaHerramienta/limpiezaHerramienta"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloLimpiezaHerramienta/nuevoLimpiezaHerramienta",
          v
        );
      },
    },
  },

  methods: {
    // #  MANIPULACIÓN DE DATOS  #
    async cargarListaLimpiezaHerramienta() {
      let listaLimpiezaHerramienta = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioLimpiezaHerramienta.obtenerTodosLimpiezaHerramienta(); // Obtener respuesta de backend
      let datosLimpiezaHerramienta = await respuesta.data; // Rescatar datos de la respuesta
      datosLimpiezaHerramienta.forEach((LimpiezaHerramienta) => {
        // Guardar cada registro en la 'lista de datos'
        listaLimpiezaHerramienta.push(LimpiezaHerramienta);
      });
      this.listaLimpiezaHerramientaStore = listaLimpiezaHerramienta;
    },
    async cargarListaFinca() {
      let listaFinca = [];
      let respuesta = await ServicioFinca.obtenerTodosFincas();
      let datosFinca = await respuesta.data;
      datosFinca.forEach((finca) => {
        listaFinca.push(finca);
      });
      this.listaFincaStore = listaFinca;
    },

    async obtenerTodosListaCultivo() {
      let resultado = await servicioCultivo.obtenerCultivoDetalles(
        this.modeloLimpiezaHerramientaStore.lotecultivadoid
      );
      this.listaCultivoStore = resultado.data;
    },
    async obtenerTodosLoteCultivadoDeFinca() {
      let resultado = await servicioLote.obtenerTodosLoteCultivadoDeFinca(
        this.modeloLimpiezaHerramientaStore.fincaid
      );
      this.listaloteStore = resultado.data;
    },

    ...mapMutations("moduloLimpiezaHerramienta", [
      "establecerListaCultivoStore",
    ]),
    // Vacia el modelo LimpiezaHerramienta
    ...mapMutations("moduloLimpiezaHerramienta", ["vaciarLimpiezaHerramienta"]),

    // Carga el DialogNuevoLimpiezaHerramienta
    cargarDialogNuevoLimpiezaHerramienta() {
      this.dialogNuevoLimpiezaHerramienta = !this
        .dialogNuevoLimpiezaHerramienta; // Abre el DialogNuevoLimpiezaHerramienta
      this.$refs.DialogNuevoLimpiezaHerramienta.$refs.componentFormLimpiezaHerramienta.$refs.formLimpiezaHerramienta.resetValidation(); // Reinicia las validaciones de formLimpiezaHerramienta
      this.vaciarLimpiezaHerramienta(); // Vacia el modelo LimpiezaHerramienta
      this.editarLimpiezaHerramienta = false;
      // this.$store.commit("moduloPoda/establecerEditarLimpiezaHerramienta", false);
    },

    abrirMostrarLimpiezaHerramienta(item) {
      this.dialogMostrarLimpiezaHerramienta = !this
        .dialogMostrarLimpiezaHerramienta;
      this.vaciarLimpiezaHerramienta(); // Vacia el modelo LimpiezaHerramienta
      this.$store.commit(
        "moduloLimpiezaHerramienta/establecerEditarimpiezaHerramienta",
        true
      );
      this.modeloLimpiezaHerramientaStore = item;
      this.obtenerTodosListaCultivo();
      this.obtenerTodosLoteCultivadoDeFinca();

    },
  },

  mixins: [autenticacionMixin, myMixin],

  created() {
    // this.cargarListaCultivos();
    this.cargarListaFinca();

    let usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario.rol === "Administrador")
      this.$store.commit("colocarLayout", "LayoutAdministrador");
    if (usuario.rol === "Productor")
      this.$store.commit("colocarLayout", "LayoutProductor");
  },
};
</script>
