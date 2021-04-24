<template>
  <v-form ref="formFinca" v-model="formFincaValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Código"
            v-model="modeloFincaStore.fincodigo"
            :rules="[reglas.campoVacio(modeloFincaStore.fincodigo)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Nombre"
            v-model="modeloFincaStore.finnombrefinca"
            :rules="[reglas.campoVacio(modeloFincaStore.finnombrefinca)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Superficie total"
            type="Number"
            v-model="modeloFincaStore.finsuperficietotal"
            :rules="[
              reglas.campoVacio(modeloFincaStore.finsuperficietotal),
              reglas.soloNumerosPositivos(modeloFincaStore.finsuperficietotal),
            ]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Superficie cultivada"
            type="Number"
            v-model="modeloFincaStore.finsuperficiecultivada"
            :rules="[
              reglas.campoVacio(modeloFincaStore.finsuperficiecultivada),
              reglas.soloNumerosPositivos(
                modeloFincaStore.finsuperficiecultivada
              ),
            ]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Coordenada X"
            type="Number"
            v-model="modeloFincaStore.fincoordenadax"
            :rules="[
              reglas.campoVacio(modeloFincaStore.fincoordenadax),
              reglas.soloNumerosPositivos(modeloFincaStore.fincoordenadax),
            ]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Coordenada Y"
            type="Number"
            v-model="modeloFincaStore.fincoordenaday"
            :rules="[
              reglas.campoVacio(modeloFincaStore.fincoordenaday),
              reglas.soloNumerosPositivos(modeloFincaStore.fincoordenaday),
            ]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-menu
            v-model="menuMostrarCalendarioAsociacion"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                class="custom px-2"
                filled
                dense
                label="Fecha de productos prohibidos"
                v-model="modeloFincaStore.finproductosprohibidos"
                :rules="[reglas.campoVacio(fecha)]"
                readonly
                hint="Formato DD/MM/YYYY"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="fechapp"
              @input="menuMostrarCalendarioAsociacion = false"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-menu
            v-model="menuMostrarCalendarioPropietario"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                class="custom px-2"
                filled
                dense
                label="Fecha de primera inspección"
                v-model="modeloFincaStore.finprimerainspeccion"
                :rules="[reglas.campoVacio(fecha)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="fechap"
              @input="menuMostrarCalendarioPropietario = false"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-menu
            v-model="menuMostrarCalendarioSitio"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                class="custom px-2"
                filled
                dense
                label="Fecha de ultima inspección"
                v-model="modeloFincaStore.finultimainspeccion"
                :rules="[reglas.campoVacio(fecha)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="fechau"
              @input="menuMostrarCalendarioSitio = false"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            label="Conformidades"
            v-model="modeloFincaStore.finnoconformidades"
            :rules="[reglas.campoVacio(modeloFincaStore.finnoconformidades)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-select
            v-model="asociacion"
            placeholder="Seleccione una Asociación"
            class="style-chooser"
            label="asonombre"
            :reduce="
              (listaAsociacionStore) => listaAsociacionStore.asociacionid
            "
            :options="listaAsociacionStore"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else
                >Empiece a escribir una asociación</em
              >
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="propietarios"
            placeholder="Seleccione un Propietario"
            class="style-chooser"
            label="propietario"
            :reduce="
              (listaPropietarioStore) => listaPropietarioStore.productorid
            "
            :options="listaPropietarioStore"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else
                >Empiece a escribir un propietario</em
              >
            </template>
          </v-select>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-select
            v-model="sitio"
            placeholder="Seleccione un Sitio"
            class="style-chooser"
            label="sitionombre"
            :reduce="(listaSitioStore) => listaSitioStore.sitioid"
            :options="listaSitioStore"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir un sitio</em>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" md="6"
          ><v-textarea
            class="custom px-2"
            filled
            dense
            label="Observaciones"
            rows="2"
            v-model="modeloFincaStore.finobservacion"
            :rules="[reglas.campoVacio(modeloFincaStore.finobservacion)]"
          ></v-textarea>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="2"> Certificación</v-col>
      </v-row>
      <br>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="7">
          <v-select
            placeholder="Seleccione una Certificacion"
            v-model="detalle.certificacionid"
            class="style-chooser"
            label="certificacionnombre"
            :reduce="
              (listaCertificaciones) => listaCertificaciones.certificacionid
            "
            :options="listaCertificaciones"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else
                >Empiece a escribir una certificacion</em
              >
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" md="5">
          <v-card-actions class="justify-center pb-3">
            <v-btn
              :block="$vuetify.breakpoint.xs ? true : false"
              width="300px"
              large
              elevation="0"
              @click="agregarCertificacion()"
              color="primary"
              >{{ textoboton }}</v-btn
            >
          </v-card-actions>
        </v-col>
      </v-row>
      <v-card-text>
        <v-data-table
          :headers="cabeceraTablaCertificacion"
          sort-by="certificacionid"
          :items="modeloFincaStore.detalle"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <!-- <v-icon color="primary" @click="editarItem(item)"> mdi-eye </v-icon> -->
            <v-icon color="error" @click="eliminarItem(item)">
              mdi-trash-can
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from "vuex";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import servicioCertificaciones from "../services/ServicioCertificaciones";

export default {
  name: "FormFinca",

  components: {
    vSelect,
  },
  mounted() {
    this.obtenerTodosCertificaciones();
  },
  data() {
    return {
      cabeceraTablaCertificacion: [
        // Detalla las cabeceras de la tabla
        {
          text: "Nombre",
          value: "certificacionnombre",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Certificacion",
          value: "certificacion",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Detalles",
          value: "actions",
          sortable: false,
          align: "center",
          class: "grey lighten-3",
        },
      ],
      indice: 0,
      textoboton: "Agregar",
      detalle: {
        certificacionid: "",
        certificacionnombre: "",
        certificacion: "",
      },
      sitio: null,
      asociacion: null,
      propietarios: null,
      fechap: null,
      fechau: null,
      fechapp: null,
      listaCertificaciones: [],
      menuMostrarCalendarioAsociacion: "", // Variable de referencia para el menú de fecha toma muestra
      menuMostrarCalendarioPropietario: "", // Variable de referencia para el menú de fecha toma muestra
      menuMostrarCalendarioSitio: "", // Variable de referencia para el menú de fecha toma muestra
      fecha: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  watch: {
    sitio(val) {
      //id
      this.modeloFincaStore.sitiofinca.sitioid = this.sitio;
    },

    asociacion(val) {
      //id
      this.modeloFincaStore.asociacionfinca.asociacionid = this.asociacion;
    },

    propietarios(val) {
      //id
      this.modeloFincaStore.productorid = this.propietarios;
    },

    fechapp(val) {
      this.modeloFincaStore.finproductosprohibidos = this.formatDate(
        this.fechapp
      );
    },

    fechap(val) {
      this.modeloFincaStore.finprimerainspeccion = this.formatDate(this.fechap);
    },

    fechau(val) {
      this.modeloFincaStore.finultimainspeccion = this.formatDate(this.fechau);
    },
  },

  computed: {
    // #  MANIPULACIÓN DE DATOS  #
    listaSitioStore: {
      get() {
        return JSON.parse(
          JSON.stringify(this.$store.getters["moduloFinca/listaSitioStore"])
        );
      },
      set(v) {
        return this.$store.commit("moduloFinca/establecerListaSitioStore", v);
      },
    },
    detalleCertificaciones: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloFinca/detalleCertificaciones"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloFinca/establecerDetalleCertificaciones",
          v
        );
      },
    },
    listaAsociacionStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloFinca/listaAsociacionStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloFinca/establecerListaAsociacionStore",
          v
        );
      },
    },

    listaPropietarioStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloFinca/listaPropietarioStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloFinca/establecerListaPropietarioStore",
          v
        );
      },
    },

    // Obtiene la variable que indica si el formulario es valido
    formFincaValido: {
      get() {
        return this.$store.getters["moduloFinca/formFincaValido"];
      },
      set(v) {
        return this.$store.commit(
          "moduloFinca/cambiarEstadoValidoFormFinca",
          v
        );
      },
    },

    modeloFincaStore: {
      get() {
        return this.$store.getters["moduloFinca/finca"];
      },
      set(v) {
        return this.$store.commit("moduloFinca/nuevoFinca", v);
      },
    },

    // Obtiene el modelo Ciudad
    ...mapState("moduloFinca", ["finca"]),
    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {
    async obtenerTodosCertificaciones() {
      let resultado = await servicioCertificaciones.obtenerTodosCertificaciones();
      this.listaCertificaciones = resultado.data;
    },
    agregarCertificacion() {
      if (this.textoboton !== "Actualizar") {
        let validacion = this.modeloFincaStore.detalle.find(
          (certificacion) =>
            certificacion.certificacionid === this.detalle.certificacionid
        );
        if (typeof validacion == "undefined") {
          let certificacion = this.listaCertificaciones.find(
            (certificacion) =>
              certificacion.certificacionid === this.detalle.certificacionid
          );
          this.detalle.certificacionnombre = certificacion.certificacionnombre;
          this.detalle.certificacion = certificacion.certificacion;
          this.modeloFincaStore.detalle.push(this.detalle);
          this.limpiarDetalle();
        } else {
          this.$toast.error(
            "La certificacion seleccionada ya existe porfavor eliga otra"
          );
        }
      } else {
        let validacion = this.modeloFincaStore.detalle.find(
          (certificacion) =>
            certificacion.certificacionid === this.detalle.certificacionid
        );
        if (typeof validacion == "undefined") {
          let certificacion = this.listaCertificaciones.find(
            (certificacion) =>
              certificacion.certificacionid === this.detalle.certificacionid
          );
          this.detalle.certificacionnombre = certificacion.certificacionnombre;
          this.detalle.certificacion = certificacion.certificacion;
          this.modeloFincaStore.detalle[0] = this.detalle;
        }

        // this.modeloFincaStore.detalle[index]=
      }
    },
    limpiarDetalle() {
      this.detalle = JSON.parse(
        JSON.stringify({
          certificacionid: "",
          certificacionnombre: "",
          certificacion: "",
        })
      );
    },
    eliminarItem(item) {
      const index = this.modeloFincaStore.detalle.indexOf(item);
      this.modeloFincaStore.detalle.splice(index, 1);
    },
    editarItem(item) {
      this.textoboton = "Actualizar";
      this.detalle = item;
      this.indice = this.modeloFincaStore.detalle.indexOf(item);
    },
    // FORMATO: Modifica el formato de la fecha a dd/mm/aaaa
    formatDate(fecha) {
      if (!fecha) return null;

      const [year, month, day] = fecha.split("-");
      return `${day}/${month}/${year}`;
    },
  },
};
</script>
