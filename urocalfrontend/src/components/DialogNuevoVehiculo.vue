<template>
  <v-dialog v-model="dialogNuevoVehiculo" scrollable max-width="500px" transition="dialog-transition" :fullscreen="$vuetify.breakpoint.xs ? true : false">
    <v-card tile>
      <v-card-title class="justify-center primary white--text">
        <v-spacer></v-spacer>
        <h5>Nuevo Vehiculo</h5>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon class="white--text" @click="cerrarDialogo()">mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Placa"></v-text-field>
            <v-select :items="itemsMarca" label="Marca" ></v-select>
            <v-text-field label="Descripcion"></v-text-field>
            <v-text-field label="Lona"></v-text-field>
            <v-text-field label="Caseta"></v-text-field>
            <v-text-field label="Puerta"></v-text-field>
            <v-select :items="itemsMarca" label="Marca" ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-col>
        <!--<v-btn color="error" block @click="dialogNuevoVehiculo = !dialogNuevoVehiculo" >Cancelar</v-btn>-->
        <v-btn color="primary" large block class="mt-2">Guardar</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "DialogNuevoVehiculo",

  props: {},

  data() {
    return {
      menuMostrarCalendario: "",
      fechaActual: new Date().toISOString().substr(0, 10), // Fecha actual
      itemsMarca: ['Chevrolet', 'Mazda'],
      itemsFinca: ['Machala', 'Pasaje', 'Santa Rosa'],
    };
  },

  computed: {
    // Según el valor de la variable dialogNuevoVehiculo muestra u oculta el dialogo
    dialogNuevoVehiculo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoVehiculo"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoVehiculo", v);
      },
    },

    ...mapState("moduloVehiculo", ["limpieza_vehiculo"]),   // Modulo Vehiculo

    ...mapState("validacionForm", ["reglas"]),                  // Reglas de validacion
    
  },

  methods: {
    cerrarDialogo(){
      this.dialogNuevoVehiculo = !this.dialogNuevoVehiculo;
      this.vaciarVehiculo;
    }
  }
};
</script>
