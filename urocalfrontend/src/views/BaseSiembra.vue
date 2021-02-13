<template>
  <v-container fluid>
    <!-- Dialog para registrar nueva Siembra -->
    <DialogoNuevaSiembra ref="DialogoNuevaSiembra"></DialogoNuevaSiembra>

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
              v-model="buscarSiembra"
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
        <!-- Tabla que muestra las Siembras -->
        <v-data-table
          :headers="cabeceraTablaSiembra"
          :items="listaSiembra"
          :search="buscarSiembra"
          sort-by="siembraid"
          :height="tablaResponsiva()"
          class="elevation-1"
        >
          <template v-slot:top>
            <DialogoMostrarSiembra
              ref="DialogoTabsMostrarSiembra"
            ></DialogoMostrarSiembra>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirTabsMostrarSiembra(item.siembraid)">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nueva siembra -->
        <v-btn
          large
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" elevation="0"
          color="primary"
          @click="cargarDialogoNuevaSiembra()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import DialogoNuevaSiembra from "../components/DialogoNuevaSiembra";
import DialogoMostrarSiembra from "../components/DialogoMostrarSiembra";
import servicioSiembra from "../services/ServicioSiembra";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseSiembra",

  components: {
    DialogoNuevaSiembra,
    DialogoMostrarSiembra,
  },

  data() {
    return {
      nombre: "Gestión de Siembras",
      buscarSiembra: "", // Guarda el texto de búsqueda
      cabeceraTablaSiembra: [
        // Detalla los cabezales de la tabla
        //{text: "ID", value: "id_siembra", align: "center", class: "grey lighten-3", },
        {
          text: "Fecha de compra",
          value: "siefechacomprasemilla",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Proveedor semilla",
          value: "sieproveedorsemilla",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha siembra",
          value: "siefechasiembra",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Cantidad plantas",
          value: "siecantidadplantas",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Hectareas",
          value: "siehectareas",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Operario",
          value: "sieoperario",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Cultivo",
          value: "pronombre",
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
    // Obtiene y modifica el estado de la variable dialogoNuevaSiembra
    dialogoNuevaSiembra: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoNuevaSiembra"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogoNuevaSiembra", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogoMostrarSiembra
    dialogoMostrarSiembra: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoMostrarSiembra"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogoMostrarSiembra", v);
      },
    },

    // Obtiene el modelo Control Maleza
    siembra: {
      get() {
        return this.$store.getters["moduloSiembra/siembra"];
      },
      set(v) {
        return this.$store.commit("moduloSiembra/agregarSiembra", v);
      },
    },

    // Obtiene listaLotes
    ...mapState("moduloSiembra", ["listaSiembra"]),
  },

  methods: {
    // Carga el DialogoNuevaSiembra
    cargarDialogoNuevaSiembra() {
      this.dialogoNuevaSiembra = true; // Abre el DialogStepperFormNewSiembra
      this.vaciarSiembra(); // Reinicia el modelo Siembra
    },

    // Carga el TabsMostrarSiembra
    async abrirTabsMostrarSiembra(siembraid) {
      try {
        // Obtener datos de siembra
        let siembra = await servicioSiembra.obtenerSiembra(siembraid);
        // Se asignan los datos a los modelos
        this.siembra = siembra.data;
      } catch (error) {
        this.$store.error(error.response.data.message);
      }
      this.dialogoMostrarSiembra = true;
      //this.$refs.DialogTabsMostrarLote.$refs.componentTab.callSlider();
    },

    // Llena la listaSemilla con datos del servidor backend
    async obtenerTodosSiembra() {
      let resultado = await servicioSiembra.obtenerTodosSiembra();
      this.asignarListaSiembra(resultado.data);
      //console.log(this.listaMalezaControl);
    },

    // Vacia el modelo siembra
    ...mapMutations("moduloSiembra", ["vaciarSiembra", "asignarListaSiembra"]),
  },

  mounted() {
    this.obtenerTodosSiembra();
  },

  created() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario.rol === "Administrador")
      this.$store.commit("colocarLayout", "LayoutAdministrador");
    if (usuario.rol === "Productor")
      this.$store.commit("colocarLayout", "LayoutProductor");
  },

  mixins: [autenticacionMixin, myMixin],
};
</script>
