<template>
  <v-dialog
    v-model="dialogMostrarPais"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
    persistent
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="primary--text">
        <h5>Actualizar/eliminar</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon :disabled="!noeditar" class="primary--text" @click="cambiarEstadoEditar()">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon :disabled="!noeditar" class="primary--text" @click="eliminarRegistro()">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="primary--text" @click="cerrarDialogMostrarPais()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <!-- Formulario Pais -->
      <v-card-text style="padding: 0px">
        <v-container>
          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="12">
              <v-text-field class=" custom px-2" filled dense
                label="País"
                :disabled="noeditar"
                v-model="modeloPaisStore.paisnombre"
                :rules="[reglas.campoVacio(modeloPaisStore.paisnombre)]"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Sitio -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          :disabled="noeditar"
          width="300px" large elevation="0"
          color="primary"
          @click="actualizarRegistro()"
          >Guardar Cambios</v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import FormPais from "@/components/FormPais";
import ServicioPais from '../services/ServicioPais';

export default {
  name: "MostrarPais",

  components: {
    FormPais
  },

  data() {
    return {
      noeditar: true,
      tab: "formPais",
    };
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogMostrarPais
    dialogMostrarPais: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarPais"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarPais", v);
      },
    },

    modeloPaisStore: {
      get() {
        return this.$store.getters["moduloPais/pais"];
      },
      set(v) {
        return this.$store.commit("moduloPais/nuevoPais", v);
      },
    },

    listaPaisStore: {
      get() {
        return JSON.parse(JSON.stringify(this.$store.getters["moduloPais/listaPaisStore"]));
      },
      set(v) {
        return this.$store.commit("moduloPais/establecerListaPaisStore", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {

    // UPDATE: Actualiza un registro
    async actualizarRegistro () { 
      try {
          const respuesta = await ServicioPais.actualizarPais(this.modeloPaisStore.paisid, this.modeloPaisStore);
          this.$toast.success(respuesta.data.message);
          this.cargarListaPais();
          this.cerrarDialogMostrarPais();        
        } catch (error) {
          this.$toast.error(error.response.data.message);
      } 
    },

    async cargarListaPais () { 
      let listaPais = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioPais.obtenerTodosPaises();  // Obtener respuesta de backend
      let datosPais = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosPais.forEach((pais) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaPais.push(pais);
      });
      this.listaPaisStore = listaPais;
    },

    async eliminarRegistro() {
      try {
        const respuesta = await ServicioPais.eliminarPais(this.modeloPaisStore.paisid);
        this.$toast.success(respuesta.data.message);
        this.cargarListaPais();
        this.cerrarDialogMostrarPais();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      } 
    },

    // Vacia el modelo Pais
    ...mapMutations("moduloPais", ["vaciarPais"]),

    cerrarDialogMostrarPais() {
      this.dialogMostrarPais = !this.dialogMostrarPais; // Cierra el dialogMostrarPais
      this.vaciarPais(); // Vacia el modelo Pais
      this.cargarListaPais();
      this.noeditar = true;
    },

    cambiarEstadoEditar () { 
      this.noeditar = !this.noeditar;
    },
  },
};
</script>
