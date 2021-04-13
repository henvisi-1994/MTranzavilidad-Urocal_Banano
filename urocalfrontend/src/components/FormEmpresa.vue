<template>
  <v-form ref="formEmpresa">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearEmpresa"
            filled
            dense
            label="Razon Social"
            v-model="modeloEmpresaStore.emprazonsocial"
            :rules="[reglas.campoVacio(modeloEmpresaStore.emprazonsocial)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearEmpresa"
            filled
            dense
            label="RUC"
            v-model="modeloEmpresaStore.empruc"
            :rules="[reglas.campoVacio(modeloEmpresaStore.empruc), reglas.soloNumeros(modeloEmpresaStore.empruc)]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearEmpresa"
            filled
            dense
            label="Tipo"
            v-model="modeloEmpresaStore.emptipo"
            :rules="[reglas.campoVacio(modeloEmpresaStore.emptipo)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearEmpresa"
            filled
            dense
            label="Direccion"
            v-model="modeloEmpresaStore.empdireccion"
            :rules="[reglas.campoVacio(modeloEmpresaStore.empdireccion)]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="4">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearEmpresa"
            filled
            dense
            label="Telefono"
            v-model="modeloEmpresaStore.emptelefono"
            :rules="[reglas.campoVacio(modeloEmpresaStore.emptelefono), reglas.soloNumeros(modeloEmpresaStore.emptelefono)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearEmpresa"
            filled
            dense
            label="Email"
            v-model="modeloEmpresaStore.empemail"
            :rules="[reglas.campoVacio(modeloEmpresaStore.empemail) ,reglas.correo(modeloEmpresaStore.empemail)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="modeloEmpresaStore.paisid"
            placeholder="Pais"
            class="style-chooser"
            label="paisnombre"
            :disabled="bloquearEmpresa"
            :reduce="(paises) => paises.paisid"
            :options="paises"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir un pais</em>
            </template>
          </v-select>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapMutations,mapState } from "vuex";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import servicioEmpresa from "../services/ServicioEmpresa";
import servicioPais from "../services/ServicioPais";

export default {
  name: "FormEmpresa",

  components: {
    vSelect,
  },
  mounted() {
    this.obtenerTodosPaises();
  },

  data() {
    return {
      empresas: [],
      paises: [],
    };
  },


  computed: {
    // Obtiene la variable que indica si el formulario es valido
    formEmpresaValido: {
      get() {
        return this.$store.getters[
          "moduloEmpresa/formEmpresaValido"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloEmpresa/cambiarEstadoFormEmpresaValido",
          v
        );
      },
    },

    modeloEmpresaStore: {
      get() {
        return this.$store.getters["moduloEmpresa/modeloEmpresaStore"];
      },
      set(v) {
        return this.$store.commit("moduloEmpresa/establecerModeloEmpresaStore", v);
      },
    },
       bloquearEmpresa: {
      get() {
        return this.$store.getters["moduloEmpresa/bloquearEmpresa"];
      },
      set(v) {
        return this.$store.commit("moduloEmpresa/cambiarEstadoBloquearEmpresa", v);
      },
    },

    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {
        // Vacia el modelo fertilizante
   ...mapMutations("moduloEmpresa", ["vaciarModeloEmpresa"]),
   async getEmpresas(){
      let resultado= await servicioEmpresa.obtenerTodosEmpresa();
      this.empresas= resultado.data;
    },
    async obtenerTodosPaises(){
      let resultado= await servicioPais.obtenerTodosPaises();
      this.paises= resultado.data;
    }
  },
};
</script>
