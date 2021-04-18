<template>
  <v-container fluid>
    <!-- Dialog para registrar nuevo Certificacion -->
    <DialogNuevaCertificacion
      ref="DialogNuevaCertificacion"
    ></DialogNuevaCertificacion>

    <!-- Tarjeta que contiene la caja de búsqueda, tabla y botón de agregar -->
    <v-card elevation="0" class="mt-5">
      <v-card-title class="py-2">
        <v-row no-gutters justify-md="space-between">
          <v-col cols="12" md="6">
            <div :class="[`text-h4`, `mb-4`]" class="transition-swing primary--text" v-text="nombre"></div>            
          </v-col>
          <v-col cols="12" md="6">
            <!-- Caja de búsqueda -->
            <v-text-field
              v-model="buscarCertificacion"
              append-icon="mdi-magnify"
              label="Buscar" class="custom" filled dense
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra los Certificacion -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaCertificacion"
          sort-by="certificacionid"
          :items="listaCertificacionStore"
          :search="buscarCertificacion"
          class="elevation-1">
          <template v-slot:top>
            <!-- Tabs que muestra la informacion detallada de Certificacion -->
            <DialogMostrarCertificacion
              ref="DialogMostrarCertificacion"
            ></DialogMostrarCertificacion>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarCertificacion(item)">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo Certificacion -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px" large elevation="0"
          color="primary"
          @click="cargarDialogNuevoCertificacion()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";

import DialogNuevaCertificacion from "../components/DialogNuevaCertificacion";
import DialogMostrarCertificacion from "../components/DialogMostrarCertificacion";
import ServicioCertificaciones from '../services/ServicioCertificaciones';
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseCertificacion",

  components: {
    DialogNuevaCertificacion,
    DialogMostrarCertificacion
  },

 mounted() {
    this.cargarListaCertificacion();
 },

  data() {
    return {
      nombre: "Gestión de Certificaciones",
      buscarCertificacion: "", // Guarda el texto de búsqueda
      cabeceraTablaCertificacion: [
        // Detalla las cabeceras de la tabla
        {
          text: "Certificacion",
          value: "certificacionnombre",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Certificacion",
          value: "certificacion",
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

    listaCertificacionStore: {
      get() {
        return this.$store.getters["moduloCertificaciones/listaCertificacionStore"];
      },
      set(v) {
        return this.$store.commit("moduloCertificaciones/establecerListaCertificacionStore", v);
      },
    },
    bloquearCamposFormCertificacion: {
      get() {
        return this.$store.getters[
          "moduloCertificaciones/bloquearCamposFormCertificacion"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloCertificaciones/cambiarBloquearCamposFormCertificacion",
          v
        );
      },
    },
    // Obtiene y modifica el estado de la variable dialogNuevoCertificacion
    dialogoNuevaCertificacion: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoNuevaCertificacion"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogoNuevaCertificacion", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarCertificacion
    dialogoMostrarCertificacion: {
      get() {
        return this.$store.getters["gestionDialogos/dialogoMostrarCertificacion"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogoMostrarCertificacion", v);
      },
    },

    certificacion: {
      get() {
        return this.$store.getters["moduloCertificaciones/certificacion"];
      },
      set(v) {
        return this.$store.commit("moduloCertificaciones/nuevaCertificacion", v);
      },
    },
  },

  methods: {

    // #  MANIPULACIÓN DE DATOS  #
    async cargarListaCertificacion () { 
      let listaCertificacion = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioCertificaciones.obtenerTodosCertificaciones();  // Obtener respuesta de backend
      let datosCertificacion = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosCertificacion.forEach((certificacion) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaCertificacion.push(certificacion);
      });
      this.listaCertificacionStore = listaCertificacion;
    },

    // #  TIENDA DE VUE  #
    // Vacia el modelo Certificacion
    ...mapMutations("moduloCertificaciones", ["vaciarCertificacion"]),

    // Carga el DialogNuevoCertificacion
    cargarDialogNuevoCertificacion() {
      this.dialogoNuevaCertificacion = !this.dialogoNuevaCertificacion; // Abre el dialogNuevoCertificacion
      // this.$refs.DialogNuevoCertificacion.$refs.componentFormCertificacion.$refs.formCertificacion.resetValidation(); // Reinicia las validaciones de formCertificacion
      this.vaciarCertificacion(); // Vacia el modelo Certificacion
    },

    abrirMostrarCertificacion(item) {
      this.dialogoMostrarCertificacion = !this.dialogoMostrarCertificacion;
      this.bloquearCamposFormCertificacion = !this.bloquearCamposFormCertificacion;
      this.vaciarCertificacion(); // Vacia el modelo Certificacion
      this.certificacion = item;
      //console.log(this.modeloCertificacionStore)
    },
  },

  mixins: [autenticacionMixin, myMixin],

  created() {
    this.$store.commit("colocarLayout", "LayoutAdministrador");
  },
};
</script>
