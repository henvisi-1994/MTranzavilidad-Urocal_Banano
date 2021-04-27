<template>
  <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
  <v-card elevation="0">
    <v-card-title :class="!$vuetify.breakpoint.xs ? 'pa-2' : ''">
      <v-row no-gutters class="py-2 mt-2">
        <v-col cols="12" md="6">
          <!-- Caja de búsqueda -->
          <v-text-field
            v-model="buscarRevisionHumedad"
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

    <v-card-text :class="!$vuetify.breakpoint.xs ? 'px-2' : ''">
      <!-- Tabla que muestra lista de RevisionHumedad -->
      <v-data-table
        :headers="cabeceraTablaRevisionHumedad"
        sort-by="id_farm"
        :items="listaRevisionHumedad"
        :footer-props="{
          'items-per-page-options': [3, 6, 9, 12, 15],
        }"
        :items-per-page="3"
        :search="buscarRevisionHumedad"
        class="elevation-1"
        dense
      >
        <!--<template v-slot:top>
             Tabs que muestra la informacion detallada de cada RevisionHumedad             
          </template>-->

        <template v-slot:item.actions="{ item }">
          <v-icon
            color="info"
            :disabled="bloquearCamposFormRevisionHumedad"
            @click="cargarRevisionHumedadEditar(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            color="error"
            :disabled="bloquearCamposFormRevisionHumedad"
            @click="eliminarRevisionHumedadEditar(item)"
          >
            mdi-trash-can
          </v-icon>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

import servicioRevisionHumedad from "../services/ServicioRevisionHumedad";

export default {
  name: "DatatableRevisionHumedad",

  components: {},

  data() {
    return {
      buscarRevisionHumedad: "", // Guarda el texto de búsqueda

      // Detalla las cabeceras de la tabla
      cabeceraTablaRevisionHumedad: [
        {
          text: "Porcentaje de humedad",
          value: "revporcentajehumedad",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
          width: "1%",
        },
        {
          text: "Fecha ingreso secadora",
          value: "revfechaingresosecadora",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
          width: "1%",
        },
        {
          text: "Hora ingreso secadora",
          value: "revhoraingresosecadora",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
          width: "1%",
        },
        {
          text: "Fecha salida bodega",
          value: "revfechasalidasecadora",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
          width: "1%",
        },
        {
          text: "Hora salida secadora",
          value: "revhorasalidasecadora",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
          width: "1%",
        },
        {
          text: "Detalles",
          value: "actions",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
          width: "1%",
        },
      ],
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable textoBotonRevisionHumedad
    textoBotonRevisionHumedad: {
      get() {
        return this.$store.getters[
          "moduloRevisionHumedad/textoBotonRevisionHumedad"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloRevisionHumedad/cambiarTextoBotonRevisionHumedad",
          v
        );
      },
    },
    bloquearCamposFormRevisionHumedad: {
      get() {
        return this.$store.getters[
          "moduloRevisionHumedad/bloquearCamposFormRevisionHumedad"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloRevisionHumedad/cambiarBloquearCamposFormRevisionHumedad",
          v
        );
      },
    },

    // Obtiene el modelo revisionHumedad
    revisionHumedad: {
      get() {
        return this.$store.getters["moduloRevisionHumedad/revisionHumedad"];
      },
      set(v) {
        return this.$store.commit(
          "moduloRevisionHumedad/nuevoRevisionHumedad",
          v
        );
      },
    },

    // Obtiene la listaRevisionHumedad
    listaRevisionHumedad: {
      get() {
        return this.$store.getters[
          "moduloRevisionHumedad/listaRevisionHumedad"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloRevisionHumedad/asignarListaRevisionHumedad",
          v
        );
      },
    },
  },

  methods: {
    // Carga la información el el formulario
    cargarRevisionHumedadEditar(revisionHumedad) {
      this.textoBotonRevisionHumedad = "Actualizar"; // Cambia el texto del boton de DialogNuevoRevisionHumedad
      if (this.$vuetify.breakpoint.xs) this.$emit("cambiarTab"); // Emite un evento que cambia el tab de DialogNuevoRevisionHumedad, solo para version movil
      this.revisionHumedad = revisionHumedad;
    },

    async eliminarRevisionHumedadEditar(item) {
      try {
        if (
          item.revisionhumedadid != 0 &&
          typeof item.revisionhumedadid != "undefined"
        ) {
          let respuestaServicioRevisionHumedad = await servicioRevisionHumedad.eliminarRevisionHumedad(
            item.revisionhumedadid
          );
          this.$toast.error(respuestaServicioRevisionHumedad.data.message);
        } else {
          const index = this.listaRevisionHumedad.indexOf(item);
          this.listaRevisionHumedad.splice(index, 1);
        }
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    async obtenerRevisionHumedadPorAlmacenamiento() {
      let respuestaServicioRevisionHumedad = await servicioRevisionHumedad.obtenerRevisionHumedadPorAlmacenamiento(
        this.revisionHumedad.almacenamientoid
      );

      this.listaRevisionHumedad = respuestaServicioRevisionHumedad.data;
    },
  },
};
</script>
