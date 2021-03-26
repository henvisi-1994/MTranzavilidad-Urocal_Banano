<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo usuario -->
    <DialogNuevoEgresoInsumo ref="DialogNuevoEgresoInsumo"></DialogNuevoEgresoInsumo>

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
              v-model="buscarEgresoInsumo"
              append-icon="mdi-magnify"
              label="Buscar"
              dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-data-table
          :headers="cabeceraTablaEgresoInsumo"
          :items="listaEgresoInsumoStore"
          :search="buscarEgresoInsumo"
          sort-by="id_lote"
          :height="tablaResponsiva()"
          class="elevation-1"
        >
          <template v-slot:top>
            <DialogEditarEgresoInsumo
              ref="DialogEditarEgresoInsumo"
            ></DialogEditarEgresoInsumo>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="cargarDialogEditarEgresoInsumo(item)"
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
          @click="cargarDialogNuevoEgresoInsumo()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from "vuex"; // Trabajar con la tienda de Vue (Store)
import DialogNuevoEgresoInsumo from "../components/DialogNuevoEgresoInsumo"; // Dialogo para agregar usuario
import DialogEditarEgresoInsumo from "../components/DialogEditarEgresoInsumo"; // Dialogo para editar usuario
import ServicioEgresoInsumo from "../services/ServicioEgresoInsumo"; // Interactuar con el Backend
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseEgresoInsumo",

  components: {
    DialogNuevoEgresoInsumo,
    DialogEditarEgresoInsumo,
  },

  mounted() {
    this.cargarListaEgresoInsumo();
    this.cargarListaInsumo();
    this.cargarListaFinca();
  },

  data() {
    return {
      nombre: "Gestión de Egreso Insumo",
      buscarEgresoInsumo: "", // Guarda el texto de búsqueda
      cabeceraTablaEgresoInsumo: [
        // Detalla las cabeceras de la tabla
        {
          text: "Cod. Egreso",
          value: "egresoinsumosid",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Insumo",
          value: "inginsproducto",
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
          text: "Fecha de egreso",
          value: "egrinsfechaegreso",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Control de Egreso",
          value: "egrinsparacontrolar",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Dosis",
          value: "egrinsdosis",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Cantidad entregada",
          value: "egrinscantidadentregada",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Encargado",
          value: "egrencargado",
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
      listaEgresoInsumo: [], // Almacena una lista de EgresoInsumo con llave foranea ingresoinsumoid, la misma se muestra en tabla
    };
  },

  computed: {
    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    listaEgresoInsumoStore: {
      get() {
        return JSON.parse(
          JSON.stringify(this.$store.getters["moduloEgresoInsumo/listaEgresoInsumoStore"])
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloEgresoInsumo/establecerListaEgresoInsumoStore",
          v
        );
      },
    },

    listaInsumoStore: {
      get() {
        return this.$store.getters["moduloEgresoInsumo/listaInsumoStore"];
      },
      set(v) {
        return this.$store.commit("moduloEgresoInsumo/establecerListaInsumoStore", v);
      },
    },
    listaFincaStore: {
      get() {
        return this.$store.getters["moduloEgresoInsumo/listaFincaStore"];
      },
      set(v) {
        return this.$store.commit("moduloEgresoInsumo/establecerListaFincaStore", v);
      },
    },
    // ##############
    // #  DIALOGOS  #
    // ##############
    dialogNuevoEgresoInsumo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoEgresoInsumo"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoEgresoInsumo", v);
      },
    },

    dialogEditarEgresoInsumo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogEditarEgresoInsumo"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogEditarEgresoInsumo", v);
      },
    },

    // #############
    // #  MODELOS  #
    // #############
    modeloEgresoInsumoStore: {
      get() {
        return this.$store.getters["moduloEgresoInsumo/modeloEgresoInsumoStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloEgresoInsumo/establecerModeloEgresoInsumoStore",
          v
        );
      },
    },
  },

  methods: {
    // ###########################
    // #  MANIPULACIÓN DE DATOS  #
    // ###########################
    async cargarListaEgresoInsumo() {
      let listaEgresoInsumo = []; // Limpiar la 'lista de datos'
      let respuesta = await ServicioEgresoInsumo.obtenerTodosEgresoInsumo(); // Obtener respuesta de backend
      let datosUsuario = await respuesta.data; // Rescatar datos de la respuesta
      datosUsuario.forEach((egresoinsumo) => {
        // Guardar cada registro en la 'lista de datos'
        listaEgresoInsumo.push(egresoinsumo);
      });
      this.listaEgresoInsumoStore = listaEgresoInsumo;
      //console.log(this.listaEgresoInsumoStore);
    },

    async cargarListaInsumo() {
      let listaInsumo = [];
      console.log("datainsumo> buscando"); // Rescatar datos de la respuesta

      let respuesta = await ServicioEgresoInsumo.obtenerTodosInsumo(); // Obtener respuesta de backend
      console.log("datainsumo> ", respuesta); // Rescatar datos de la respuesta

      let datosInsumo = await respuesta.data;
      datosInsumo.forEach((Insumo) => {
        // Guardar cada registro en la 'lista de datos'
        listaInsumo.push(Insumo);
      });
      this.listaInsumoStore = listaInsumo;
      //console.log(this.listaInsumoStore);
    },
    async cargarListaFinca() {
      let listaFinca = [];
      console.log("datafinca> buscando"); // Rescatar datos de la respuesta
      let respuesta = await ServicioEgresoInsumo.obtenerTodosFinca(); // Obtener respuesta de backend
      console.log("datafinca> ", respuesta); // Rescatar datos de la respuesta
      let datosFinca = await respuesta.data;
      datosFinca.forEach((Finca) => {
        // Guardar cada registro en la 'lista de datos'
        listaFinca.push(Finca);
      });
      this.listaFincaStore = listaFinca;
      //console.log(this.listaInsumoStore);
    },

    // ##############
    // #  DIALOGOS  #
    // ##############
    cargarDialogNuevoEgresoInsumo() {
      this.dialogNuevoEgresoInsumo = !this.dialogNuevoEgresoInsumo;
      this.vaciarModeloEgresoInsumo();
    },

    cargarDialogEditarEgresoInsumo(item) {
      this.dialogEditarEgresoInsumo = !this.dialogEditarEgresoInsumo;
      this.vaciarModeloEgresoInsumo();
      const indiceEditar = this.listaEgresoInsumoStore.indexOf(item);
      this.modeloEgresoInsumoStore = item;
    },

    /*async baseEditarEgresoInsumo(egresoid) {
      try {
        // Obtener datos de siembra
        let egreso = await ServicioEgresoInsumo.modeloEgresoInsumoStore(egresoid);
        // Se asignan los datos a los modelos
        this.egreso = egreso.data;
      } catch (error) {
        this.$store.error(error.response.data.message);
      }
      this.dialo = true;
      //this.$refs.DialogTabsMostrarLote.$refs.componentTab.callSlider();
    },*/

    // ###################
    // #  TIENDA DE VUE  #
    // ###################
    //...mapMutations("moduloEgresoInsumo", ["vaciarModeloEgresoInsumo"]),          // Vacia el modelo EgresoInsumo
    ...mapMutations("moduloEgresoInsumo", ["establecerListaInsumoStore"]),
    ...mapMutations("moduloEgresoInsumo", ["establecerListaFincaStore"]),
    ...mapMutations("moduloEgresoInsumo", ["vaciarModeloEgresoInsumo"]), // Vacia el modelo modeloEgresoInsumoStore
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
