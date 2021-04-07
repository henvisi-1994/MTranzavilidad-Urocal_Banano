<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo Control de Maleza -->
    <DialogoNuevaMaleza ref="DialogoNuevaMaleza"></DialogoNuevaMaleza>

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
              v-model="buscarMaleza"
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
        <!-- Tabla que muestra los Controles de Maleza -->
        <v-data-table
          :headers="cabeceraTablaMaleza"
          :items="listaMalezaControl"
          :search="buscarMaleza"
          sort-by="confecha"
          :height="tablaResponsiva()"
          class="elevation-1"
        >
          <template v-slot:top>
            <DialogoMostrarMalezaControl
              ref="DialogoTabsMostrarMalezaControl"
            ></DialogoMostrarMalezaControl>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon
              color="primary"
              @click="abrirTabsMostrarMalezaControl(item.controlmalezaid)"
            >
              mdi-eye</v-icon
            >
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo Control de Maleza -->
        <v-btn
          large
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" elevation="0"
          color="primary"
          @click="cargarDialogoNuevaMaleza()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import DialogoNuevaMaleza from "../components/DialogoNuevaMaleza";
import DialogoMostrarMalezaControl from "../components/DialogoMostrarMalezaControl";
import servicioMalezaControl from "../services/ServicioMalezaControl";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion
import ServicioFinca from "../services/ServicioFinca";

export default {
  name: "BaseMaleza",

  components: {
    DialogoNuevaMaleza,
    DialogoMostrarMalezaControl,
  },

  data() {
    return {
      nombre: "Gestión de Control Maleza",
      buscarMaleza: "", // Guarda el texto de búsqueda
      // Detalla los cabezales de la tabla
      cabeceraTablaMaleza: [
        { text: "Fecha", value: "confecha", align: "center", class: "grey lighten-3" },
        {
          text: "Hectareas",
          value: "conhectareas",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Método",
          value: "conmetodo",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Operario",
          value: "conoperario",
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
          text: "N° Lote",
          value: "lotnumero",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Finca",
          value: "finnombrefinca",
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

    listaFincaStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloFinca/listaFincaStore"]));
      },
      set(v) {
        return this.$store.commit("moduloFinca/establecerListaFincaStore", v);
      },
    },
    // Obtiene y modifica el estado de la variable dialogoNuevaMaleza
    dialogoNuevaMaleza: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoNuevaMaleza"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogoNuevaMaleza", v);
      },
    },

     


    // Obtiene y modifica el estado de la variable dialogoMostrarMalezaControl
    dialogoMostrarMalezaControl: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoMostrarMalezaControl"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogoMostrarMalezaControl", v);
      },
    },

    // Obtiene el modelo Control Maleza
    maleza: {
      get() {
        return this.$store.getters["moduloMaleza/maleza"];
      },
      set(v) {
        return this.$store.commit("moduloMaleza/agregarMaleza", v);
      },
    },

    // Obtiene listaLotes
    ...mapState("moduloMaleza", ["listaMalezaControl"]),
  },

  methods: {
    // Carga el DialogoNuevaMaleza
    cargarDialogoNuevaMaleza() {
      this.dialogoNuevaMaleza = true; // Abre el DialogoNuevaMaleza
      this.vaciarMaleza(); // Vacia el modelo Maleza
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

    // Carga el TabMostrarLote
    async abrirTabsMostrarMalezaControl(controlmalezaid) {
      try {
        // Obtener datos de maleza
        let maleza = await servicioMalezaControl.obtenerMalezaControl(controlmalezaid);
        // Se asignan los datos a los modelos
        this.maleza = maleza.data;
        //console.log(this.maleza);
      } catch (error) {
        this.$store.error(error.response.data.message);
      }
      this.dialogoMostrarMalezaControl = true;
      //this.$refs.DialogTabsMostrarLote.$refs.componentTab.callSlider();
    },

    // Llena la listaMaleza con datos del servidor backend
    async obtenerTodosMalezaControl() {
      let resultado = await servicioMalezaControl.obtenerTodosMalezaControl();
      this.asignarListaMaleza(resultado.data);
      //console.log(this.listaMalezaControl);
    },

    //Obtiene mutaciones del moduloMaleza
    ...mapMutations("moduloMaleza", ["vaciarMaleza", "asignarListaMaleza"]),
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
    this.obtenerTodosMalezaControl();
    this.cargarListaFinca();
  },
};
</script>
