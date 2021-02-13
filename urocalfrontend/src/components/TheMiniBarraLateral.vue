<template>
  <v-navigation-drawer
    v-model="barraLateral"
    app
    floating
    :mini-variant.sync="miniBarraLateral"
    permanent
  >
    <!-- Si es mini -->
    <div v-if="miniBarraLateral">
      <v-list dense color="primary" elevation="2" :height="CabeceraListaResponsiva()">
        <v-list-item>
          <v-list-item-action>
            <v-icon color="white" @click.stop="miniBarraLateral = !miniBarraLateral"
              >mdi-chevron-right</v-icon
            >
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <v-list-item-avatar class="mx-2">
        <v-img
          src="https://cecjecuador.org.ec/wp-content/uploads/2020/02/urocal.jpg"
        ></v-img>
      </v-list-item-avatar>
    </div>

    <!-- Si es normal -->
    <div v-else>
      <v-list dense color="primary" elevation="2" :height="CabeceraListaResponsiva()">
        <v-list-item>
          <v-list-item-action>
            <v-icon @click.stop="miniBarraLateral = !miniBarraLateral" color="white"
              >mdi-chevron-left</v-icon
            >
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>
              <h3 class="white--text">Sistema de trazabilidad</h3>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list-item class="justify-center mt-3" disabled>
        <v-list-item-avatar size="100" class="mx-0 my-5">
          <img
            alt="Vue logo"
            src="https://cecjecuador.org.ec/wp-content/uploads/2020/02/urocal.jpg"
          />
        </v-list-item-avatar>
      </v-list-item>
    </div>

    <!-- Lista de opciones -->
    <v-list dense>
      <!-- Hace un recorrido a la lista de opciones -->
      <div v-for="(opcion, i) in opciones" :key="i">
        <!-- Si no tiene opciones de nivel 1, presenta como item normal -->
        <v-list-item v-if="!opcion.opcionesNivel1" :to="opcion.ruta">
          <v-list-item-icon>
            <v-icon>{{ opcion.icono }}</v-icon>
          </v-list-item-icon>

          <v-list-item-title class="nv-item-title">{{ opcion.texto }}</v-list-item-title>
        </v-list-item>

        <!-- Caso contrario, muestras las opciones de nivel 1 -->
        <v-list-group
          v-else
          :value="false"
          no-action
          :prepend-icon="opcion.icono"
          :key="opcion.texto"
        >
          <template v-slot:activator>
            <v-list-item-title class="nv-item-title">{{
              opcion.texto
            }}</v-list-item-title>
          </template>

          <!-- Recorre las opciones de Nivel 1-->
          <div v-for="(opcionNivel1, x) in opcion.opcionesNivel1" :key="x">
            <!-- Si no tiene opciones de nivel 2, presenta como item normal-->
            <!--<v-tooltip top v-if="!opcionNivel1.opcionesNivel2">
              <template v-slot:activator="{ on, attrs }">
                <v-list-item
                  v-bind="attrs"
                  v-on="on"
                  :to="opcionNivel1.ruta"
                  style="padding-left: 24px"
                >
                  <v-list-item-icon>
                    <v-icon>mdi-menu-right</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title class="nv-item-title">{{
                    opcionNivel1.texto
                  }}</v-list-item-title>
                </v-list-item>
              </template>
              <span>{{ opcionNivel1.texto }}</span>
            </v-tooltip>-->
            <v-list-item
              v-if="!opcionNivel1.opcionesNivel2"
              :to="opcionNivel1.ruta"
              style="padding-left: 24px"
            >
              <v-list-item-icon>
                <v-icon>mdi-menu-right</v-icon>
              </v-list-item-icon>
              <v-list-item-title class="nv-item-title">{{
                opcionNivel1.texto
              }}</v-list-item-title>
            </v-list-item>

            <!-- Presenta opciones de nivel 2 -->
            <v-list-group v-else :value="true" no-action sub-group>
              <template v-slot:activator>
                <v-list-item-title>{{ opcionNivel1.texto }}</v-list-item-title>
              </template>

              <v-list-item
                v-for="(opcionNivel2, i) in opcionNivel1.opcionesNivel2"
                :key="i"
                style="padding-left: 50px"
              >
                <v-list-item-icon>
                  <v-icon>mdi-menu-right</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ opcionNivel2.texto }}</v-list-item-title>
              </v-list-item>
            </v-list-group>
          </div>
        </v-list-group>
      </div>
    </v-list>
    <!-- Fin: Lista de opciones -->

    <!-- Salir -->
    <template v-slot:append>
      <div>
        <v-btn tile block class="py-5" height="60" @click="cerrarSesion">
          {{ miniBarraLateral ? "" : "Salir" }}
          <v-icon :class="miniBarraLateral ? '' : 'ml-2'">mdi-exit-to-app</v-icon>
        </v-btn>
      </div>
    </template>
    <!-- Fin: Salir -->
  </v-navigation-drawer>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "MiniBarraLateral",

  props: {
    // Es obligatorio enviarle las opciones de la barra lateral como Array []
    opciones: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      barraLateral: true, // Mantiene la barra lateral activa
    };
  },

  computed: {
    // Obtiene el valor de barraLateral o establece un nuevo valor a miniBarraLateral
    miniBarraLateral: {
      get() {
        return this.$store.getters.miniBarraLateral;
      },
      set(v) {
        return this.$store.commit("toggleMiniBarraLateral", v);
      },
    },
  },

  methods: {
    CabeceraListaResponsiva() {
      // Ajusta el tamaño de la barra superior de la barra lateral para pantallas pequeñas
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "57px";
        case "sm":
          return "56px";
        default:
          return "auto";
      }
    },

    // Cierra sesion
    cerrarSesion() {
      this.$store.dispatch("moduloAutenticacion/cerrarSesion");
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
.nv-item-title {
  margin-left: -17px !important;
}
</style>
