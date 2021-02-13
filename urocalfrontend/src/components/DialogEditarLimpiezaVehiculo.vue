<template>
  <v-dialog v-model="dialogEditarLimpiezaVehiculo" scrollable max-width="500px" transition="dialog-transition" :fullscreen="$vuetify.breakpoint.xs ? true : false">
    <v-card tile>
      <v-card-title class="justify-center white primary--text">
        
        <h5>Editar Limpieza Vehiculo</h5>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon class="primary--text" @click="cerrarDialogo()">mdi-close</v-icon></v-btn>
      </v-card-title>
      
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Producto utilizado" class="custom px-2" filled dense></v-text-field>
            <v-text-field label="Escobillon" class="custom px-2" filled dense></v-text-field>
            <v-text-field label="Escoba" class="custom px-2" filled dense></v-text-field>
            <v-text-field label="Agua" class="custom px-2" filled dense></v-text-field>
            <v-text-field label="Aspiradora" class="custom px-2" filled dense></v-text-field>
            <v-text-field label="Vehiculoid" class="custom px-2" filled dense></v-text-field>
            <v-menu v-model="menuMostrarCalendario" transition="scale-transition" offset-y max-width="290px" min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="Fecha" 
                  v-model="limpieza_vehiculo.limvehfecha" class="custom px-2" filled dense 
                  :rules="[reglas.campoVacio(limpieza_vehiculo.limvehfecha)]"
                  readonly
                  v-bind="attrs"
                  v-on="on">
                </v-text-field>
              </template>
              <v-date-picker v-model="limpieza_vehiculo.limvehfecha" @input="menuMostrarCalendario = false" :show-current="fechaActual" locale="es-419" ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-col>
        <!--<v-btn color="error" block @click="dialogEditarLimpiezaVehiculo = !dialogEditarLimpiezaVehiculo" >Cancelar</v-btn>-->
        <v-btn color="primary" large block class="mt-2">Guardar</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "DialogEditarLimpiezaVehiculo",

  props: {},

  data() {
    return {
      menuMostrarCalendario: "",
      fechaActual: new Date().toISOString().substr(0, 10), // Fecha actual
      itemsGenero: ['Masculino', 'Femenino'],
      itemsCiudades: ['Machala', 'Pasaje', 'Santa Rosa'],
    };
  },

  computed: {
    // Según el valor de la variable dialogEditarLimpiezaVehiculo muestra u oculta el dialogo
    dialogEditarLimpiezaVehiculo: {
      get() {
        return this.$store.getters["gestionDialogos/dialogEditarLimpiezaVehiculo"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogEditarLimpiezaVehiculo", v);
      },
    },

    ...mapState("moduloLimpiezaVehiculo", ["limpieza_vehiculo"]),   // Modulo LimpiezaVehiculo

    ...mapState("validacionForm", ["reglas"]),                  // Reglas de validacion
    
  },

  methods: {
    cerrarDialogo(){
      this.dialogEditarLimpiezaVehiculo = !this.dialogEditarLimpiezaVehiculo;
      this.vaciarLimpiezaVehiculo;
    }
  }
};
</script>
