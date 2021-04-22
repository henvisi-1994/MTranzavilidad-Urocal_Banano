<template>
  <v-form ref="formCertificacion" v-model="formCertificacionValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field class="custom px-2" filled dense
            label="Nombre"
            :disabled ="bloquearCamposFormCertificacion"
            v-model="certificacion.certificacionnombre"
            :rules="[reglas.campoVacio(certificacion.certificacionnombre)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
           <v-text-field class="custom px-2" filled dense
            label="Certificacion"
            v-model="certificacion.certificacion"
            :rules="[reglas.campoVacio(certificacion.certificacion)]"
            :disabled ="bloquearCamposFormCertificacion"
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
  name: "FormCertificacion",

  components: {
    vSelect,
  },

  data() {
    return {
      provincia: null
    };
  },


  computed: {

    // #  MANIPULACIÓN DE DATOS  #
    listaCertificacionStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloCertificaciones/listaCertificacionStore"]));
      },
      set(v) {
        return this.$store.commit("moduloCertificaciones/establecerListaCertificacionStore", v);
      },
    },

    // Obtiene la variable que indica si el formulario es valido
    formCertificacionValido: {
      get() {
        return this.$store.getters["moduloCertificaciones/formCertificacionValido"];
      },
      set(v) {
        return this.$store.commit("moduloCertificaciones/cambiarEstadoValidoFormCertificacion", v);
      },
    },
        bloquearCamposFormCertificacion: {
      get() {
        return this.$store.getters[
          "moduloCertificaciones/bloquearCamposFormCertificacion"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloCertificaciones/cambiarBloquearCamposFormCertificacion",
          v
        );
      },
    },

    certificacion: {
      get() {
        return this.$store.getters["moduloCertificaciones/certificacion"];
      },
      set(v) {
        return this.$store.commit("moduloCertificaciones/nuevaCertificacion", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
