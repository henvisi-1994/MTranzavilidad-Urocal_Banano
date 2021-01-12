<template>
  <div>
    <!-- Barra de navegacion -->
    <BarraNavegacion></BarraNavegacion>

    <!-- Si es movil, presenta barra lateral -->
    <div v-if="this.$vuetify.breakpoint.xs">
      <BarraLateral :opciones="opcionesCentroAcopio"></BarraLateral>
    </div>
    <div v-else>
      <MiniBarraLateral :opciones="opcionesCentroAcopio"></MiniBarraLateral>
    </div>

    <!-- Contenido dinamico -->
    <router-view> </router-view>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BarraNavegacion from "../TheBarraNavegacion"; // Instancia de TheBarraNavegacion
import BarraLateral from "../TheBarraLateral"; // Intancia de TheBarraLateral
import MiniBarraLateral from "../TheMiniBarraLateral"; // Intancia de TheMiniBarraLateral

export default {
  name: "LayoutProductor",

  components: {
    BarraNavegacion,
    BarraLateral,
    MiniBarraLateral,
  },

  computed: {
    // Opciones para la barra lateral (Productor)
    ...mapState("moduloBarraLateralOpciones", ["opcionesCentroAcopio"]),
  },
};
</script>
