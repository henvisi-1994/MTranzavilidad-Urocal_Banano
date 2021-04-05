<template>
  <v-container fluid>
    <!-- Dialog para registrar nueva Fertilizante -->
    <DialogNuevoFertilizante
      ref="componentDialogNuevoFertilizante"
    ></DialogNuevoFertilizante>

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
              v-model="buscarFertilizante"
              append-icon="mdi-magnify"
              label="Buscar" class="custom" filled dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra lista de fertilizante -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaFertilizante"
          sort-by="id_lote"
          :items="listaFertilizantesStore"
          :search="buscarFertilizante"
          class="elevation-1"
          dense
        >
          <template v-slot:top>
            <!-- Dialog que muestra el formulario con toda la informacion de fertilizante -->
            <DialogMostrarFertilizante
              ref="componentDialogMostrarFertilizante"
            ></DialogMostrarFertilizante>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarFertilizante(item)"> mdi-eye </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nueva fertilizante -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          color="primary"
          @click="cargarDialogNuevoFertilizante()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

import DialogNuevoFertilizante from "@/components/DialogNuevoFertilizante";
import DialogMostrarFertilizante from "@/components/DialogMostrarFertilizante";
import ServicioFertilizantes from '../services/ServicioFertilizantes';
import servicioCultivo from "../services/ServicioCultivo";
import servicioLote from "../services/ServicioLote";
export default {
  name: "BaseFertilizante",

  components: {
    DialogNuevoFertilizante,
    DialogMostrarFertilizante,
  },

  mounted() {
    this.cargarListaFertilizante();
  },

  data() {
    return {
      nombre: "Gestión de Fertilización",      
      buscarFertilizante: "", // Guarda el texto de búsqueda
      cabeceraTablaFertilizante: [
        //Detalla las cabeceras de la tabla
        {
          text: "Código de finca",
          value: "fincodigo",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Lote",
          value: "lotnumero",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Cultivo",
          value: "cultivo",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Ciclo",
          value: "ferciclo",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha",
          value: "ferfecha",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Nombre Comercial",
          value: "fernombrecomercial",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Elementos",
          value: "ferelementos",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Concentración",
          value: "ferconcentracion",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Área Aplicada",
          value: "ferareaaplicada",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Cantidad Aplicada",
          value: "fercantidadaplicada",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Unidad de Medidad",
          value: "ferunidadmedida",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Equipo de Aplicación",
          value: "ferequipoaplicacion",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Método de Aplicación",
          value: "fermetodoaplicacion",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Operario",
          value: "feroperario",
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
    listaFertilizantesStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloFertilizante/listaFertilizantesStore"]));
      },
      set(v) {
        return this.$store.commit("moduloFertilizante/establecerListaFertilizantesStore", v);
      },
    },

    listacultivoStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloFertilizante/listacultivoStore"]));
      },
      set(v) {
        return this.$store.commit("moduloFertilizante/establecerlistacultivoStore", v);
      },
    },

    listaloteStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloFertilizante/listaloteStore"]));
      },
      set(v) {
        return this.$store.commit("moduloFertilizante/establecerlistaloteStore", v);
      },
    },


  

    // Obtiene y modifica el estado de la variable dialogNuevoFertilizante
    dialogNuevoFertilizante: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoFertilizante"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoFertilizante", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarFertilizante
    dialogMostrarFertilizante: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarFertilizante"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarFertilizante", v);
      },
    },

    modeloFertilizanteStore: {
      get() {
        return this.$store.getters["moduloFertilizante/modeloFertilizanteStore"];
      },
      set(v) {
        return this.$store.commit("moduloFertilizante/establecerModeloFertilizanteStore", v);
      },
    },

    // Obtiene la variable bloquearCamposFormFertilizante
    bloquearCamposFormFertilizante: {
      get() {
        return this.$store.getters["moduloFertilizante/bloquearCamposFormFertilizante"];
      },
      set(v) {
        return this.$store.commit("moduloFertilizante/cambiarBloquearCamposFormFertilizante", v);
      },
    },
  },
  
  methods: {
    async cargarListaFertilizante () {
      let listaFertilizantes = [];
      let respuesta = await ServicioFertilizantes.obtenerTodosFertilizantes();
      let fertilizantes = await respuesta.data;
      fertilizantes.forEach((f) => {
        listaFertilizantes.push(f);
      });
      this.listaFertilizantesStore = listaFertilizantes;
    },

    tablaResponsiva() {
      // Ajusta el tamaño de la tabla para pantallas pequeñas
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          if (
            this.$vuetify.breakpoint.height >= 500 &&
            this.$vuetify.breakpoint.height <= 550
          ) {
            return "41vh";
          }
          if (
            this.$vuetify.breakpoint.height >= 551 &&
            this.$vuetify.breakpoint.height <= 599
          ) {
            return "44vh";
          }
          if (
            this.$vuetify.breakpoint.height >= 600 &&
            this.$vuetify.breakpoint.height <= 650
          ) {
            return "51vh";
          }
          if (
            this.$vuetify.breakpoint.height >= 651 &&
            this.$vuetify.breakpoint.height <= 699
          ) {
            return "53vh";
          }
          if (
            this.$vuetify.breakpoint.height >= 700 &&
            this.$vuetify.breakpoint.height <= 799
          ) {
            return "57vh";
          }
          if (this.$vuetify.breakpoint.height >= 800) {
            return "61vh";
          }
        default:
          return "auto";
      }
    },

    // Carga el DialogMostrarFertilizante
      abrirMostrarFertilizante(item) {
      this.dialogMostrarFertilizante = !this.dialogMostrarFertilizante; // Abre el DialogMostrarFertilizante
      this.$refs.componentDialogMostrarFertilizante.$refs.componentFormFertilizante.$refs.formFertilizante.resetValidation();
      this.vaciarModeloFertilizanteStore();
      this.bloquearCamposFormFertilizante=true;
      this.modeloFertilizanteStore = item;
      this.obtenerTodosListaCultivo();
      this.obtenerTodosLoteCultivadoDeFinca();
    },

    // Vacia el modelo fertilizante
    ...mapMutations("moduloFertilizante", ["vaciarModeloFertilizanteStore"]),
   
   
      async obtenerTodosListaCultivo() {
      let resultado = await servicioCultivo.obtenerCultivoDetalles(this.modeloFertilizanteStore.lotecultivadoid);
      this.listacultivoStore = resultado.data; 

    },

      async obtenerTodosLoteCultivadoDeFinca() {
      let resultado = await servicioLote.obtenerTodosLoteCultivadoDeFinca(this.modeloFertilizanteStore.fincaid);
      this.listaloteStore = resultado.data; 
      
    },


    // Carga el DialogNuevoFertilizante
    cargarDialogNuevoFertilizante() {
      this.dialogNuevoFertilizante = !this.dialogNuevoFertilizante;
      this.$refs.componentDialogNuevoFertilizante.$refs.componentFormFertilizante.$refs.formFertilizante.resetValidation();
      this.bloquearCamposFormFertilizante=false;
      this.vaciarModeloFertilizanteStore();
    },
  },

  created() {
    this.$store.commit("colocarLayout", "LayoutProductor");
  },
};
</script>
