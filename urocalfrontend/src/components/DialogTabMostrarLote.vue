<template>
  <v-dialog
    v-model="dialogTabsMostrarLote"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0" height="530px">
      <!-- Barra de titulo -->
      <v-card-title class="primary white--text">
        <h5>Actualizar/eliminar</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="white--text">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="white--text" @click="closeDialogTabsMostrarLote()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <!-- Tabs -->
        <v-tabs
          v-model="tab"
          background-color="primary"
          show-arrows
          center-active
          fixed-tabs
          ref="componentTab"
        >
          <v-tab href="#formLote"> Lote </v-tab>
          <v-tab href="#formCultivo"> Cultivo </v-tab>
          <v-tab href="#formMedioAmbiente"> Medio ambiente </v-tab>
          <v-tab href="#formSuelo"> Suelo </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item key="formLote" value="formLote" eager>
            <v-card flat>
              <v-card-text>
                <FormLote ref="componentFormLote"></FormLote>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item key="formCultivo" value="formCultivo">
            <v-card flat>
              <v-card-text>
                <FormCultivo></FormCultivo>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item key="formMedioAmbiente" value="formMedioAmbiente" eager>
            <v-card flat>
              <v-card-text>
                <FormMedioAmbiente ref="componentFormMedioAmbiente"></FormMedioAmbiente>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item key="formSuelo" value="formSuelo" eager>
            <v-card flat>
              <v-card-text>
                <FormSuelo ref="componentFormSuelo"></FormSuelo>
              </v-card-text>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
        <!-- Fin: Tabs -->
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormLote from "@/components/FormLote";
import FormCultivo from "@/components/FormCultivo";
import FormMedioAmbiente from "@/components/FormMedioAmbiente";
import FormSuelo from "@/components/FormSuelo";

export default {
  name: "TabsMostrarLote",

  components: {
    FormLote,
    FormCultivo,
    FormMedioAmbiente,
    FormSuelo,
  },

  data() {
    return {
      tab: "formLote",
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogTabMostrarLote
    dialogTabsMostrarLote: {
      get() {
        return this.$store.getters["gestionDialogos/dialogTabsMostrarLote"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogTabsMostrarLote", v);
      },
    },
  },

  methods: {
    // Vacia el modelo lot
    ...mapMutations("moduloLote", ["vaciarLote"]),

    // Vacia el modelo environment
    ...mapMutations("moduloMedioAmbiente", ["vaciarMedioAmbiente"]),

    // Vacia la lista de IDs de productos
    ...mapMutations("moduloProducto", ["vaciarlistaIDsProductos"]),

    // Vacia el modelo soil
    ...mapMutations("moduloSuelo", ["vaciarSuelo"]),

    closeDialogTabsMostrarLote() {
      this.dialogTabsMostrarLote = !this.dialogTabsMostrarLote; // Cierra el DialogTabsMostrarLote
      this.$refs.componentFormLote.$refs.formLote.resetValidation(); // Reinicia las validaciones del formLote
      this.$refs.componentFormMedioAmbiente.$refs.formMedioAmbiente.resetValidation(); // Reinicia las validaciones del formMedioAmbiente
      this.$refs.componentFormSuelo.$refs.formSuelo.resetValidation(); // Reinicia las validaciones del formSuelo
      this.vaciarLote(); // Vacia el modelo Lote
      this.vaciarMedioAmbiente(); // Vacia el modelo MedioAmbiente
      this.vaciarlistaIDsProductos(); // Vacia la listaIDsProductos
      this.vaciarSuelo(); // Vacia el modelo Suelo
    },
  },
};
</script>
