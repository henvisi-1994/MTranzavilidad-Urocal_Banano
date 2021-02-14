<template>
  <v-container fluid :class="$vuetify.breakpoint.xs ? 'pa-0' : 'py-0'">
    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0">
      <v-card-title class="py-2 mt-5">
        <v-row no-gutters>
          <v-col cols="12">
            <!-- Caja de búsqueda -->
            <v-text-field
              v-model="buscarDetalleCompra"
              append-icon="mdi-magnify"
              label="Buscar"
              class="custom" dense filled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra lista de DetalleCompra -->
        <v-data-table
          :headers="cabeceraTablaDetalleCompra"
          sort-by="id_farm"
          :items="listaDetalleCompra"
          :footer-props="{
            'items-per-page-options': [2, 4, 6, 8, 10],
          }"
          :items-per-page="2"
          :search="buscarDetalleCompra"
          class="elevation-1"
        >
          <template v-slot:top>
            <!-- Tabs que muestra la informacion detallada de cada RevisionHumedad -->
            <DialogMostrarDetalleCompra></DialogMostrarDetalleCompra>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirDialogMostrarDetalleCompra(item)">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import DialogMostrarDetalleCompra from "@/components/DialogMostrarDetalleCompra";
import servicioDetalleCompra from "../services/ServicioDetalleCompra";

export default {
  name: "DatatableDetalleCompra",

  components: {
    DialogMostrarDetalleCompra,
  },

  data() {
    return {
      buscarDetalleCompra: "", // Guarda el texto de búsqueda

      // Detalla las cabeceras de la tabla
      cabeceraTablaDetalleCompra: [
        {
          text: "Artículo",
          value: "detarticulo",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Precio",
          value: "detpreciototal",
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
    // Obtiene y modifica el estado de la variable dialogMostrarDetalleCompra
    dialogMostrarDetalleCompra: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarDetalleCompra"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogMostrarDetalleCompra", v);
      },
    },

    // Obtiene ymodifica el modelo detCompra
    detCompra: {
      get() {
        return this.$store.getters["moduloDetalleCompra/detCompra"];
      },
      set(v) {
        return this.$store.commit("moduloDetalleCompra/nuevoDetalleCompra", v);
      },
    },

    // Obtiene y modifica la variable fermentacion
    fermentacion: {
      get() {
        return this.$store.getters["moduloDetalleCompra/fermentacion"];
      },
      set(v) {
        return this.$store.commit("moduloDetalleCompra/asignarFermentacion", v);
      },
    },

    ...mapState("moduloDetalleCompra", ["listaDetalleCompra"]),
  },

  methods: {
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

    // Carga la información en el formulario DetalleCompra
    async abrirDialogMostrarDetalleCompra(detalleCompra) {
      this.fermentacion = [];
      // Cuando edita mientras registra
      if (detalleCompra.hasOwnProperty("idAuxiliar")) {
        let detalleCompraCache = this.listaDetalleCompra[detalleCompra.idAuxiliar];
        // Conversion de datos a sus ids para los select
        this.establecerFermentacionID(detalleCompraCache);
        detalleCompraCache.detestado = this.establecerEstadoID(detalleCompraCache);
        this.detCompra = detalleCompraCache;
        this.dialogMostrarDetalleCompra = true;
      } else {
        // Cuando edita mientras edita una compra ya registrada
        try {
          let respuestaServicioDetalleCompra = await servicioDetalleCompra.obtenerDatosDetalleCompra(
            detalleCompra.detallecompraid
          );
          // Conversion de datos a sus ids para los select
          this.establecerFermentacionID(respuestaServicioDetalleCompra.data);
          respuestaServicioDetalleCompra.data.detestado = this.establecerEstadoID(
            respuestaServicioDetalleCompra.data
          );

          this.detCompra = respuestaServicioDetalleCompra.data;
        } catch (error) {
          this.$toast.error(error.response.data.message);
        }
        this.dialogMostrarDetalleCompra = true;
      }
    },

    establecerFermentacionID(detalleCompra) {
      if (detalleCompra.detmoho) this.fermentacion.push("1");
      if (detalleCompra.detpizarra) this.fermentacion.push("2");
      if (detalleCompra.detvioleta) this.fermentacion.push("3");
      if (detalleCompra.detsemivioleta) this.fermentacion.push("4");
      if (detalleCompra.detoptimio) this.fermentacion.push("5");
    },

    establecerEstadoID(detalleCompra) {
      if (detalleCompra.detestado === "Seco") return "1";
      if (detalleCompra.detestado === "En baba") return "2";
    },
  },
};
</script>
