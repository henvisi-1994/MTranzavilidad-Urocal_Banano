<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo usuario -->
    <DialogNuevoUsuarioPersona
      ref="DialogNuevoUsuarioPersona"
    ></DialogNuevoUsuarioPersona>

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
              v-model="buscarUsuarioPersona"
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
          :items="listaUsuarioPersonaStore"
          :search="buscarUsuarioPersona"
          sort-by="id_lote"
          :height="tablaResponsiva()"
          class="elevation-1"
        >
          <template v-slot:top>
            <DialogEditarUsuarioPersona
              ref="DialogEditarUsuarioPersona"
            ></DialogEditarUsuarioPersona>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="cargarDialogEditarUsuarioPersona(item)"
              >mdi-eye</v-icon
            >
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          elevation="0"
          large
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px"
          color="primary"
          @click="cargarDialogNuevoUsuarioPersona()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from "vuex"; // Trabajar con la tienda de Vue (Store)
import DialogNuevoUsuarioPersona from "../components/DialogNuevoUsuarioPersona"; // Dialogo para agregar usuario
import DialogEditarUsuarioPersona from "../components/DialogEditarUsuarioPersona"; // Dialogo para editar usuario
import ServicioUsuarioPersona from "../services/ServicioUsuarioPersona"; // Interactuar con el Backend
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseUsuarioPersona",

  components: {
    DialogNuevoUsuarioPersona,
    DialogEditarUsuarioPersona,
  },

  created() {
    this.$store.commit("colocarLayout", "LayoutAdministrador");
  },

  mounted() {
    this.cargarListaUsuarioPersona();
    this.cargarListaCiudad();
  },

  data() {
    return {
      nombre: "Gestión de Usuarios",
      buscarUsuarioPersona: "", // Guarda el texto de búsqueda
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
    listaUsuarioPersonaStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloUsuarioPersona/listaUsuarioPersonaStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloUsuarioPersona/establecerListaUsuarioPersonaStore",
          v
        );
      },
    },

    listaCiudadStore: {
      get() {
        return this.$store.getters["moduloUsuarioPersona/listaCiudadStore"];
      },
      set(v) {
        return this.$store.commit("moduloUsuarioPersona/establecerListaCiudadStore", v);
      },
    },

    // ##############
    // #  DIALOGOS  #
    // ##############
    dialogNuevoUsuarioPersona: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoUsuarioPersona"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoUsuarioPersona", v);
      },
    },

    dialogEditarUsuarioPersona: {
      get() {
        return this.$store.getters["gestionDialogos/dialogEditarUsuarioPersona"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogEditarUsuarioPersona", v);
      },
    },

    // #############
    // #  MODELOS  #
    // #############
    modeloUsuarioPersonaStore: {
      get() {
        return this.$store.getters["moduloUsuarioPersona/modeloUsuarioPersonaStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloUsuarioPersona/establecerModeloUsuarioPersonaStore",
          v
        );
      },
    },
  },

  methods: {
    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    async cargarListaUsuarioPersona() {
      let listaUsuarioPersona = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioUsuarioPersona.obtenerTodosUsuarioPersona(); // Obtener respuesta de backend
      let datosUsuario = await respuesta.data; // Rescatar datos de la respuesta
      datosUsuario.forEach((usuariopersona) => {
        // Guardar cada registro en la 'lista de datos'
        listaUsuarioPersona.push(usuariopersona);
      });
      this.listaUsuarioPersonaStore = listaUsuarioPersona;
      //console.log(this.listaUsuarioPersonaStore);
    },

    async cargarListaCiudad() {
      let listaCiudad = [];
      let respuesta = await ServicioUsuarioPersona.obtenerTodosCiudad(); // Obtener respuesta de backend
      let datosCiudad = await respuesta.data; // Rescatar datos de la respuesta
      datosCiudad.forEach((ciudad) => {
        // Guardar cada registro en la 'lista de datos'
        listaCiudad.push(ciudad);
      });
      this.listaCiudadStore = listaCiudad;
      //console.log(this.listaCiudadStore);
    },

    // ##############
    // #  DIALOGOS  #
    // ##############
    cargarDialogNuevoUsuarioPersona() {
      this.dialogNuevoUsuarioPersona = !this.dialogNuevoUsuarioPersona;
      this.vaciarModeloUsuarioPersona();
    },

    cargarDialogEditarUsuarioPersona(item) {
      this.dialogEditarUsuarioPersona = !this.dialogEditarUsuarioPersona;
      this.vaciarModeloUsuarioPersona();
      const indiceEditar = this.listaUsuarioPersonaStore.indexOf(item);
      this.modeloUsuarioPersonaStore = item;
    },

    // ###################
    // #  TIENDA DE VUE  #
    // ###################
    //...mapMutations("moduloUsuarioPersona", ["vaciarModeloUsuarioPersona"]),          // Vacia el modelo UsuarioPersona
    ...mapMutations("moduloUsuarioPersona", ["establecerListaCiudadStore"]),
    ...mapMutations("moduloUsuarioPersona", ["vaciarModeloUsuarioPersona"]), // Vacia el modelo modeloUsuarioPersonaStore
  },

  mixins: [autenticacionMixin, myMixin],
};
</script>
