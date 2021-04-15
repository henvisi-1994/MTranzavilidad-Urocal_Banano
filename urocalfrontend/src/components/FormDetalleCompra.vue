<template>
  <v-form ref="formDetalleCompra" v-model="formDetalleCompraValido">
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-text-field
          type="Number"
          label="Porcentaje de fermentación"
          v-model="detCompra.detporcentajefermentacion"
          :rules="[
            reglas.campoVacio(detCompra.detporcentajefermentacion),
            reglas.soloNumerosPositivos(detCompra.detporcentajefermentacion),
          ]"
          error-count="2"
          :disabled="bloquearCamposFormDetalleCompra"
          class="custom px-2"
          dense
          filled
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="fermentacion"
          placeholder="Seleccione un tipo de fermentación"
          class="style-chooser custom px-2"
          dense
          filled
          label="tipo"
          :reduce="(listaFermentacion) => listaFermentacion.fermentacionid"
          :options="listaFermentacion"
          multiple
          :disabled="bloquearCamposFormDetalleCompra"
          @input="establecerTipoFermentacion()"
        >
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              No hay resultados para <em>{{ search }}</em
              >.
            </template>
            <em style="opacity: 0.5" v-else
              >Empiece a escribir un tipo de fermentacion</em
            >
          </template>
        </v-select>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-text-field
          type="Number"
          label="Porcentaje de humedad"
          v-model="detCompra.detporcentajehumedad"
          :rules="[
            reglas.campoVacio(detCompra.detporcentajehumedad),
            reglas.soloNumerosPositivos(detCompra.detporcentajehumedad),
          ]"
          error-count="2"
          :disabled="bloquearCamposFormDetalleCompra"
          class="custom px-2"
          dense
          filled
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          type="Number"
          label="Porcentaje de impurezas"
          v-model="detCompra.detporcentajeimpurezas"
          :rules="[
            reglas.campoVacio(detCompra.detporcentajeimpurezas),
            reglas.soloNumerosPositivos(detCompra.detporcentajeimpurezas),
          ]"
          error-count="2"
          :disabled="bloquearCamposFormDetalleCompra"
          class="custom px-2"
          dense
          filled
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-text-field
          label="Penalidad"
          v-model="detCompra.detpenalidad"
          :rules="[reglas.campoVacio(detCompra.detpenalidad)]"
          :disabled="bloquearCamposFormDetalleCompra"
          class="custom px-2"
          dense
          filled
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          type="Number"
          label="Estimulo"
          v-model="detCompra.detestimulo"
          :rules="[
            reglas.campoVacio(detCompra.detestimulo),
            reglas.soloNumerosPositivos(detCompra.detestimulo),
          ]"
          error-count="2"
          :disabled="bloquearCamposFormDetalleCompra"
          class="custom px-2"
          dense
          filled
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-text-field
          type="Number"
          label="Tara"
          v-model="detCompra.dettara"
          :rules="[
            reglas.campoVacio(detCompra.dettara),
            reglas.soloNumerosPositivos(detCompra.dettara),
          ]"
          error-count="2"
          :disabled="bloquearCamposFormDetalleCompra"
          class="custom px-2"
          dense
          filled
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-select
          v-model="detCompra.detestado"
          placeholder="Seleccione un estado"
          class="style-chooser custom px-2"
          label="estado"
          :reduce="(listaEstado) => listaEstado.estadoid"
          :options="listaEstado"
          :disabled="bloquearCamposFormDetalleCompra"
          @input="cambiarOpcionesUnidad()"
          dense
          filled
        >
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              No hay resultados para <em>{{ search }}</em
              >.
            </template>
            <em style="opacity: 0.5" v-else>Empiece a escribir un estado</em>
          </template>
        </v-select>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-select
          v-model="detCompra.detunidad"
          placeholder="Seleccione una unidad"
          class="style-chooser custom px-2"
          dense
          filled
          label="unidad"
          :reduce="(listaUnidad) => listaUnidad.unidadid"
          :options="listaUnidad"
          :disabled="bloquearCamposFormDetalleCompra"
          @input="establecerUnidad()"
        >
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              No hay resultados para <em>{{ search }}</em
              >.
            </template>
            <em style="opacity: 0.5" v-else>Empiece a escribir una unidad</em>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          type="Number"
          label="Cantidad"
          v-model="detCompra.detcantidadunidades"
          :rules="[
            reglas.campoVacio(detCompra.detcantidadunidades),
            reglas.soloNumerosPositivos(detCompra.detcantidadunidades),
          ]"
          error-count="2"
          :disabled="bloquearCamposFormDetalleCompra"
          class="custom px-2"
          dense
          filled
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-text-field
          type="Number"
          label="Precio Unidad"
          v-model="detCompra.detpreciounidad"
          :rules="[
            reglas.campoVacio(detCompra.detpreciounidad),
            reglas.soloNumerosPositivos(detCompra.detpreciounidad),
          ]"
          error-count="2"
          :disabled="bloquearCamposFormDetalleCompra"
          class="custom px-2"
          dense
          filled
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6">
        <v-text-field
          type="Number"
          label="Precio Total"
          v-model="preciototal"
          class="custom px-2"
          dense
          filled
          disabled
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-select
          v-model="detCompra.detallecompraid"
          placeholder="Seleccione una cosecha"
          class="style-chooser custom px-2"
          dense
          filled
          label="coscodigo"
          :reduce="(listaCosechaSinDetalle) => listaCosechaSinDetalle.cosechaid"
          :options="listaCosechaSinDetalle"
          :disabled="bloquearCamposFormDetalleCompra"
        >
          <template v-slot:no-options="{ search, searching }">
            <template v-if="searching">
              No hay resultados para <em>{{ search }}</em
              >.
            </template>
            <em style="opacity: 0.5" v-else>Empiece a escribir una cosecha</em>
          </template>
        </v-select>
      </v-col>
      <v-col cols="12" md="6"> </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

import servicioCosecha from "../services/ServicioCosecha";

export default {
  name: "formDetalleCompra",

  components: {
    vSelect,
  },

  data() {
    return {
      menuMostrarCalendario: "",
      fechaActual: new Date().toISOString().substr(0, 10), // Fecha actual

      listaFermentacion: [
        { fermentacionid: "1", tipo: "Moho" },
        { fermentacionid: "2", tipo: "Pizarra" },
        { fermentacionid: "3", tipo: "Violeta" },
        { fermentacionid: "4", tipo: "Semivioleta" },
        { fermentacionid: "5", tipo: "Optimio" },
      ],

      listaEstado: [
        { estadoid: "1", estado: "Seco" },
        { estadoid: "2", estado: "En baba" },
      ],

      listaUnidad: [],
    };
  },

  computed: {
    // Obtiene el modelo DetalleCompra
    ...mapState("moduloDetalleCompra", ["detCompra", "listaDetalleCompra"]),

    // Obtiene y modifica el estado de la variable dialogMostrarDetalleCompra
    dialogMostrarDetalleCompra: {
      get() {
        return this.$store.getters[
          "gestionDialogos/dialogMostrarDetalleCompra"
        ];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit(
          "gestionDialogos/toggleDialogMostrarDetalleCompra",
          v
        );
      },
    },

    // Obtiene la variable que indica si el formulario es valido
    formDetalleCompraValido: {
      get() {
        return this.$store.getters[
          "moduloDetalleCompra/formDetalleCompraValido"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloDetalleCompra/cambiarEstadoFormDetalleCompraValido",
          v
        );
      },
    },

    // Obtiene la variable bloquearCamposFormDetalleCompra
    bloquearCamposFormDetalleCompra: {
      get() {
        return this.$store.getters[
          "moduloDetalleCompra/bloquearCamposFormDetalleCompra"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloDetalleCompra/cambiarBloquearCamposFormDetalleCompra",
          v
        );
      },
    },

    // Obtiene y modifica la variable fermentacion
    fermentacion: {
      get() {
        return this.$store.getters["moduloDetalleCompra/fermentacion"];
      },
      set(v) {
        return this.$store.commit("moduloDetalleCompra/asignarFermentacion", v);
      },
    },

    // Obtiene y modifica el estado de la variable dialogNuevoDetalleCompra
    dialogNuevoDetalleCompra: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoDetalleCompra"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogNuevoDetalleCompra",
          v
        );
      },
    },

    // Obtiene y modifica el estado de la variable listaCosechaSinDetalle
    listaCosechaSinDetalle: {
      get() {
        return this.$store.getters[
          "moduloDetalleCompra/listaCosechaSinDetalle"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloDetalleCompra/asignarListaCosechaSinDetalle",
          v
        );
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),

    preciototal() {
      this.detCompra.detpreciototal =
        this.detCompra.detpreciounidad * this.detCompra.detcantidadunidades;
      return this.detCompra.detpreciototal;
    },
  },

  methods: {
    ...mapMutations("moduloDetalleCompra", ["eliminarListaCosechaSinDetalle"]),

    // Cambia el tipo de unidad segun el estado seleccionado
    cambiarOpcionesUnidad() {
      switch (this.detCompra.detestado) {
        case "1":
          this.listaUnidad = [
            { unidadid: "1", unidad: "Libras" },
            { unidadid: "2", unidad: "Quintales" },
          ];
          this.detCompra.detestado = this.listaEstado[0].estado;
          this.detCompra.detunidad = "";
          break;
        case "2":
          this.listaUnidad = [{ unidadid: "1", unidad: "Tachos" }];
          this.detCompra.detestado = this.listaEstado[1].estado;
          this.detCompra.detunidad = "";
          break;
        default:
          this.listaUnidad = [];
          this.detCompra.detunidad = "";
          break;
      }
    },

    // Cambia a true o false, dependiendo del tipo de fermentacion seleccionado
    establecerTipoFermentacion() {
      this.detCompra.detmoho = false;
      this.detCompra.detpizarra = false;
      this.detCompra.detvioleta = false;
      this.detCompra.detsemivioleta = false;
      this.detCompra.detoptimio = false;

      this.fermentacion.forEach((tipo) => {
        switch (tipo) {
          case "1":
            this.detCompra.detmoho = true;
            break;
          case "2":
            this.detCompra.detpizarra = true;
            break;
          case "3":
            this.detCompra.detvioleta = true;
            break;
          case "4":
            this.detCompra.detsemivioleta = true;
            break;
          case "5":
            this.detCompra.detoptimio = true;
            break;
        }
      });
    },

    establecerUnidad() {
      switch (this.detCompra.detunidad) {
        case "1":
          this.detCompra.detunidad = this.listaUnidad[0].unidad;
          break;
        case "2":
          this.detCompra.detunidad = this.listaUnidad[1].unidad;
          break;
      }
    },
    async obtenerCosechasSinDetalle() {
      let respuestaServicioCosecha = await servicioCosecha.obtenerCosechasSinDetalleCompra();
      this.listaCosechaSinDetalle = respuestaServicioCosecha.data;
      this.listaDetalleCompra.forEach((detalleCompra) => {
        this.eliminarListaCosechaSinDetalle(detalleCompra.detallecompraid);
      });
    },
  },

  watch: {
    // Cada vez que se abre el dialog mostrar, se verifica el estado seleccionado para cargar sus unidades correspondientes
    dialogMostrarDetalleCompra() {
      if (this.dialogMostrarDetalleCompra) {
        setTimeout(() => {
          switch (this.detCompra.detestado) {
            case "1":
              this.listaUnidad = [
                { unidadid: "1", unidad: "Libras" },
                { unidadid: "2", unidad: "Quintales" },
              ];
              if (this.detCompra.detunidad === "Libras")
                this.detCompra.detunidad = "1";
              if (this.detCompra.detunidad === "Quintales")
                this.detCompra.detunidad = "2";
              break;
            case "2":
              this.listaUnidad = [{ unidadid: "1", unidad: "Tachos" }];
              if (this.detCompra.detunidad === "Tachos")
                this.detCompra.detunidad = "1";
              break;
          }
        }, 100);
      }
    },

    dialogNuevoDetalleCompra() {
      if (this.dialogNuevoDetalleCompra) {
        this.obtenerCosechasSinDetalle();
      }
    },
  },
};
</script>
