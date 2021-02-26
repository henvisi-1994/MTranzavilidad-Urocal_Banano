<template>
  <v-form>
    <v-container :class="$vuetify.breakpoint.xs ? '' : 'pl-10'">
      <!-- Presenta de forma dinamica checkboxes por cada producto -->
      <v-layout wrap>
        <v-flex v-for="producto in listaProductos" :key="producto.productoid" md4 xs6>
          <v-checkbox
            v-model="listaIDsProductos"
            input-value="true"
            :value="producto.productoid"
            :label="producto.pronombre"
            :disabled="bloquearCamposFormCultivo"
          ></v-checkbox>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import servicioProducto from "../services/ServicioProducto";

export default {
  name: "FormCultivo",

  data() {
    return {
      // Almacena listaProductos
      listaProductos: [],
    };
  },

  computed: {
    // Obtiene la lista de IDs de productos
    listaIDsProductos: {
      get() {
        return this.$store.getters["moduloProducto/listaIDsProductos"];
      },
      set(v) {
        return this.$store.commit("moduloProducto/agregarListaIDsProductos", v);
      },
    },

    // Obtiene la variable bloquearCamposFormCultivo
    bloquearCamposFormCultivo: {
      get() {
        return this.$store.getters["moduloCultivo/bloquearCamposFormCultivo"];
      },
      set(v) {
        return this.$store.commit("moduloCultivo/cambiarBloquearCamposFormCultivo", v);
      },
    },
  },

  methods: {
    // // Llena la listaProductos con datos del servidor backend
    async cargarListaProductos() {
      let resultado = await servicioProducto.obtenerTodosProducto();
      this.listaProductos = resultado.data;
    },
  },

  mounted() {
    // Llama al metodo cargarListaProductos
    this.cargarListaProductos();
  },
};
</script>
