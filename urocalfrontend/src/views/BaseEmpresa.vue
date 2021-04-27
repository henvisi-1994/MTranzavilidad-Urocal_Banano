<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo Empresa -->
    <DialogEmpresaNuevo ref="DialogEmpresaNuevo"></DialogEmpresaNuevo>

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
              v-model="buscarEmpresa"
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
        <!-- Tabla que muestra las Empresas -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaEmpresa"
          sort-by="Empresa_id"
          :items="listaEmpresaStore"
          :search="buscarEmpresa"
          class="elevation-1"
        >
          <template v-slot:top>
            <!-- Tabs que muestra la informacion detallada del Empresa -->
            <DialogMostrarEmpresa
              ref="dialogMostrarEmpresa"
            ></DialogMostrarEmpresa>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirTabsMostrarEmpresa(item)">
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
          elevation="0"
          large
          color="primary"
          @click="cargarDialogEmpresaNuevo()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";
import servicioEmpresa from "../services/ServicioEmpresa";
import DialogEmpresaNuevo from "../components/DialogEmpresaNuevo";
import DialogMostrarEmpresa from "../components/DialogMostrarEmpresa";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseEmpresa",

  components: {
    DialogEmpresaNuevo,
    DialogMostrarEmpresa,
  },

  data() {
    return {
      nombre: "Gestión de Empresa",
      Empresas: [],
      buscarEmpresa: "", // Guarda el texto de búsqueda
      cabeceraTablaEmpresa: [
        // Detalla las cabeceras de la tabla

        {
          text: "Razon Social",
          value: "emprazonsocial",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "RUC",
          value: "empruc",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Tipo",
          value: "emptipo",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Direccion",
          value: "empdireccion",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Telefono",
          value: "emptelefono",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Email",
          value: "empemail",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Pais",
          value: "paisnombre",
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
    // Obtiene y modifica el estado de la variable dialogStepperEmpresaNuevo
    dialogoNuevaEmpresa: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoNuevaEmpresa"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogoNuevaEmpresa",
          v
        );
      },
    },
      bloquearEmpresa: {
      get() {
        return this.$store.getters["moduloEmpresa/bloquearEmpresa"];
      },
      set(v) {
        return this.$store.commit("moduloEmpresa/cambiarEstadoBloquearEmpresa", v);
      },
      },

    listaEmpresaStore: {
      get() {
        return this.$store.getters["moduloEmpresa/listaEmpresaStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloEmpresa/establecerListaEmpresaStore",
          v
        );
      },
    },
    modeloEmpresaStore: {
      get() {
        return this.$store.getters["moduloEmpresa/modeloEmpresaStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloEmpresa/establecerModeloEmpresaStore",
          v
        );
      },
    },
    // Obtiene y modifica el estado de la variable dialogTabMostrarLote
    dialogoMostrarEmpresa: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoMostrarEmpresa"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit(
          "gestionDialogos/toggleDialogoMostrarEmpresa",
          v
        );
      },
    },
    modeloEmpresaStore: {
      get() {
        return this.$store.getters["moduloEmpresa/modeloEmpresaStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloEmpresa/establecerModeloEmpresaStore",
          v
        );
      },
    },
  },

  methods: {
    // Vacia el modelo lot
    ...mapMutations("moduloEmpresa", ["vaciarModeloEmpresa"]),

    // Vacia el modelo environment
    // ...mapMutations("moduloTratamiento", ["vaciarTratamiento"]),

    // Carga el dialogStepperEmpresaTratamientoNuevo
    cargarDialogEmpresaNuevo() {
      this.dialogoNuevaEmpresa = !this.dialogoNuevaEmpresa; // Abre el dialogStepperEmpresaTratamientoNuevo
      this.vaciarModeloEmpresa(); // Vacia el modelo Lote
    },

    async abrirTabsMostrarEmpresa(item) {
      this.vaciarModeloEmpresa();
      this.$store.commit(
          "gestionDialogos/toggleDialogoMostrarEmpresa",
          !this.dialogMostrarEmpresa
        );
        this.bloquearEmpresa = !this.bloquearEmpresa;
      let resultado = await servicioEmpresa.obtenerEmpresa(item.empresaid);
      this.modeloEmpresaStore = resultado.data;
    },
    async obtenerEmpresa() {
      let resultado = await servicioEmpresa.obtenerTodosEmpresa();
      this.listaEmpresaStore = resultado.data;
    },
  },

  mixins: [autenticacionMixin, myMixin],
  mounted() {
    this.obtenerEmpresa();
  },
  created() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario.rol === "Administrador")
      this.$store.commit("colocarLayout", "LayoutAdministrador");
    if (usuario.rol === "Productor")
      this.$store.commit("colocarLayout", "LayoutProductor");
  },
};
</script>
