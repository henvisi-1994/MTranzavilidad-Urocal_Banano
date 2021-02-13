<template>
  <v-form ref="formTratamiento" v-model="formTratamientoValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-menu v-model="menuMostrarCalendarioFif" transition="scale-transition" offset-y max-width="290px" min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="Fecha de inicio de Fermentación " 
                   readonly
                  v-bind="attrs"
                  v-on="on">
                </v-text-field>
              </template>
              <v-date-picker  @input="menuMostrarCalendarioFif = false" :show-current="fechaActual" locale="es-419" ></v-date-picker>
            </v-menu>
        </v-col>
        <v-col cols="12" md="5">
          <v-menu v-model="menuMostrarCalendarioFff" transition="scale-transition" offset-y max-width="290px" min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="Fecha de fin de Fermentación " 
                  readonly
                  v-bind="attrs"
                  v-on="on">
                </v-text-field>
              </template>
              <v-date-picker  @input="menuMostrarCalendarioFff = false" :show-current="fechaActual" locale="es-419" ></v-date-picker>
            </v-menu>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field label="Tipo de Secado"></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-menu v-model="menuMostrarCalendarioFis" transition="scale-transition" offset-y max-width="290px" min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="Fecha de inicio de secado " 
                  readonly
                  v-bind="attrs"
                  v-on="on">
                </v-text-field>
              </template>
              <v-date-picker  @input="menuMostrarCalendarioFis = false" :show-current="fechaActual" locale="es-419" ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-menu v-model="menuMostrarCalendarioFfs" transition="scale-transition" offset-y max-width="290px" min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  label="Fecha de fin de secado " 
                  readonly
                  v-bind="attrs"
                  v-on="on">
                </v-text-field>
              </template>
              <v-date-picker  @input="menuMostrarCalendarioFfs = false" :show-current="fechaActual" locale="es-419" ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field label="Volumen después de secado"></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field label="Conversión"></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-textarea label="Observación"></v-textarea>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field label="Operario"></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from "vuex";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "formTratamiento",

  components: {
    vSelect,
  },

  data() {
    return {
      menuMostrarCalendarioFif: "",
      menuMostrarCalendarioFff: "",
      menuMostrarCalendarioFis: "",
      menuMostrarCalendarioFfs: "",
      fechaActual: new Date().toISOString().substr(0, 10), // Fecha actual
      
    };
  },

  computed: {
    // Obtiene el modelo lot
    ...mapState("moduloTratamiento", ["tratamiento"]),

    // Obtiene la variable que indica si el formulario es valido
    formTratamientoValido: {
      get() {
        return this.$store.getters["moduloTratamiento/formTratamientoValido"];
      },
      set(v) {
        return this.$store.commit("moduloTratamiento/cambiarEstadoFormTratamientoValido", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
