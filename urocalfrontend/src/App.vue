<template>
  <v-app>
    <v-main>
      <component :is="layout"></component>
    </v-main>
  </v-app>
</template>

<script>
import LayoutLogin from "./components/layouts/LayoutLogin";
import LayoutProductor from "./components/layouts/LayoutProductor";
import LayoutExportador from "./components/layouts/LayoutExportador";
import LayoutCentroAcopio from "./components/layouts/LayoutCentroAcopio";
import LayoutAdministrador from "./components/layouts/LayoutAdministrador";

import "../public/css/vSelect.css";

import { mapState } from "vuex";

export default {
  name: "App",

  components: {
    LayoutLogin,
    LayoutProductor,
    LayoutExportador,
    LayoutCentroAcopio,
    LayoutAdministrador,
  },

  // Cuando cambie la variable, renderiza la nueva vista
  computed: {
    ...mapState(["layout"]),
  },
};
</script>

<style>
/* Centra vertical y horizontalmente un componente en un v-col */
.center-col-vh {
  display: flex;
  align-items: center;
  justify-content: center;
}

.centrar-vertical {
  margin: auto !important;
}
</style>
