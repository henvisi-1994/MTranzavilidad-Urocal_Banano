<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo usuario -->
    <DialogNuevoIngresoInsumo ref="DialogNuevoIngresoInsumo"></DialogNuevoIngresoInsumo>

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
              v-model="buscarIngresoInsumo"
              append-icon="mdi-magnify"
              label="Buscar"
              dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-data-table
          :headers="cabeceraTablaIngresoInsumo"
          :items="listaIngresoInsumoStore"
          :search="buscarIngresoInsumo"
          sort-by="id_lote"
          :height="tablaResponsiva()"
          class="elevation-1"
        >
          <template v-slot:top>
            <DialogEditarIngresoInsumo
              ref="DialogEditarIngresoInsumo"
            ></DialogEditarIngresoInsumo>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="cargarDialogEditarIngresoInsumo(item)"
              >mdi-eye</v-icon
            >
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          large
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          color="primary"
          @click="cargarDialogNuevoIngresoInsumo()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from "vuex"; // Trabajar con la tienda de Vue (Store)
import DialogNuevoIngresoInsumo from "../components/DialogNuevoIngresoInsumo"; // Dialogo para agregar usuario
import DialogEditarIngresoInsumo from "../components/DialogEditarIngresoInsumo"; // Dialogo para editar usuario
import ServicioIngresoInsumo from "../services/ServicioIngresoInsumo"; // Interactuar con el Backend
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseIngresoInsumo",

  components: {
    DialogNuevoIngresoInsumo,
    DialogEditarIngresoInsumo,
  },

  created() {
    this.$store.commit("colocarLayout", "LayoutCentroAcopio");
  },

  mounted() {
    this.cargarListaIngresoInsumo();
    //  this.cargarInsumoAcopios();
    this.cargarListaFinca();
  },

  data() {
    return {
      nombre: "Gestión de Ingreso Insumo",
      buscarIngresoInsumo: "", // Guarda el texto de búsqueda
      cabeceraTablaIngresoInsumo: [
        // Detalla las cabeceras de la tabla
        {
          text: "Centro de Acopio",
          value: "centroacopioid",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha del ingreso",
          value: "inginsfechaingreso",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Producto utilizado",
          value: "inginsproducto",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Factura",
          value: "inginsfactura",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Proveedor",
          value: "inginsproveedor",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Cantidad de ingresos",
          value: "inginscantidadingreso",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Unidad",
          value: "inginsunidad",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Saldo",
          value: "inginssaldo",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Encargado",
          value: "inginsencargado",
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

      listaIngresoInsumo: [], // Almacena una lista de IngresoInsumo con llave foranea ingresoinsumoid, la misma se muestra en tabla
      listaCentroAcopios: [{ centroacopioind: "1", centroacopionombre: "centro1" }],
    };
  },

  computed: {
    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    listaIngresoInsumoStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloIngresoInsumo/listaIngresoInsumoStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloIngresoInsumo/establecerListaIngresoInsumoStore",
          v
        );
      },
    },

    listaCentroAcopiosx: {
      get() {
        return this.$store.getters["moduloIngresoInsumo/listaCentroAcopios"];
      },
      set(v) {
        return this.$store.commit("moduloIngresoInsumo/establecerListaCentroAcopios", v);
      },
    },
    listaFincaStore: {
      get() {
        return this.$store.getters["moduloIngresoInsumo/listaFincaStore"];
      },
      set(v) {
        return this.$store.commit("moduloIngresoInsumo/establecerListaFincaStore", v);
      },
    },
    // ##############
    // #  DIALOGOS  #
    // ##############
    dialogNuevoIngresoInsumo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoIngresoInsumo"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoIngresoInsumo", v);
      },
    },

    dialogEditarIngresoInsumo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogEditarIngresoInsumo"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogEditarIngresoInsumo", v);
      },
    },

    // #############
    // #  MODELOS  #
    // #############
    modeloIngresoInsumoStore: {
      get() {
        return this.$store.getters["moduloIngresoInsumo/modeloIngresoInsumoStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloIngresoInsumo/establecerModeloIngresoInsumoStore",
          v
        );
      },
    },
  },

  methods: {
    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    async cargarListaIngresoInsumo() {
      let listaIngresoInsumo = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioIngresoInsumo.obtenerTodosIngresoInsumo(); // Obtener respuesta de backend
      let datosUsuario = await respuesta.data; // Rescatar datos de la respuesta
      datosUsuario.forEach((ingresoinsumo) => {
        // Guardar cada registro en la 'lista de datos'
        listaIngresoInsumo.push(ingresoinsumo);
      });
      this.listaIngresoInsumoStore = listaIngresoInsumo;
      //console.log(this.listaIngresoInsumoStore);
    },

    async cargarInsumoAcopios() {
      let listaInsumo = [];
      console.log("datainsumo> buscando"); // Rescatar datos de la respuesta

      let respuesta = await ServicioIngresoInsumo.obtenerTodosAcopio(); // Obtener respuesta de backend
      console.log("datainsumo> ", respuesta); // Rescatar datos de la respuesta

      let datosInsumo = await respuesta.data;
      datosInsumo.forEach((Insumo) => {
        // Guardar cada registro en la 'lista de datos'
        listaInsumo.push(Insumo);
      });
      this.listaCentroAcopios = listaInsumo;
      //console.log(this.listaCentroAcopios);
    },
    async cargarListaFinca() {
      let listaFinca = [];
      console.log("datafinca> buscando"); // Rescatar datos de la respuesta
      let respuesta = await ServicioIngresoInsumo.obtenerTodosFinca(); // Obtener respuesta de backend
      console.log("datafinca> ", respuesta); // Rescatar datos de la respuesta
      let datosFinca = await respuesta.data;
      datosFinca.forEach((Finca) => {
        // Guardar cada registro en la 'lista de datos'
        listaFinca.push(Finca);
      });
      this.listaFincaStore = listaFinca;
      //console.log(this.listaCentroAcopios);
    },

    // ##############
    // #  DIALOGOS  #
    // ##############
    cargarDialogNuevoIngresoInsumo() {
      this.dialogNuevoIngresoInsumo = !this.dialogNuevoIngresoInsumo;
      this.vaciarModeloIngresoInsumo();
    },

    cargarDialogEditarIngresoInsumo(item) {
      this.dialogEditarIngresoInsumo = !this.dialogEditarIngresoInsumo;
      this.vaciarModeloIngresoInsumo();
      const indiceEditar = this.listaIngresoInsumoStore.indexOf(item);
      this.modeloIngresoInsumoStore = item;
    },

    // ###################
    // #  TIENDA DE VUE  #
    // ###################
    //...mapMutations("moduloIngresoInsumo", ["vaciarModeloIngresoInsumo"]),          // Vacia el modelo IngresoInsumo
    ...mapMutations("moduloIngresoInsumo", ["establecerListaCentroAcopios"]),
    ...mapMutations("moduloIngresoInsumo", ["establecerListaFincaStore"]),
    ...mapMutations("moduloIngresoInsumo", ["vaciarModeloIngresoInsumo"]), // Vacia el modelo modeloIngresoInsumoStore
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
