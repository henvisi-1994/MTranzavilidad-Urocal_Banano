<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo DialogNuevoMonitoreoRoedorFinca -->
    <DialogNuevoMonitoreoRoedorFinca
      ref="DialogNuevoMonitoreoRoedorFinca"
    ></DialogNuevoMonitoreoRoedorFinca>

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
        <!-- Tabla que muestra los MonitoreoRoedorFinca -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaMonitoreoRoedor"
          sort-by="fincaid"
          :items="listaMonitoreoRoedorFincaStore"
          :search="buscarMonitoreoRoedor"
          class="elevation-1"
        >
          <template v-slot:top>
            <!-- Tabs que muestra la informacion detallada de MonitoreoRoedorFinca -->
            <DialogMostrarMonitoreoRoedorFinca
              ref="DialogMostrarMonitoreoRoedorFinca"
            ></DialogMostrarMonitoreoRoedorFinca>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarMonitoreoRoedorFinca(item)">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo MonitoreoRoedorFinca -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          large
          color="primary"
          @click="cargarDialogNuevoMonitoreoRoedorFinca()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";

import DialogNuevoMonitoreoRoedorFinca from "../components/DialogNuevoMonitoreoRoedorFinca";
import DialogMostrarMonitoreoRoedorFinca from "../components/DialogMostrarMonitoreoRoedorFinca";
import ServicioMonitoreoRoedorFinca from "../services/ServicioMonitoreoRoedorFinca";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseMonitoreoRoedorFinca",

  components: {
    DialogNuevoMonitoreoRoedorFinca,
    DialogMostrarMonitoreoRoedorFinca,
  },

  mounted() {
    this.cargarListaMonitoreoRoedorFinca();
    this.cargarListaFincas();
  },

  data() {
    return {
      nombre: "Monitoreo de Roedores",
      buscarMonitoreoRoedor: "", // Guarda el texto de búsqueda
      cabeceraTablaMonitoreoRoedor: [
        // Detalla las cabeceras de la tabla
        {
          text: "Finca",
          value: "monitoreoroedor.finnombrefinca",
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
    // Obtiene y modifica el estado de la variable dialogNuevoMonitoreoRoedorFinca
    dialogNuevoMonitoreoRoedorFinca: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoMonitoreoRoedorFinca"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogNuevoMonitoreoRoedorFinca",
          v
        );
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarMonitoreoRoedorFinca
    dialogMostrarMonitoreoRoedorFinca: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarMonitoreoRoedorFinca"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogMostrarMonitoreoRoedorFinca",
          v
        );
      },
    },

    listaMonitoreoRoedorFincaStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters[
              "moduloMonitoreoRoedorFinca/listaMonitoreoRoedorFincaStore"
            ]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloMonitoreoRoedorFinca/establecerListaMonitoreoRoedorFincaStore",
          v
        );
      },
    },

    listaFincaStore: {
      get() {
        return this.$store.getters["moduloMonitoreoRoedorFinca/listaFincaStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloMonitoreoRoedorFinca/establecerListaFincaStore",
          v
        );
      },
    },

    modeloMonitoreoRoedorFincaStore: {
      get() {
        return this.$store.getters["moduloMonitoreoRoedorFinca/monitoreoRoedorFinca"];
      },
      set(v) {
        return this.$store.commit(
          "moduloMonitoreoRoedorFinca/nuevoMonitoreoRoedorFinca",
          v
        );
      },
    },
  },

  methods: {
    // #  MANIPULACIÓN DE DATOS  #
    async cargarListaMonitoreoRoedorFinca() {
      let listaMonitoreoRoedorFinca = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioMonitoreoRoedorFinca.obtenerTodosMonitoreoRoedorFinca(); // Obtener respuesta de backend
      let datosMonitoreoRoedorFinca = await respuesta.data; // Rescatar datos de la respuesta
      datosMonitoreoRoedorFinca.forEach((MonitoreoRoedorFinca) => {
        // Guardar cada registro en la 'lista de datos'
        listaMonitoreoRoedorFinca.push(MonitoreoRoedorFinca);
      });
      this.listaMonitoreoRoedorFincaStore = listaMonitoreoRoedorFinca;
    },

    async cargarListaFincas() {
      let listaFinca = []; // Limpiar la 'lista de ciudades'
      let respuesta = await ServicioMonitoreoRoedorFinca.obtenerTodosFinca(); // Obtener respuesta de backend
      let datosFinca = await respuesta.data; // Rescatar datos de la respuesta
      datosFinca.forEach((Finca) => {
        // Guardar cada registro en la 'lista de datos'
        listaFinca.push(Finca);
      });
      this.listaFincaStore = listaFinca;
    },

    ...mapMutations("moduloMonitoreoRoedorFinca", ["establecerListaFincaStore"]),
    // Vacia el modelo MonitoreoRoedorFinca
    ...mapMutations("moduloMonitoreoRoedorFinca", ["vaciarMonitoreoRoedorFinca"]),

    // Carga el DialogNuevoMonitoreoRoedorFinca
    cargarDialogNuevoMonitoreoRoedorFinca() {
      this.dialogNuevoMonitoreoRoedorFinca = !this.dialogNuevoMonitoreoRoedorFinca; // Abre el dialogNuevoMonitoreoRoedorFinca
      this.$refs.DialogNuevoMonitoreoRoedorFinca.$refs.componentFormMonitoreoRoedorFinca.$refs.formMonitoreoRoedorFinca.resetValidation(); // Reinicia las validaciones de formMonitoreoRoedorFinca
      this.vaciarMonitoreoRoedorFinca(); // Vacia el modelo MonitoreoRoedorFinca
    },

    abrirMostrarMonitoreoRoedorFinca(item) {
      this.dialogMostrarMonitoreoRoedorFinca = !this.dialogMostrarMonitoreoRoedorFinca;
      this.vaciarMonitoreoRoedorFinca(); // Vacia el modelo MonitoreoRoedorFinca
      const indiceEditar = this.listaMonitoreoRoedorFincaStore.indexOf(item);
      this.modeloMonitoreoRoedorFincaStore = item;
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
};
</script>
