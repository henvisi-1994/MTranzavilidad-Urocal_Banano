<template>
  <v-form ref="formPoda" v-model="formPodaValido">
    <v-container>
      <v-row no-gutters justify-md="space-around" :class="$vuetify.breakpoint.xs ? '' : 'mb-5'">
        <v-col cols="12" md="5">
          <v-select
            v-model="poda.fincaid"
            placeholder="Finca"
            class="style-chooser"
            label="fincanombre"
            :reduce="(listaFinca) => listaFinca.fincaid"
            :options="listaFinca"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir una finca</em>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" md="5">
          <v-select
            v-model="poda.loteid"
            placeholder="Lote"
            class="style-chooser"
            label="lotenombre"
            :reduce="(listaLote) => listaLote.loteid"
            :options="listaLote"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir un lote</em>
            </template>
          </v-select>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-select
            v-model="poda.cultivoid"
            placeholder="Cultivo"
            class="style-chooser"
            label="cultivonombre"
            :reduce="(listaCultivo) => listaCultivo.cultivoid"
            :options="listaCultivo"
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
                label="Fecha de poda"
                v-model="poda.podfecha"
                :rules="[reglas.campoVacio(poda.podfecha)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="poda.podfecha"
              @input="menuMostrarCalendario = false"
              :show-current="fechaActual"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-select
            v-model="poda.podtipo"
            placeholder="Tipo de poda"
            class="style-chooser"
            label="podatipo"
            :reduce="(listaTipo) => listaTipo.tipoid"
            :options="listaTipo"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir un tipo de poda</em>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Hectáreas"
            v-model="poda.podhectareas"
            :rules="[reglas.campoVacio(poda.podhectareas)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Cantidad de plantas"
            v-model="poda.podcantidadplantas"
            :rules="[reglas.campoVacio(poda.podcantidadplantas)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Herramienta"
            v-model="poda.podherramienta"
            :rules="[reglas.campoVacio(poda.podherramienta)]"
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
  name: "FormPoda",

  components: {
    vSelect,
  },

  data() {
    return {
      listaFinca: [
        {
          fincaid: 1,
          fincanombre: "Finca 1",
        },
        {
          fincaid: 2,
          fincanombre: "Finca 2",
        },
        {
          fincaid: 3,
          fincanombre: "Finca 3",
        },
      ],
      listaLote: [
        {
          loteid: 1,
          lotenombre: "Lote 1",
        },
        {
          loteid: 2,
          lotenombre: "Lote 2",
        },
        {
          loteid: 3,
          lotenombre: "Lote 3",
        },
      ],
      listaCultivo: [
        {
          cultivoid: 1,
          cultivonombre: "Cultivo 1",
        },
        {
          cultivoid: 2,
          cultivonombre: "Cultivo 2",
        },
        {
          cultivoid: 3,
          cultivonombre: "Cultivo 3",
        },
      ],
      listaTipo: [
        {
          tipoid: 1,
          podatipo: "Tipo 1",
        },
        {
          tipoid: 2,
          podatipo: "Tipo 2",
        },
        {
          tipoid: 3,
          podatipo: "Tipo 3",
        },
      ],
      menuMostrarCalendario: "", // Variable de referencia para el menú de fecha toma muestra
      fechaActual: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  computed: {
    // Obtiene el modelo poda
    ...mapState("moduloPoda", ["poda"]),

    // Obtiene la variable que indica si el formulario es valido
    formPodaValido: {
      get() {
        return this.$store.getters["moduloPoda/formPodaValido"];
      },
      set(v) {
        return this.$store.commit("moduloPoda/cambiarEstadoValidoFormPoda", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
