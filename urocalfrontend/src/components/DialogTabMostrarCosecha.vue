<template>
  <v-dialog
    v-model="dialogTabsMostrarCosecha"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0" height="530px">
      <!-- Barra de titulo -->
      <v-card-title class="white primary--text">
        <h5>Actualizar/eliminar</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="primary--text">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="primary--text">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="primary--text" @click="closeDialogTabsMostrarCosecha()"
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
          <v-tab href="#formCosecha"> Cosecha </v-tab>
          <v-tab href="#formTratamiento"> Tratamiento </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item key="formCosecha" value="formCosecha" eager>
            <v-card flat>
              <v-card-text>
                <FormCosecha ref="componentFormCosecha"></FormCosecha>
              </v-card-text>
            </v-card>
          </v-tab-item>

          <v-tab-item key="formTratamiento" value="formTratamiento">
            <v-card flat>
              <v-card-text>
                <FormTratamiento></FormTratamiento>
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

import FormCosecha from "@/components/FormCosecha";
import FormTratamiento from "@/components/FormTratamiento";

export default {
  name: "TabsMostrarCosecha",

  components: {
    FormCosecha,
    FormTratamiento,
  },

  data() {
    return {
      tab: "formCosecha",
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogTabMostrarLote
    dialogTabsMostrarCosecha: {
      get() {
        return this.$store.getters["gestionDialogos/dialogTabsMostrarcosecha"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit(
          "gestionDialogos/toggleDialogTabsMostrarCosecha",
          v
        );
      },
    },
  },

  methods: {
    // Vacia el modelo lot
    ...mapMutations("moduloCosecha", ["vaciarCosecha"]),

    // Vacia el modelo environment
    ...mapMutations("moduloTratamiento", ["vaciarTratamiento"]),

    // Vacia la lista de IDs de productos
    //...mapMutations("moduloProducto", ["vaciarlistaIDsProductos"]),

    // Vacia el modelo soil
    //...mapMutations("moduloSuelo", ["vaciarSuelo"]),

    closeDialogTabsMostrarCosecha() {
      this.dialogTabsMostrarCosecha = !this.dialogTabsMostrarCosecha; // Cierra el DialogTabsMostrarLote
      this.$refs.componentFormCosecha.$refs.formCosecha.resetValidation(); // Reinicia las validaciones del formLote
      this.$refs.componentFormTratamiento.$refs.formTratamiento.resetValidation(); // Reinicia las validaciones del formMedioAmbiente
      this.vaciarCosecha(); // Vacia el modelo Lote
      this.vaciarTratamiento(); // Vacia el modelo MedioAmbiente
      //this.vaciarlistaIDsProductos(); // Vacia la listaIDsProductos
      //this.vaciarSuelo(); // Vacia el modelo Suelo
    },
  },
};
</script>
