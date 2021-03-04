<template>
  <v-form ref="formLimpiezaHerramienta" v-model="formLimpiezaHerramientaValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-select
            v-model="cultivo"
            placeholder="Seleccione un cultivo"
            class="style-chooser"
            label="detalles"
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
        <v-col cols="12" md="6">
          <v-menu
            v-model="menuMostrarCalendario"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field class="custom px-2" filled dense
                label="Fecha de limpieza"
                v-model="modeloLimpiezaHerramientaStore.limfecha"
                :rules="[reglas.campoVacio(fecha)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="fecha"
              @input="menuMostrarCalendario = false"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Producto utilizado"
            v-model="modeloLimpiezaHerramientaStore.limproducto"
            :rules="[reglas.campoVacio(modeloLimpiezaHerramientaStore.limproducto)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Equipos"
            v-model="modeloLimpiezaHerramientaStore.limequipos"
            :rules="[reglas.campoVacio(modeloLimpiezaHerramientaStore.limequipos)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Maquinaria"
            v-model="modeloLimpiezaHerramientaStore.limmaquinaria"
            :rules="[reglas.campoVacio(modeloLimpiezaHerramientaStore.limmaquinaria)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Herramientas"
            v-model="modeloLimpiezaHerramientaStore.limherramientas"
            :rules="[reglas.campoVacio(modeloLimpiezaHerramientaStore.limherramientas)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Cajones"
            v-model="modeloLimpiezaHerramientaStore.limcajones"
            :rules="[reglas.campoVacio(modeloLimpiezaHerramientaStore.limcajones)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Tendales"
            v-model="modeloLimpiezaHerramientaStore.limtendales"
            :rules="[reglas.campoVacio(modeloLimpiezaHerramientaStore.limtendales)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6"
          ><v-text-field class="custom px-2" filled dense
            label="Operario"
            v-model="modeloLimpiezaHerramientaStore.limoperario"
            :rules="[reglas.campoVacio(modeloLimpiezaHerramientaStore.limoperario)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6"></v-col>
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
      cultivo: null,
      fecha: null,
      menuMostrarCalendario: "", // Variable de referencia para el menú de fecha toma muestra
      fechaActual: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  watch: {
    cultivo (val) { //id
      this.modeloLimpiezaHerramientaStore.cultivoproducto.cultivoid = this.cultivo;
  },

    fecha (val) {
      this.modeloLimpiezaHerramientaStore.limfecha = this.formatDate(this.fecha);
    },
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

    listaCultivoStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloLimpiezaHerramienta/listaCultivoStore"]));
      },
      set(v) {
        return this.$store.commit("moduloLimpiezaHerramienta/establecerListaCultivoStore", v);
      },
    },

    modeloLimpiezaHerramientaStore: {
      get() {
        return this.$store.getters["moduloLimpiezaHerramienta/limpiezaHerramienta"];
      },
      set(v) {
        return this.$store.commit("moduloLimpiezaHerramienta/nuevoLimpiezaHerramienta", v);
      },
    },

    // Obtiene el modelo Ciudad
    ...mapState("moduloLimpiezaHerramienta", ["limpiezaHerramienta"]),
    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {
    // FORMATO: Modifica el formato de la fecha a dd/mm/aaaa
    formatDate (fecha) {
        if (!fecha) return null

        const [year, month, day] = fecha.split('-')
        return `${day}/${month}/${year}`
    },
  },
};
</script>
