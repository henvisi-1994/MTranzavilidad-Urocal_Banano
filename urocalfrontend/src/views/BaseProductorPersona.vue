<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo usuario -->
    <DialogNuevoProductorPersona
      ref="DialogNuevoProductorPersona"
    ></DialogNuevoProductorPersona>

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
            <v-text-field
              class="custom"
              filled
              v-model="buscarProductorPersona"
              append-icon="mdi-magnify"
              label="Buscar"
              dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-data-table
          :headers="cabeceraTablaUsuarios"
          :items="listaProductorPersonaStore"
          :search="buscarProductorPersona"
          sort-by="id_lote"
          :height="tablaResponsiva()"
          class="elevation-1"
        >
          <template v-slot:top>
            <DialogEditarProductorPersona
              ref="DialogEditarProductorPersona"
            ></DialogEditarProductorPersona>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="cargarDialogEditarProductorPersona(item)"
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
          @click="cargarDialogNuevoProductorPersona()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from "vuex"; // Trabajar con la tienda de Vue (Store)
import DialogNuevoProductorPersona from "../components/DialogNuevoProductorPersona"; // Dialogo para agregar usuario
import DialogEditarProductorPersona from "../components/DialogEditarProductorPersona"; // Dialogo para editar usuario
import ServicioProductorPersona from "../services/ServicioProductorPersona"; // Interactuar con el Backend
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseProductorPersona",

  components: {
    DialogNuevoProductorPersona,
    DialogEditarProductorPersona,
  },

  created() {
    this.$store.commit("colocarLayout", "LayoutAdministrador");
  },

  mounted() {
    this.cargarListaProductorPersona();
    this.cargarListaCiudad();
  },

  data() {
    return {
      nombre: "Gestión de Productores",
      buscarProductorPersona: "", // Guarda el texto de búsqueda
      cabeceraTablaUsuarios: [
        // Cabeceras de la tabla (Los campos más relevantes)
        { text: "Cedula", value: "percedula", align: "center", class: "grey lighten-3" },
        {
          text: "Apellidos",
          value: "perapellidos",
          align: "center",
          sortable: false,
          class: "grey lighten-3",
        },
        {
          text: "Nombres",
          value: "pernombres",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Dirección",
          value: "perdireccion",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Teléfono",
          value: "pertelefono",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Whatsapp",
          value: "perwhatsapp",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Email",
          value: "peremail",
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
    listaProductorPersonaStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloProductorPersona/listaProductorPersonaStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloProductorPersona/establecerListaProductorPersonaStore",
          v
        );
      },
    },

    listaCiudadStore: {
      get() {
        return this.$store.getters["moduloProductorPersona/listaCiudadStore"];
      },
      set(v) {
        return this.$store.commit("moduloProductorPersona/establecerListaCiudadStore", v);
      },
    },

    // ##############
    // #  DIALOGOS  #
    // ##############
    dialogNuevoProductorPersona: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoProductorPersona"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoProductorPersona", v);
      },
    },

    dialogEditarProductorPersona: {
      get() {
        return this.$store.getters["gestionDialogos/dialogEditarProductorPersona"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogEditarProductorPersona",
          v
        );
      },
    },

    // #############
    // #  MODELOS  #
    // #############
    modeloProductorPersonaStore: {
      get() {
        return this.$store.getters["moduloProductorPersona/modeloProductorPersonaStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloProductorPersona/establecerModeloProductorPersonaStore",
          v
        );
      },
    },
  },

  methods: {
    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    async cargarListaProductorPersona() {
      let listaProductorPersona = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioProductorPersona.obtenerTodosProductorPersona(); // Obtener respuesta de backend
      let datosUsuario = await respuesta.data; // Rescatar datos de la respuesta
      datosUsuario.forEach((dd) => {
        // Guardar cada registro en la 'lista de datos'
        listaProductorPersona.push(dd);
      });
      this.listaProductorPersonaStore = listaProductorPersona;
    },

    async cargarListaCiudad() {
      let listaCiudad = []; // Limpiar la 'lista de ciudades'
      let respuesta = await ServicioProductorPersona.obtenerTodosCiudad(); // Obtener respuesta de backend
      let datosCiudad = await respuesta.data; // Rescatar datos de la respuesta
      datosCiudad.forEach((ciudad) => {
        // Guardar cada registro en la 'lista de datos'
        listaCiudad.push(ciudad);
      });
      this.listaCiudadStore = listaCiudad;
    },

    // ##############
    // #  DIALOGOS  #
    // ##############
    cargarDialogNuevoProductorPersona() {
      this.dialogNuevoProductorPersona = !this.dialogNuevoProductorPersona;
      this.vaciarModeloProductorPersonaStore();
    },

    cargarDialogEditarProductorPersona(item) {
      this.dialogEditarProductorPersona = !this.dialogEditarProductorPersona;
      this.vaciarModeloProductorPersonaStore();
      this.modeloProductorPersonaStore = item;
    },

    // ###################
    // #  TIENDA DE VUE  #
    // ###################
    ...mapMutations("moduloProductorPersona", ["establecerListaCiudadStore"]),
    ...mapMutations("moduloProductorPersona", ["vaciarModeloProductorPersonaStore"]),
  },

  mixins: [autenticacionMixin, myMixin],
};
</script>
