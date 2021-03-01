<template>
  <v-container fluid>
    <DialogNuevoGuiaRemision ref="componentDialogNuevoGuiaRemision"/>
    
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
            <v-text-field class="custom px-2" dense filled
              v-model="buscarGuia"
              append-icon="mdi-magnify"
              label="Buscar"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaGuiaRemision"
          sort-by="guiserie"
          :items="listaGuiaRemisionStore"
          :search="buscarGuia"
          class="elevation-1"
        >
          <template v-slot:top>
            <DialogMostrarGuiaRemision ref="componentDialogMostrarGuiaRemision"></DialogMostrarGuiaRemision>
          </template>
          <template v-slot:item.guifechaemision="{ item }">
            {{new Date(item.guifechaemision).toISOString().substr(0, 10),}}
          </template>
          <template v-slot:item.guifechainicio="{ item }">
            {{new Date(item.guifechainicio).toISOString().substr(0, 10),}}
          </template>
          <template v-slot:item.guifechafin="{ item }">
            {{new Date(item.guifechafin).toISOString().substr(0, 10),}}
          </template>
          <template v-slot:item.guidestinatario="{ item }">
            {{JSON.parse(item.guidestinatario).rucci}}
          </template>
          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarGuiaRemision(item)"> mdi-eye </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px"
          large
          elevation="0"
          color="primary"
          @click="cargarDialogNuevoGuiaRemision()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

import { mapMutations, mapState } from 'vuex';
import DialogNuevoGuiaRemision from "@/components/DialogNuevoGuiaRemision";
import DialogMostrarGuiaRemision from "@/components/DialogMostrarGuiaRemision";
import ServicioGuiaRemision from '../services/ServicioGuiaRemision';
import ServicioProductorPersona from '../services/ServicioProductorPersona';
import ServicioConductorPersona from '../services/ServicioConductorPersona';

export default {
  data() {
    return {
      nombre: "Guía de Remisión",
      guiaremision: {
        guiserie: "",
        guinumero: "",
        guifechaemision: "",
        guifechainicio: "",
        guihorainicio: "",
        guifechafin: "",
        guihorafin: "",
        guipuntoinicio: "",
        guipuntofin: "",
        guidestinatario: "",
        guimotivo: "",
        guiformapago: "",
        guiobservacion: "",
        guiemiteurocal: false,
      },
      buscarGuia: "",
      cabeceraTablaGuiaRemision: [
        {
          text: "Serie",
          value: "guiserie",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Número",
          value: "guinumero",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha emisión",
          value: "guifechaemision",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha inicio traslado",
          value: "guifechainicio",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Hora inicio traslado",
          value: "guihorainicio",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha fin traslado",
          value: "guifechafin",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Hora fin traslado",
          value: "guihorafin",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Punto de inicio",
          value: "guipuntoinicio",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Punto de fin",
          value: "guipuntofin",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Comprobante de venta",
          value: "guicomprobanteventa",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Motivo",
          value: "guimotivo",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Destinatario",
          value: "guidestinatario",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Forma de pago",
          value: "guiformapago",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Observación",
          value: "guiobservacion",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Conductor",
          value: "conductorid",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Vehículo",
          value: "vehiculoid",
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

  components: {
    DialogNuevoGuiaRemision,
    DialogMostrarGuiaRemision
  },

  computed:{
    ...mapState('moduloGuiaRemision', ['listaGuiaRemisionStore', 'editarGuiaRemision']),
    ...mapState('moduloProductorPersona', ['listaProductorPersonaStore']),

    dialogNuevoGuiaRemision: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoGuiaRemision"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoGuiaRemision", v);
      },
    },

    dialogMostrarGuiaRemision: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarGuiaRemision"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogMostrarGuiaRemision", v);
      },
    },

    modeloGuiaRemisionStore: {
      get() {
        return this.$store.getters["moduloGuiaRemision/modeloGuiaRemisionStore"];
      },
      set(v) {
        return this.$store.commit("moduloGuiaRemision/establecerModeloGuiaRemisionStore", v);
      },
    },

    listaGuiaRemisionStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloGuiaRemision/listaGuiaRemisionStore"]));
      },
      set(v) {
        return this.$store.commit("moduloGuiaRemision/establecerListaGuiaRemisionStore", v);
      },
    },

    listaProductorPersonaStore: {
      get() {
        return this.$store.getters["moduloProductorPersona/listaProductorPersonaStore"];
      },
      set(v) {
        return this.$store.commit("moduloProductorPersona/establecerListaProductorPersonaStore", v);
      },
    },

    listaConductorPersonaStore: {
      get() {
        return this.$store.getters["moduloConductorPersona/listaConductorPersonaStore"];
      },
      set(v) {
        return this.$store.commit("moduloConductorPersona/establecerListaConductorPersonaStore", v);
      },
    },

    editarGuiaRemision: {
      get() {
        return this.$store.getters["moduloGuiaRemision/editarGuiaRemision"];
      },
      set(v) {
        return this.$store.commit("moduloGuiaRemision/establecerEditarGuiaRemision", v);
      },
    },
  },

  methods: {
    ...mapMutations("moduloGuiaRemision", ["vaciarGuiaRemision"]),

    async cargarListaGuiaRemision() {
      let listaGuiaRemision = [];
      let respuesta = await ServicioGuiaRemision.obtenerTodosGuiaRemision();
      let guiaremisiones = await respuesta.data;
      guiaremisiones.forEach((f) => {
        listaGuiaRemision.push(f);
      });
      this.listaGuiaRemisionStore = listaGuiaRemision;
    },

    async cargarProductores(){
      let listaProductores = [];
      let respuesta = await ServicioProductorPersona.obtenerTodosProductorPersona();
      let productores = await respuesta.data;
      productores.forEach((f) => {
        listaProductores.push(f);
      });
      this.listaProductorPersonaStore = listaProductores;
    },

    async cargarConductores(){
      let listaConductores = [];
      let respuesta = await ServicioConductorPersona.obtenerTodosConductorPersona();
      let conductores = await respuesta.data;
      conductores.forEach((f) => {
        listaConductores.push(f);
      });
      this.listaConductorPersonaStore = listaConductores;
    },
    
    cargarDialogNuevoGuiaRemision(){
      this.dialogNuevoGuiaRemision = !this.dialogNuevoGuiaRemision;
      this.editarGuiaRemision = false;
      this.$refs.componentDialogNuevoGuiaRemision.$refs.componentFormGuiaRemision.$refs.formGuiaRemision.resetValidation();
      this.vaciarGuiaRemision();
    },

    async abrirMostrarGuiaRemision(item) {
      this.dialogMostrarGuiaRemision = !this.dialogMostrarGuiaRemision;
      this.editarGuiaRemision = true;
      this.$refs.componentDialogMostrarGuiaRemision.$refs.componentFormGuiaRemision.$refs.formGuiaRemision.resetValidation();
      this.vaciarGuiaRemision();
      let respuesta = await ServicioGuiaRemision.obtenerCargas(item.guiaremisionid);
      item.carga = respuesta.data;
      this.modeloGuiaRemisionStore = item;
    },
  },

  mixins: [autenticacionMixin, myMixin],

  created() {
    this.cargarListaGuiaRemision();
    this.cargarProductores();
    this.cargarConductores();
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario.rol === "Administrador")
      this.$store.commit("colocarLayout", "LayoutAdministrador");
    if (usuario.rol === "Productor")
      this.$store.commit("colocarLayout", "LayoutProductor");
  }
};
</script>

<style></style>
