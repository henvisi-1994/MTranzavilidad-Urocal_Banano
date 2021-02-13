<template>
  <div>
    <!-- DialogCambioPassword -->
    <DialogCambioPassword></DialogCambioPassword>

    <v-app-bar app color="primary" class="white--text" elevation="2">
      <!-- Presenta icono hamburguesa si es movil -->
      <v-app-bar-nav-icon
        color="white"
        v-if="this.$vuetify.breakpoint.xs"
        @click.stop="barraLateral = !barraLateral"
      ></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <!-- Logo -->
      <v-avatar size="40" tile class="mr-3">
        <!--img alt="Vue logo" src="https://i.pinimg.com/originals/57/43/47/574347ddf6be999e0027de121104f2ff.png"/-->

      </v-avatar>

      <!-- Nombre de usuario -->
      <!--h4 class="mr-2">{{ nombreCompleto }}</h4-->

      <!-- Menú de opciones -->
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon small v-bind="attrs" v-on="on">
            <v-icon color="white">mdi-dots-vertical</v-icon>
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
        nombre: "Bruno",
        apellido: "Díaz",
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
