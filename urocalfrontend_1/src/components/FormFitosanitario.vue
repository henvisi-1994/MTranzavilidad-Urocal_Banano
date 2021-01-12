<template>
  <v-form ref="formFitosanitario" v-model="formFitosanitarioValido">
    <v-container>
      <v-row
        no-gutters
        justify-md="space-around"
        :class="$vuetify.breakpoint.xs ? '' : 'mb-5'"
      >
        <v-col cols="12" md="5">
          <v-select
            v-model="fitosanitario.fincaid"
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
            v-model="fitosanitario.loteid"
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
            v-model="fitosanitario.cultivoid"
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
            v-model="fitosanitario.fitciclo"
            :rules="[reglas.campoVacio(fitosanitario.fitciclo)]"
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
                v-model="fitosanitario.fitfecha"
                :rules="[reglas.campoVacio(fitosanitario.fitfecha)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="fitosanitario.fitfecha"
              @input="menuMostrarCalendario = false"
              :show-current="fechaActual"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Nombre comercial"
            v-model="fitosanitario.fitnombrecomercial"
            :rules="[reglas.campoVacio(fitosanitario.fitnombrecomercial)]"
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Ingrediente activo"
            v-model="fitosanitario.fitingredienteactivo"
            :rules="[reglas.campoVacio(fitosanitario.fitingredienteactivo)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Autorización Técnica"
            v-model="fitosanitario.fitautorizaciontecnica"
            :rules="[reglas.campoVacio(fitosanitario.fitautorizaciontecnica)]"
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Nombre común"
            v-model="fitosanitario.fitnombrecomun"
            :rules="[reglas.campoVacio(fitosanitario.fitnombrecomun)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Dosis"
            v-model="fitosanitario.fitdosis"
            :rules="[reglas.campoVacio(fitosanitario.fitdosis)]"
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Cantidad total (Kg)"
            v-model="fitosanitario.fitcantidadtotal"
            :rules="[reglas.campoVacio(fitosanitario.fitcantidadtotal)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Área aplicada"
            v-model="fitosanitario.fitareaaplicda"
            :rules="[reglas.campoVacio(fitosanitario.fitareaaplicda)]"
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Equipo de aplicación"
            v-model="fitosanitario.fitequipoaplicacion"
            :rules="[reglas.campoVacio(fitosanitario.fitequipoaplicacion)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Método de aplicación"
            v-model="fitosanitario.fitmetodo"
            :rules="[reglas.campoVacio(fitosanitario.fitmetodo)]"
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Plazo de seguridad"
            v-model="fitosanitario.fitplazoseguridad"
            :rules="[reglas.campoVacio(fitosanitario.fitplazoseguridad)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-select
            v-model="fitosanitario.fitoperario"
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
  name: "FormFitosanitario",

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
    // Obtiene el modelo fitosanitario
    ...mapState("moduloFitosanitario", ["fitosanitario"]),

    // Obtiene la variable que indica si el formulario es valido
    formFitosanitarioValido: {
      get() {
        return this.$store.getters["moduloFitosanitario/formFitosanitarioValido"];
      },
      set(v) {
        return this.$store.commit(
          "moduloFitosanitario/cambiarEstadoValidoFormFitosanitario",
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
