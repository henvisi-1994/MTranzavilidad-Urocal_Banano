<template>
  <div>
    <v-dialog
      v-model="dialogNuevoRevisionHumedad"
      scrollable
      :fullscreen="$vuetify.breakpoint.xs ? true : false"
      max-width="800px"
      transition="dialog-transition"
      persistent
    >
      <v-card tile>
        <!-- Barra de titulo -->
        <v-card-title class="primary--text">
          <h5>NUEVA REVISIÓN DE HUMEDAD</h5>
          <v-spacer></v-spacer>
          <v-btn icon @click="cerrarDialogNuevoRevisionHumedad()">
            <v-icon class="primary--text">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text class="pa-0">
          <!-- Si es version movil -->
          <div v-if="$vuetify.breakpoint.xs">
            <!-- Tabs -->
            <v-tabs v-model="tab" show-arrows center-active fixed-tabs ref="componentTab">
              <v-tab href="#tabRevisionHumedad"> Registro </v-tab>
              <v-tab href="#tabDatatableRevisionHumedad"> Visualización </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item key="tabRevisionHumedad" value="tabRevisionHumedad" eager>
                <v-container class="pb-0">
                  <FormRevisionHumedad
                    ref="componentFormRevisionHumedad"
                  ></FormRevisionHumedad>
                </v-container>
              </v-tab-item>

              <v-tab-item
                key="tabDatatableRevisionHumedad"
                value="tabDatatableRevisionHumedad"
              >
                <DatatableRevisionHumedad
                  @cambiarTab="cambiarTab"
                  class="py-0"
                ></DatatableRevisionHumedad>
              </v-tab-item>
            </v-tabs-items>
            <!-- Fin: Tabs -->
          </div>

          <!-- Caso contrario -->
          <div v-else>
            <v-container class="py-0">
              <FormRevisionHumedad
                ref="componentFormRevisionHumedad"
              ></FormRevisionHumedad>
            </v-container>

            <v-divider></v-divider>

            <v-container class="py-0">
              <DatatableRevisionHumedad></DatatableRevisionHumedad
            ></v-container>
          </div>
        </v-card-text>

        <v-card-actions class="justify-center pb-3">
          <!-- Botón para agregar nueva revisión de humedad -->
          <v-btn
            :block="$vuetify.breakpoint.xs ? true : false"
            width="200px"
            color="primary"
            :hidden="tab == 'tabDatatableRevisionHumedad' ? true : false"
            @click="registrar()"
            >{{ textoBotonRevisionHumedad }}</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormRevisionHumedad from "@/components/FormRevisionHumedad";
import DatatableRevisionHumedad from "@/components/DatatableRevisionHumedad";

import servicioRevisionHumedad from "../services/ServicioRevisionHumedad";

export default {
  name: "DialogNuevoRevisionHumedad",

  components: {
    FormRevisionHumedad,
    DatatableRevisionHumedad,
  },

  data() {
    return {
      tab: null,
    };
  },

  computed: {
    ...mapState("moduloRevisionHumedad", ["formRevisionHumedadValido"]),
    ...mapState("moduloAlmacenamiento", ["almacenamiento"]),

    // Obtiene y modifica el estado de la variable dialogNuevoRevisionHumedad
    dialogNuevoRevisionHumedad: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoRevisionHumedad"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoRevisionHumedad", v);
      },
    },

    // Obtiene y modifica el estado de la variable textoBotonRevisionHumedad
    textoBotonRevisionHumedad: {
      get() {
        return this.$store.getters["moduloRevisionHumedad/textoBotonRevisionHumedad"];
      },
      set(v) {
        return this.$store.commit(
          "moduloRevisionHumedad/cambiarTextoBotonRevisionHumedad",
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
        return this.$store.commit("moduloRevisionHumedad/nuevoRevisionHumedad", v);
      },
    },

    // Obtiene la listaRevisionHumedad
    listaRevisionHumedad: {
      get() {
        return this.$store.getters["moduloRevisionHumedad/listaRevisionHumedad"];
      },
      set(v) {
        return this.$store.commit("moduloRevisionHumedad/asignarListaRevisionHumedad", v);
      },
    },
  },

  methods: {
    ...mapMutations("moduloRevisionHumedad", ["vaciarRevisionHumedad"]),
    ...mapMutations("moduloAlmacenamiento", ["vaciarAlmacenamiento"]),
    // Registro de almacenamiento y pregunta si registra revision de humedad
    async registrar() {
      if (this.textoBotonRevisionHumedad == "Registrar") {
        try {
          let respuestaServicioRevisionHumedad = await servicioRevisionHumedad.crearRevisionHumedad(
            this.revisionHumedad
          );
          this.$toast.success(respuestaServicioRevisionHumedad.data.message);
          this.vaciarRevisionHumedad();
          this.obtenerRevisionHumedadPorAlmacenamiento();
          this.$refs.componentFormRevisionHumedad.$refs.formRevisionHumedad.resetValidation();
        } catch (error) {
          this.$toast.error(error.response.data.message);
        }
      }
      if (this.textoBotonRevisionHumedad == "Actualizar") {
        try {
          let respuestaServicioRevisionHumedad = await servicioRevisionHumedad.actualizarRevisionHumedad(
            this.revisionHumedad
          );
          this.$toast.success(respuestaServicioRevisionHumedad.data.message);
          if (this.$vuetify.breakpoint.xs) this.tab = "tabDatatableRevisionHumedad";
          this.textoBotonRevisionHumedad = "Registrar";
          this.vaciarRevisionHumedad();
          this.obtenerRevisionHumedadPorAlmacenamiento();
          this.$refs.componentFormRevisionHumedad.$refs.formRevisionHumedad.resetValidation();
        } catch (error) {
          this.$toast.error(error.response.data.message);
        }
      }
    },

    // Cierra el dialogNuevoRevisionHumedad
    cerrarDialogNuevoRevisionHumedad() {
      this.dialogNuevoRevisionHumedad = false;
      this.listaRevisionHumedad = [];
      this.vaciarRevisionHumedad();
    },

    validarBoton() {
      return this.formRevisionHumedadValido ? false : true;
    },

    // Recibe el evento cambiarTab de DatatableRevisionHumedad
    cambiarTab() {
      this.tab = "tabRevisionHumedad";
    },

    async obtenerRevisionHumedadPorAlmacenamiento() {
      let respuestaServicioRevisionHumedad = await servicioRevisionHumedad.obtenerRevisionHumedadPorAlmacenamiento(
        this.revisionHumedad.almacenamientoid
      );

      this.listaRevisionHumedad = respuestaServicioRevisionHumedad.data;
    },

    vaciarRevisionHumedad() {
      this.revisionHumedad.revisionhumedadid = "";
      this.revisionHumedad.revisionhumedadid = "";
      this.revisionHumedad.revporcentajehumedad = "";
      this.revisionHumedad.revfechaingresosecadora = "";
      this.revisionHumedad.revhoraingresosecadora = "";
      this.revisionHumedad.revfechasalidasecadora = "";
      this.revisionHumedad.revhorasalidasecadora = "";
    },
  },

  watch: {
    // Cada vez que se abre el dialog, se resetean las validaciones del formulario
    dialogNuevoRevisionHumedad() {
      if (this.dialogNuevoRevisionHumedad) {
        setTimeout(() => {
          this.$refs.componentFormRevisionHumedad.$refs.formRevisionHumedad.resetValidation();
          this.revisionHumedad.almacenamientoid = this.almacenamiento.almacenamientoid;
          this.obtenerRevisionHumedadPorAlmacenamiento();
        }, 100);
      }
    },
  },
};
</script>
