<template>
  <v-form ref="formLimpiezaHerramienta" v-model="formLimpiezaHerramientaValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-select
            v-model="limpiezaHerramienta.cultivoid"
            placeholder="Cultivo"
            class="style-chooser"
            label="nombreCultivo"
            :reduce="(listaCultivos) => listaCultivos.cultivoid"
            :options="listaCultivos"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir un cultivo</em>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" md="5">
          <v-menu
            v-model="menuMostrarCalendario"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="Fecha de limpieza"
                v-model="limpiezaHerramienta.limfecha"
                :rules="[reglas.campoVacio(limpiezaHerramienta.limfecha)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="limpiezaHerramienta.limfecha"
              @input="menuMostrarCalendario = false"
              :show-current="fechaActual"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            label="Producto utilizado"
            v-model="limpiezaHerramienta.limproducto"
            :rules="[reglas.campoVacio(limpiezaHerramienta.limproducto)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Equipos"
            v-model="limpiezaHerramienta.limequipos"
            :rules="[reglas.campoVacio(limpiezaHerramienta.limequipos)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            label="Maquinaria"
            v-model="limpiezaHerramienta.limmaquinaria"
            :rules="[reglas.campoVacio(limpiezaHerramienta.limmaquinaria)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Herramientas"
            v-model="limpiezaHerramienta.limherramientas"
            :rules="[reglas.campoVacio(limpiezaHerramienta.limherramientas)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            label="Cajones"
            v-model="limpiezaHerramienta.limcajones"
            :rules="[reglas.campoVacio(limpiezaHerramienta.limcajones)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Tendales"
            v-model="limpiezaHerramienta.limtendales"
            :rules="[reglas.campoVacio(limpiezaHerramienta.limtendales)]"
          ></v-text-field>
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
  name: "FormLimpiezaHerramienta",

  components: {
    vSelect,
  },

  data() {
    return {
      listaCultivos: [
        {
          cultivoid: 1,
          nombreCultivo: "Cultivo 1",
        },
        {
          cultivoid: 2,
          nombreCultivo: "Cultivo 2",
        },
        {
          cultivoid: 3,
          nombreCultivo: "Cultivo 3",
        },
      ],
      menuMostrarCalendario: "", // Variable de referencia para el menú de fecha toma muestra
      fechaActual: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  computed: {
    // Obtiene el modelo limpiezaHerramienta
    ...mapState("moduloLimpiezaHerramienta", ["limpiezaHerramienta"]),

    // Obtiene la variable que indica si el formulario es valido
    formLimpiezaHerramientaValido: {
      get() {
        return this.$store.getters["moduloLimpiezaHerramienta/formLimpiezaHerramientaValido"];
      },
      set(v) {
        return this.$store.commit("moduloLimpiezaHerramienta/cambiarEstadoValidoFormLimpiezaHerramienta", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
