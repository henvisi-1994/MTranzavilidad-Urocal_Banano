<template>
  <v-form ref="formCosecha" v-model="formCosechaValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
            <v-select :items="itemsCultivo" label="Cutivo" ></v-select>
        </v-col>
        <v-col cols="12" md="5">
            <v-menu v-model="menuMostrarCalendario" transition="scale-transition" offset-y max-width="290px" min-width="290px">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field class="custom px-2" dense filled
                  label="Fecha " 
                  readonly
                  v-bind="attrs"
                  v-on="on">
                </v-text-field>
              </template>
              <v-date-picker  @input="menuMostrarCalendario = false" :show-current="fechaActual" locale="es-419" ></v-date-picker>
            </v-menu>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field label="Cantidad" class="custom px-2" dense filled></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-select :items="itemsUnidades" label="Unidad de medida"></v-select>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
            <v-text-field label="Peso Total (Kg)" class="custom px-2" dense filled></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
            <v-textarea label="Observación" class="custom px-2" dense filled></v-textarea>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
             <v-text-field label="Código"></v-text-field>
        </v-col>
        <v-col cols="12" md="5"></v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from "vuex";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "formCosecha",

  components: {
    vSelect,
  },

  data() {
    return {
      menuMostrarCalendario: "",
      fechaActual: new Date().toISOString().substr(0, 10), // Fecha actual
      itemsCultivo: ['Cultivo 1', 'Cultivo 2'],
      itemsUnidades: ['Tachos', 'Quintales'],
    };
  },

  computed: {
    // Obtiene el modelo lot
    ...mapState("moduloCosecha", ["cosecha"]),

    // Obtiene la variable que indica si el formulario es valido
    formCosechaValido: {
      get() {
        return this.$store.getters["moduloCosecha/ormCosechaValido"];
      },
      set(v) {
        return this.$store.commit("moduloCosecha/cambiarEstadoFormCosechaValido", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
