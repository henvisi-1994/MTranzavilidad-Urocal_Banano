<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo DialogNuevoMonitoreoRoedorCentroAcopio -->
    <DialogNuevoMonitoreoRoedorCentroAcopio
      ref="DialogNuevoMonitoreoRoedorCentroAcopio"
    ></DialogNuevoMonitoreoRoedorCentroAcopio>

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
              v-model="buscarMonitoreoRoedor"
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
        <!-- Tabla que muestra los MonitoreoRoedorCentroAcopio -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaMonitoreoRoedor"
          sort-by="monitoreoroedorid"
          :items="listaMonitoreoRoedorCentroAcopioStore"
          :search="buscarMonitoreoRoedor"
          class="elevation-1"
        >
          <template v-slot:top>
            <!-- Tabs que muestra la informacion detallada de MonitoreoRoedorCentroAcopio -->
            <DialogMostrarMonitoreoRoedorCentroAcopio
              ref="DialogMostrarMonitoreoRoedorCentroAcopio"
            ></DialogMostrarMonitoreoRoedorCentroAcopio>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon
              color="primary"
              @click="abrirMostrarMonitoreoRoedorCentroAcopio(item)"
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
          color="primary"
          @click="cargarDialogNuevoMonitoreoRoedorCentroAcopio()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";

import DialogNuevoMonitoreoRoedorCentroAcopio from "../components/DialogNuevoMonitoreoRoedorCentroAcopio";
import DialogMostrarMonitoreoRoedorCentroAcopio from "../components/DialogMostrarMonitoreoRoedorCentroAcopio";
import ServicioMonitoreoRoedorCentroAcopio from "../services/ServicioMonitoreoRoedorCentroAcopio";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseMonitoreoRoedorCentroAcopio",

  components: {
    DialogNuevoMonitoreoRoedorCentroAcopio,
    DialogMostrarMonitoreoRoedorCentroAcopio,
  },

  mounted() {
    this.cargarListaMonitoreoRoedorCentroAcopio();
    this.cargarListaAcopio();
  },

  data() {
    return {
      nombre: "Monitoreo de Roedores",
      buscarMonitoreoRoedor: "", // Guarda el texto de búsqueda
      cabeceraTablaMonitoreoRoedor: [
        // Detalla las cabeceras de la tabla
        {
          text: "Centro de acopio",
          value: "monitoreoroedor.centroacopionombre",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha de trampeo",
          value: "monfechatrampeo",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Tipo de trampa",
          value: "montipotrampa",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Numero de trampas",
          value: "monnumerotrampas",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Cebo Utilizado",
          value: "monceboutilizado",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Roedores muertos",
          value: "monroedoresmuertos",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Acciones tomadas",
          value: "monaccionestomadas",
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
    // Obtiene y modifica el estado de la variable dialogNuevoMonitoreoRoedorCentroAcopio
    dialogNuevoMonitoreoRoedorCentroAcopio: {
      get() {
        return this.$store.getters[
          "gestionDialogos/dialogNuevoMonitoreoRoedorCentroAcopio"
        ];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogNuevoMonitoreoRoedorCentroAcopio",
          v
        );
      },
    },

    listaMonitoreoRoedorCentroAcopioStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters[
              "moduloMonitoreoRoedorCentroAcopio/listaMonitoreoRoedorCentroAcopioStore"
            ]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloMonitoreoRoedorCentroAcopio/establecerListaMonitoreoRoedorCentroAcopioStore",
          v
        );
      },
    },

    listaAcopioStore: {
      get() {
        return this.$store.getters["moduloMonitoreoRoedorCentroAcopio/listaAcopioStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloMonitoreoRoedorCentroAcopio/establecerListaAcopioStore",
          v
        );
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarMonitoreoRoedorCentroAcopio
    dialogMostrarMonitoreoRoedorCentroAcopio: {
      get() {
        return this.$store.getters[
          "gestionDialogos/dialogMostrarMonitoreoRoedorCentroAcopio"
        ];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogMostrarMonitoreoRoedorCentroAcopio",
          v
        );
      },
    },

    modeloMonitoreoRoedorCentroAcopioStore: {
      get() {
        return this.$store.getters[
          "moduloMonitoreoRoedorCentroAcopio/monitoreoRoedorCentroAcopio"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloMonitoreoRoedorCentroAcopio/nuevoMonitoreoRoedorCentroAcopio",
          v
        );
      },
    },
  },

  methods: {
    // #  MANIPULACIÓN DE DATOS  #
    async cargarListaMonitoreoRoedorCentroAcopio() {
      let listaMonitoreoRoedorCentroAcopio = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioMonitoreoRoedorCentroAcopio.obtenerTodosMonitoreoRoedorCentroAcopio(); // Obtener respuesta de backend
      let datosMonitoreoRoedorCentroAcopio = await respuesta.data; // Rescatar datos de la respuesta
      datosMonitoreoRoedorCentroAcopio.forEach((CentroAcopio) => {
        // Guardar cada registro en la 'lista de datos'
        listaMonitoreoRoedorCentroAcopio.push(CentroAcopio);
      });
      this.listaMonitoreoRoedorCentroAcopioStore = listaMonitoreoRoedorCentroAcopio;
    },

    async cargarListaAcopio() {
      let listaAcopio = []; // Limpiar la 'lista de ciudades'
      let respuesta = await ServicioMonitoreoRoedorCentroAcopio.obtenerTodosAcopio(); // Obtener respuesta de backend
      let datosAcopio = await respuesta.data; // Rescatar datos de la respuesta
      datosAcopio.forEach((Acopio) => {
        // Guardar cada registro en la 'lista de datos'
        listaAcopio.push(Acopio);
      });
      this.listaAcopioStore = listaAcopio;
    },

    ...mapMutations("moduloMonitoreoRoedorCentroAcopio", ["establecerListaAcopioStore"]),
    // Vacia el modelo MonitoreoRoedorCentroAcopio
    ...mapMutations("moduloMonitoreoRoedorCentroAcopio", [
      "vaciarMonitoreoRoedorCentroAcopio",
    ]),

    // Carga el DialogNuevoMonitoreoRoedorCentroAcopio
    cargarDialogNuevoMonitoreoRoedorCentroAcopio() {
      this.dialogNuevoMonitoreoRoedorCentroAcopio = !this
        .dialogNuevoMonitoreoRoedorCentroAcopio; // Abre el dialogNuevoMonitoreoRoedorCentroAcopio
      this.$refs.DialogNuevoMonitoreoRoedorCentroAcopio.$refs.componentFormMonitoreoRoedorCentroAcopio.$refs.formMonitoreoRoedorCentroAcopio.resetValidation(); // Reinicia las validaciones de formMonitoreoRoedorCentroAcopio
      this.vaciarMonitoreoRoedorCentroAcopio(); // Vacia el modelo MonitoreoRoedorCentroAcopio
    },

    abrirMostrarMonitoreoRoedorCentroAcopio(item) {
      this.dialogMostrarMonitoreoRoedorCentroAcopio = !this
        .dialogMostrarMonitoreoRoedorCentroAcopio;
      this.vaciarMonitoreoRoedorCentroAcopio(); // Vacia el modelo MonitoreoRoedorCentroAcopio
      const indiceEditar = this.listaMonitoreoRoedorCentroAcopioStore.indexOf(item);
      this.modeloMonitoreoRoedorCentroAcopioStore = item;
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
};
</script>
