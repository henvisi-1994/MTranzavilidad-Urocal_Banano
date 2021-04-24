<template>
  <v-dialog
    v-model="dialogMostrarGuiaRemision"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <v-card-title class="white primary--text">
        <h5>Actualizar/eliminar</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon
            class="primary--text"
            @click="editarGuiaRemision = !editarGuiaRemision"
            >mdi-pencil</v-icon
          >
        </v-btn>
        <v-btn icon>
          <v-icon class="primary--text" @click="eliminarGuiaRemision()"
            >mdi-trash-can</v-icon
          >
        </v-btn>
        <v-btn icon @click="cerrarDialogMostrarGuiaRemision()">
          <v-icon class="primary--text">mdi-close</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <FormGuiaRemision ref="componentFormGuiaRemision" />
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          :disabled="editarGuiaRemision"
          color="primary"
          large
          :block="$vuetify.breakpoint.xs ? true : false"
          @click="updateGuiaRemision()"
          width="250px"
        >
          Guardar cambios
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from "vuex";
import FormGuiaRemision from "@/components/FormGuiaRemision";
import ServicioGuiaRemision from "../services/ServicioGuiaRemision";

export default {
  name: "DialogMostrarGuiaRemision",

  components: {
    FormGuiaRemision,
  },

  computed: {
    ...mapState("moduloGuiaRemision", ["editarGuiaRemision"]),

    dialogMostrarGuiaRemision: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarGuiaRemision"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogMostrarGuiaRemision",
          v
        );
      },
    },

    modeloGuiaRemisionStore: {
      get() {
        return this.$store.getters[
          "moduloGuiaRemision/modeloGuiaRemisionStore"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloGuiaRemision/establecerModeloGuiaRemisionStore",
          v
        );
      },
    },

    editarGuiaRemision: {
      get() {
        return this.$store.getters["moduloGuiaRemision/editarGuiaRemision"];
      },
      set(v) {
        return this.$store.commit(
          "moduloGuiaRemision/establecerEditarGuiaRemision",
          v
        );
      },
    },
  },

  methods: {
    async updateGuiaRemision() {
      let respuesta = await ServicioGuiaRemision.actualizarGuiaRemision(
        this.modeloGuiaRemisionStore.guiaremisionid,
        this.modeloGuiaRemisionStore
      );
      this.$toast.success('se ha modificado una guia de remision');
      if (respuesta.status == 200) {
        this.cerrarDialogMostrarGuiaRemision();
        this.cargarListaGuiaRemision();
      }
    },
    async eliminarGuiaRemision() {
    //console.log('eliminar');
      let respuesta = await ServicioGuiaRemision.eliminarGuiaRemision(
        this.modeloGuiaRemisionStore.guiaremisionid
      );
      this.$toast.warning('Se ha eliminado una guia de remision');
      this.cerrarDialogMostrarGuiaRemision();
      this.cargarListaGuiaRemision();
    },
    cerrarDialogMostrarGuiaRemision() {
      this.dialogMostrarGuiaRemision = !this.dialogMostrarGuiaRemision;
    },
    async cargarListaGuiaRemision() {
      let listaGuiaRemision = [];
      let respuesta = await ServicioGuiaRemision.obtenerTodosGuiaRemision();
      let guiasRemision = await respuesta.data;
      this.$store.commit("moduloGuiaRemision/vaciarLista",null);
            guiasRemision.forEach((f) => {
              this.$store.commit("moduloGuiaRemision/updateListaGuiaRemision",f);
            });
    },
  },
};
</script>

<style></style>
