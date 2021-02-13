<template>
  <v-form ref="formFertilizante" v-model="formFertilizanteValido">
    <v-container>
      <v-row
        no-gutters
        justify-md="space-around"
        :class="$vuetify.breakpoint.xs ? '' : 'mb-5'"
      >
        <v-col cols="12" md="6">
          <v-select
            v-model="fertilizante.fincaid"
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
        <v-col cols="12" md="6">
          <v-select
            v-model="fertilizante.loteid"
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
        <v-col cols="12" md="6">
          <v-select
            v-model="fertilizante.cultivoid"
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
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled 
            placeholder="Ciclo"
            v-model="fertilizante.ferciclo"
            :rules="[reglas.campoVacio(fertilizante.ferciclo)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-menu
            v-model="menuMostrarCalendario"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field class="custom px-2" filled 
                label="Fecha"
                v-model="fertilizante.ferfecha"
                :rules="[reglas.campoVacio(fertilizante.ferfecha)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="fertilizante.ferfecha"
              @input="menuMostrarCalendario = false"
              :show-current="fechaActual"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled 
            placeholder="Nombre comercial"
            v-model="fertilizante.fernombrecomercial"
            :rules="[reglas.campoVacio(fertilizante.fernombrecomercial)]"
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled 
            placeholder="Elementos"
            v-model="fertilizante.ferelementos"
            :rules="[reglas.campoVacio(fertilizante.ferelementos)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled 
            placeholder="Concentración"
            v-model="fertilizante.ferconcentracion"
            :rules="[reglas.campoVacio(fertilizante.ferconcentracion)]"
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled 
            placeholder="Área aplicada (HA)"
            v-model="fertilizante.ferareaaplicada"
            :rules="[reglas.campoVacio(fertilizante.ferareaaplicada)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled 
            placeholder="Cantidad aplicada"
            v-model="fertilizante.fercantidadaplicada"
            :rules="[reglas.campoVacio(fertilizante.fercantidadaplicada)]"
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled 
            placeholder="Unidad de medida"
            v-model="fertilizante.ferunidadmedida"
            :rules="[reglas.campoVacio(fertilizante.ferunidadmedida)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled 
            placeholder="Equipo de aplicación"
            v-model="fertilizante.ferequipoaplicacion"
            :rules="[reglas.campoVacio(fertilizante.ferequipoaplicacion)]"
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled 
            placeholder="Método de aplicación"
            v-model="fertilizante.fermetodoaplicacion"
            :rules="[reglas.campoVacio(fertilizante.fermetodoaplicacion)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="fertilizante.feroperario"
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
    // Obtiene el modelo poda
    ...mapState("moduloFertilizante", ["fertilizante"]),

    // Obtiene la variable que indica si el formulario es valido
    formFertilizanteValido: {
      get() {
        return this.$store.getters["moduloFertilizante/formFertilizanteValido"];
      },
      set(v) {
        return this.$store.commit(
          "moduloFertilizante/cambiarEstadoValidoFormFertilizante",
          v
        );
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
