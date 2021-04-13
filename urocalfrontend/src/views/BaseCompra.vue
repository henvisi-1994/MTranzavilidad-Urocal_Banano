<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo Compra -->
    <DialogNuevoCompra ref="DialogNuevoCompra"></DialogNuevoCompra>

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
              v-model="buscarCompra"
              class="custom"
              dense
              filled
              append-icon="mdi-magnify"
              label="Buscar"
              hide-details="false"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra lista de compras -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaCompra"
          sort-by="id_farm"
          :items="listaCompra"
          :search="buscarCompra"
          class="elevation-1"
        >
          <template v-slot:top>
            <!-- Tabs que muestra la informacion detallada de cada compra -->
            <DialogMostrarCompra
              ref="DialogMostrarCompra"
            ></DialogMostrarCompra>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarCompra(item.compraid)">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nueva compra -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px"
          large
          elevation="0"
          color="primary"
          @click="abrirDialogCompraNuevo()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapState, mapMutations } from "vuex";

import DialogNuevoCompra from "@/components/DialogNuevoCompra";
import DialogMostrarCompra from "@/components/DialogMostrarCompra";
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

import servicioGuiaRemision from "../services/ServicioGuiaRemision";
import servicioCompra from "../services/ServicioCompra";
import servicioDetalleCompra from "../services/ServicioDetalleCompra";

export default {
  name: "BaseCompra",

  components: {
    DialogNuevoCompra,
    DialogMostrarCompra,
  },

  data() {
    return {
      nombre: "Gestión de Compras",
      buscarCompra: "", // Guarda el texto de búsqueda

      // Detalla las cabeceras de la tabla
      cabeceraTablaCompra: [
        {
          text: "Número",
          value: "comnumero",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha de emisión",
          value: "comfechaemision",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Subtotal",
          value: "comsubtotal",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Descuentos",
          value: "comdescuentos",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Otros valores",
          value: "comotrosvalores",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Total",
          value: "comtotal",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Más detalles",
          value: "actions",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
      ],
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoCompra
    dialogNuevoCompra: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoCompra"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoCompra", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarCompra
    dialogMostrarCompra: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarCompra"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit(
          "gestionDialogos/toggleDialogMostrarCompra",
          v
        );
      },
    },

    // Obtiene y modifica la variable listaCompra
    listaCompra: {
      get() {
        return this.$store.getters["moduloCompra/listaCompra"];
      },
      set(v) {
        return this.$store.commit("moduloCompra/asignarListaCompra", v);
      },
    },
    listaGuiaRemisionStore: {
      get() {
        return this.$store.getters["moduloCompra/listaGuiaRemisionStore"];
      },
      set(v) {
        return this.$store.commit("moduloCompra/asignarListaGuiaRemision", v);
      },
    },

    // Obtiene y modifica el modelo compra
    compra: {
      get() {
        return this.$store.getters["moduloCompra/compra"];
      },
      set(v) {
        return this.$store.commit("moduloCompra/nuevoCompra", v);
      },
    },

    // Obtiene la listaDetalleCompra
    ...mapState("moduloDetalleCompra", ["listaDetalleCompra"]),
  },

  methods: {
    // Vacia el ModeloCompra
    ...mapMutations("moduloCompra", ["vaciarCompra"]),

    // Obtiene el metodo para vaciarListaDetalleCompra
    ...mapMutations("moduloDetalleCompra", [
      "vaciarListaDetalleCompra",
      "asignarListaDetalleCompra",
    ]),

    // Carga el DialogNuevoCompra
    abrirDialogCompraNuevo() {
      this.dialogNuevoCompra = true;
      this.vaciarCompra();
      this.vaciarListaDetalleCompra();
    },

    // Abre el dialogMostrarCompra
    async abrirMostrarCompra(compraid) {
      try {
        let respuestaServicioCompra = await servicioCompra.obtenerCompra(
          compraid
        );
        console.log(respuestaServicioCompra);
        this.compra = respuestaServicioCompra.data;
        this.obtenerDetalleCompra(compraid);
      } catch (error) {
        this.$store.error(error.response.data.message);
      }
      this.dialogMostrarCompra = true;
    },

    // Llena la listaCompra con datos del servidor backend
    async obtenerTodosCompra() {
      let resultado = await servicioCompra.obtenerTodosCompra();
      this.listaCompra = resultado.data;
    },
    getGuiaRemision() {
      servicioGuiaRemision.obtenerTodosGuiaRemision().then((res) => {
        let guia = res.data.filter(
          (guiaRemision) => guiaRemision.vehiculoid == this.compra.vehiculoid
        );
        this.listaGuiaRemision = guia;
      });
    },
    async obtenerDetalleCompra(compraid) {
      let respuestaServicioDetalleCompra = await servicioDetalleCompra.obtenerDetalleCompra(
        compraid
      );
      respuestaServicioDetalleCompra.data.forEach((detalle) => {
        detalle.detarticulo = `Cacao _______ ${detalle.detestado}`;
      });
      this.asignarListaDetalleCompra(respuestaServicioDetalleCompra.data);
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

  mounted() {
    this.obtenerTodosCompra();
  },
};
</script>
