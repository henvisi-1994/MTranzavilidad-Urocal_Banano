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
            v-model="modeloFitosanitarioStore.fincaid"
            placeholder="Finca"
            class="style-chooser"
            label="findescripcionfinca"
            @input="obtenerTodosLoteCultivadoDeFinca"
            :disabled="bloquearFitosanitarioStore"
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
            v-model="modeloFitosanitarioStore.lotecultivadoid"
            placeholder="Lote"
            class="style-chooser"
            label="lotnumero"
            :disabled="bloquearFitosanitarioStore"
            @input="obtenerTodosListaCultivo"
            :reduce="(listaLoteStore) => listaLoteStore.lotecultivadoid"
            :options="listaLoteStore"
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
            v-model="modeloFitosanitarioStore.cultivoid"
            placeholder="Cultivo"
            class="style-chooser"
            label="detalles"
            :disabled="bloquearFitosanitarioStore"
            :reduce="(listaCultivoStore) => listaCultivoStore.cultivoid"
            :options="listaCultivoStore"
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
            :disabled="bloquearFitosanitarioStore"
            v-model="modeloFitosanitarioStore.fitciclo"
            :rules="[
              reglas.campoVacio(modeloFitosanitarioStore.fitciclo),
              reglas.soloNumeros(modeloFitosanitarioStore.fitciclo),
              reglas.soloNumerosPositivos(modeloFitosanitarioStore.fitciclo),
            ]"
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
                :disabled="bloquearFitosanitarioStore"
                v-model="modeloFitosanitarioStore.fitfecha"
                :rules="[reglas.campoVacio(modeloFitosanitarioStore.fitfecha)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="modeloFitosanitarioStore.fitfecha"
              @input="menuMostrarCalendario = false"
              :show-current="fechaActual"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Nombre comercial"
            :disabled="bloquearFitosanitarioStore"
            v-model="modeloFitosanitarioStore.fitnombrecomercial"
            :rules="[
              reglas.campoVacio(modeloFitosanitarioStore.fitnombrecomercial),
            ]"
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Ingrediente activo"
            :disabled="bloquearFitosanitarioStore"
            v-model="modeloFitosanitarioStore.fitingredienteactivo"
            :rules="[
              reglas.campoVacio(modeloFitosanitarioStore.fitingredienteactivo),
            ]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Autorización Técnica"
            :disabled="bloquearFitosanitarioStore"
            v-model="modeloFitosanitarioStore.fitautorizaciontecnica"
            :rules="[
              reglas.campoVacio(
                modeloFitosanitarioStore.fitautorizaciontecnica
              ),
              reglas.soloLetras(
                modeloFitosanitarioStore.fitautorizaciontecnica
              ),
            ]"
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Nombre común"
            :disabled="bloquearFitosanitarioStore"
            v-model="modeloFitosanitarioStore.fitnombrecomun"
            :rules="[
              reglas.campoVacio(modeloFitosanitarioStore.fitnombrecomun),
              reglas.soloLetras(modeloFitosanitarioStore.fitnombrecomun),
            ]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Dosis"
            :disabled="bloquearFitosanitarioStore"
            v-model="modeloFitosanitarioStore.fitdosis"
            :rules="[
              reglas.campoVacio(modeloFitosanitarioStore.fitdosis),
              reglas.soloNumeros(modeloFitosanitarioStore.fitdosis),
              reglas.soloNumerosPositivos(modeloFitosanitarioStore.fitdosis),
            ]"
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Cantidad total (Kg)"
            :disabled="bloquearFitosanitarioStore"
            v-model="modeloFitosanitarioStore.fitcantidadtotal"
            :rules="[
              reglas.campoVacio(modeloFitosanitarioStore.fitcantidadtotal),
              reglas.soloNumeros(modeloFitosanitarioStore.fitcantidadtotal),
              reglas.soloNumerosPositivos(
                modeloFitosanitarioStore.fitcantidadtotal
              ),
            ]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            type="number"
            placeholder="Área aplicada"
            :disabled="bloquearFitosanitarioStore"
            v-model="modeloFitosanitarioStore.fitareaaplicada"
            :rules="[
              reglas.campoVacio(modeloFitosanitarioStore.fitareaaplicada),
              reglas.soloNumeros(modeloFitosanitarioStore.fitareaplicada),
              reglas.soloNumerosPositivos(
                modeloFitosanitarioStore.fitareaplicada
              ),
            ]"
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Equipo de aplicación"
            :disabled="bloquearFitosanitarioStore"
            v-model="modeloFitosanitarioStore.fitequipoaplicacion"
            :rules="[
              reglas.campoVacio(modeloFitosanitarioStore.fitequipoaplicacion),
            ]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Método de aplicación"
            :disabled="bloquearFitosanitarioStore"
            v-model="modeloFitosanitarioStore.fitmetodo"
            :rules="[
              reglas.campoVacio(modeloFitosanitarioStore.fitmetodo),
              reglas.soloLetras(modeloFitosanitarioStore.fitmetodo),
            ]"
          ></v-text-field
        ></v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            placeholder="Plazo de seguridad"
            :disabled="bloquearFitosanitarioStore"
            v-model="modeloFitosanitarioStore.fitplazoseguridad"
            :rules="[
              reglas.campoVacio(modeloFitosanitarioStore.fitplazoseguridad),
              reglas.soloNumeros(modeloFitosanitarioStore.fitplazoseguridad),
              reglas.soloNumerosPositivos(
                modeloFitosanitarioStore.fitplazoseguridad
              ),
            ]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5">
          <v-select
            v-model="modeloFitosanitarioStore.fitoperario"
            :disabled="bloquearFitosanitarioStore"
            placeholder="Operario"
            class="style-chooser"
            label="operario"
            :reduce="(listaOperario) => listaOperario.personaid"
            :options="listaOperario"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else
                >Empiece a escribir un operario</em
              >
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
import servicioLote from "../services/ServicioLote";
import servicioFinca from "../services/ServicioFinca";
import servicioCultivo from "../services/ServicioCultivo";
import servicioOperario from "../services/ServicioOperarioPersona";

export default {
  name: "FormFitosanitario",

  components: {
    vSelect,
  },
  mounted() {
    this.obtenerTodosFincas();
    this.obtenerTodosOperarios();
  },
  data() {
    return {
      listaFinca: [],
      listaLote: [],
      listaOperario: [],
      menuMostrarCalendario: "", // Variable de referencia para el menú de fecha toma muestra
      fechaActual: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  computed: {
    // Obtiene el modelo modeloFitosanitarioStore
    ...mapState("moduloFitosanitario", ["modeloFitosanitarioStore"]),

    modeloFitosanitarioStore: {
      get() {
        return this.$store.getters[
          "moduloFitosanitario/modeloFitosanitarioStore"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloFitosanitario/establecerModeloFitosanitariosStore",
          v
        );
      },
    },

    // Obtiene la variable que indica si el formulario es valido
    formFitosanitarioValido: {
      get() {
        return this.$store.getters[
          "moduloFitosanitario/formFitosanitarioValido"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloFitosanitario/cambiarEstadoValidoFormFitosanitario",
          v
        );
      },
    },
        listaCultivoStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloFitosanitario/listaCultivoStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloFitosanitario/establecerListaCultivoStore",
          v
        );
      },
    },

    listaLoteStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloFitosanitario/listaLoteStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloFitosanitario/establecerListaLoteStore",
          v
        );
      },
    },
    bloquearFitosanitarioStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloFitosanitario/bloquearFitosanitarioStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloFitosanitario/cambiarbloquearFitosanitarioStore",
          v
        );
      },
    },


    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {
    async obtenerTodosFincas() {
      let resultado = await servicioFinca.obtenerTodosFincas();
      this.listaFinca = resultado.data;
    },

    async obtenerTodosListaCultivo() {
      let resultado = await servicioCultivo.obtenerCultivoDetalles(
        this.modeloFitosanitarioStore.lotecultivadoid
      );
      this.listaCultivoStore = resultado.data;
    },
    async obtenerTodosLoteCultivadoDeFinca() {
      let resultado = await servicioLote.obtenerTodosLoteCultivadoDeFinca(
        this.modeloFitosanitarioStore.fincaid
      );
      this.listaLoteStore = resultado.data;
    },

    async obtenerTodosOperarios() {
      let resultado = await servicioOperario.obtenerTodosOperarioPersona();
      console.log(resultado);
      this.listaOperario = resultado.data;
    },
  },
};
</script>
