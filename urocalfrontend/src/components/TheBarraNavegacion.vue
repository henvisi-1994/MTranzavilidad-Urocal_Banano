<template>
  <div>
    <!-- DialogCambioPassword -->
    <DialogCambioPassword></DialogCambioPassword>

    <v-app-bar app dark color="primary" elevation="0">
      <!-- Presenta icono hamburguesa si es movil -->
      <v-app-bar-nav-icon
        v-if="this.$vuetify.breakpoint.xs"
        @click.stop="barraLateral = !barraLateral"
      ></v-app-bar-nav-icon>

      <!-- Logo -->
      <v-avatar size="40" tile class="mr-3">
        <img
          alt="Vue logo"
          src="https://cecjecuador.org.ec/wp-content/uploads/2020/02/urocal.jpg"
        />
      </v-avatar>
      <v-spacer></v-spacer>

      <!-- Nombre de usuario -->
      <span class="overline mr-2">{{ nombreCompleto }}</span>

      <!-- Menú de opciones -->
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Perfil</v-list-item-title>
          </v-list-item>
          <v-list-item @click="dialogCambioPassword = !dialogCambioPassword">
            <v-list-item-title>Cambiar contraseña</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import DialogCambioPassword from "./DialogCambioPassword";

export default {
  name: "BarraNavegacion",

  components: {
    DialogCambioPassword,
  },

  data() {
    return {
      usuario: {
        nombre: "Nombre",
        apellido: "usuario",
      },
    };
  },

  computed: {
    // Concatena el nombre y apellido del usuario
    nombreCompleto() {
      return `${this.usuario.nombre} ${this.usuario.apellido}`;
    },

    // Obtiene el valor de barraLateral o establece un nuevo valor a barraLateral
    barraLateral: {
      get() {
        return this.$store.getters.barraLateral;
      },
      set(v) {
        return this.$store.commit("toggleBarraLateral", v);
      },
    },

    // Obtiene el valor de barraLateral o establece un nuevo valor a miniBarraLateral
    miniBarraLateral: {
      get() {
        return this.$store.getters.miniBarraLateral;
      },
      set(v) {
        return this.$store.commit("toggleMiniBarraLateral", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogCambioPassword
    dialogCambioPassword: {
      get() {
        return this.$store.getters["gestionDialogos/dialogCambioPassword"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogCambioPassword", v);
      },
    },
  },
};
</script>

<style></style>
