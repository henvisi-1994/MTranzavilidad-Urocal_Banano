<template>
  <div>
    <!-- Barra de navegacion -->
    <BarraNavegacion></BarraNavegacion>

    <!-- Si es movil, presenta barra lateral -->
    <div v-if="this.$vuetify.breakpoint.xs">
      <BarraLateral :opciones="opcionesExportador"></BarraLateral>
    </div>
    <div v-else>
      <MiniBarraLateral :opciones="opcionesExportador"></MiniBarraLateral>
    </div>

    <!-- Contenido dinamico -->
    <router-view> </router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";

import BarraNavegacion from "../TheBarraNavegacion"; // Instancia de TheBarraNavegacion
import BarraLateral from "../TheBarraLateral"; // Intancia de TheNavigationDrawer
import MiniBarraLateral from "../TheMiniBarraLateral"; // Intancia de TheMiniNavigationDrawer

export default {
  name: "LayoutExportador",

  components: {
    BarraNavegacion,
    BarraLateral,
    MiniBarraLateral,
  },

  computed: {
    // Opciones para la barra lateral (Productor)
    ...mapState("moduloBarraLateralOpciones", ["opcionesExportador"]),
  },
};
</script>
