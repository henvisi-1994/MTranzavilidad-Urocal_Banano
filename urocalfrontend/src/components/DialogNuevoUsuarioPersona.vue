<template>
  <v-dialog v-model="dialogNuevoUsuarioPersona" scrollable max-width="500px" transition="dialog-transition" :fullscreen="$vuetify.breakpoint.xs ? true : false">
    <v-card tile>
      <v-card-title class="justify-center primary white--text">
        <v-spacer></v-spacer>
        <h5>Nuevo usuario</h5>
        <v-spacer></v-spacer>
        <v-btn icon><v-icon class="white--text" @click="cerrarDialogo()">mdi-close</v-icon></v-btn>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field label="Cédula/RUC"></v-text-field>
            <v-text-field label="Apellidos"></v-text-field>
            <v-text-field label="Nombres"></v-text-field>
            <v-text-field label="Dirección"></v-text-field>
            <v-text-field label="Teléfono"></v-text-field>
            <v-text-field label="Whatsapp"></v-text-field>
            <v-text-field label="Email"></v-text-field>
            <v-select :items="itemsGenero" label="Género" ></v-select>
            <v-menu v-model="menuMostrarCalendario" transition="scale-transition" offset-y max-width="290px" min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="Fecha de nacimiento" 
                  v-model="usuario_persona.perfechanacimiento" 
                  :rules="[reglas.campoVacio(usuario_persona.perfechanacimiento)]"
                  readonly
                  v-bind="attrs"
                  v-on="on">
                </v-text-field>
              </template>
              <v-date-picker v-model="usuario_persona.perfechanacimiento" @input="menuMostrarCalendario = false" :show-current="fechaActual" locale="es-419" ></v-date-picker>
            </v-menu>
            <v-select :items="itemsCiudades" label="Ciudad de nacimiento" ></v-select>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-col>
        <!--<v-btn color="error" block @click="dialogNuevoUsuarioPersona = !dialogNuevoUsuarioPersona" >Cancelar</v-btn>-->
        <v-btn color="primary" large block class="mt-2">Guardar</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "DialogNuevoUsuarioPersona",

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
    // Según el valor de la variable dialogNuevoUsuarioPersona muestra u oculta el dialogo
    dialogNuevoUsuarioPersona: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoUsuarioPersona"];
      },
      set(v) {
        return this.$store.commit("gestionDialogos/toggleDialogNuevoUsuarioPersona", v);
      },
    },

    ...mapState("moduloUsuarioPersona", ["usuario_persona"]),   // Modulo UsuarioPersona

    ...mapState("validacionForm", ["reglas"]),                  // Reglas de validacion
    
  },

  methods: {
    cerrarDialogo(){
      this.dialogNuevoUsuarioPersona = !this.dialogNuevoUsuarioPersona;
      this.vaciarUsuarioPersona;
    }
  }
};
</script>
