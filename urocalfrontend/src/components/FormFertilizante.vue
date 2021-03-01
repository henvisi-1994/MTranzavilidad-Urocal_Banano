<template>
  <v-form ref="formFertilizante" v-model="formFertilizanteValido">
    <v-container>
      <v-row
        no-gutters
        justify-md="space-around"
        :class="$vuetify.breakpoint.xs ? '' : 'mb-5'"
      >
        <v-col cols="12" md="5">
          <v-select
            v-model="modeloFertilizanteStore.fincaid"
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
            v-model="modeloFertilizanteStore.loteid"
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
            v-model="modeloFertilizanteStore.cultivoid"
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
          <v-text-field
            placeholder="Ciclo"
            v-model="modeloFertilizanteStore.ferciclo"
            :rules="[reglas.campoVacio(modeloFertilizanteStore.ferciclo)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
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
                label="Fecha"
                v-model="modeloFertilizanteStore.ferfecha"
                :rules="[reglas.campoVacio(modeloFertilizanteStore.ferfecha)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="modeloFertilizanteStore.ferfecha"
              @input="menuMostrarCalendario = false"
              :show-current="fechaActual"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Nombre comercial"
            v-model="modeloFertilizanteStore.fernombrecomercial"
            :rules="[reglas.campoVacio(modeloFertilizanteStore.fernombrecomercial)]"
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Elementos"
            v-model="modeloFertilizanteStore.ferelementos"
            :rules="[reglas.campoVacio(modeloFertilizanteStore.ferelementos)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Concentración"
            v-model="modeloFertilizanteStore.ferconcentracion"
            :rules="[reglas.campoVacio(modeloFertilizanteStore.ferconcentracion)]"
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Área aplicada (HA)"
            v-model="modeloFertilizanteStore.ferareaaplicada"
            :rules="[reglas.campoVacio(modeloFertilizanteStore.ferareaaplicada)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Cantidad aplicada"
            v-model="modeloFertilizanteStore.fercantidadaplicada"
            :rules="[reglas.campoVacio(modeloFertilizanteStore.fercantidadaplicada)]"
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Unidad de medida"
            v-model="modeloFertilizanteStore.ferunidadmedida"
            :rules="[reglas.campoVacio(modeloFertilizanteStore.ferunidadmedida)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Equipo de aplicación"
            v-model="modeloFertilizanteStore.ferequipoaplicacion"
            :rules="[reglas.campoVacio(modeloFertilizanteStore.ferequipoaplicacion)]"
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Método de aplicación"
            v-model="modeloFertilizanteStore.fermetodoaplicacion"
            :rules="[reglas.campoVacio(modeloFertilizanteStore.fermetodoaplicacion)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-select
            v-model="modeloFertilizanteStore.feroperario"
            placeholder="Operario"
            class="style-chooser"
            label="operarionombre"
            :reduce="(listaOperario) => listaOperario.operarioid"
            :options="listaOperario"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir un operario</em>
            </template>
          </v-select>
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
  name: "FormFertilizante",

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
      listaOperario: [
        {
          operarioid: 1,
          operarionombre: "Operario 1",
        },
        {
          operarioid: 2,
          operarionombre: "Operario 2",
        },
        {
          operarioid: 3,
          operarionombre: "Operario 3",
        },
      ],
      menuMostrarCalendario: "", // Variable de referencia para el menú de fecha toma muestra
      fechaActual: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  computed: {
    ...mapState("moduloFertilizante", ["modeloFertilizanteStore"]),

    // Obtiene la variable que indica si el formulario es valido
    formFertilizanteValido: {
      get() {
        return this.$store.getters["moduloFertilizante/formFertilizanteValido"];
      },
      set(v) {
        return this.$store.commit("moduloFertilizante/cambiarEstadoValidoFormFertilizante", v);
      },
    },

    modeloFertilizanteStore: {
      get() {
        return this.$store.getters["moduloFertilizante/modeloFertilizanteStore"];
      },
      set(v) {
        return this.$store.commit("moduloFertilizante/establecerModeloFertilizanteStore", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
