<template>
  <v-form>
    <v-container>
      <!-- Presenta de forma dinamica checkboxes por cada producto -->
      <v-layout wrap>
        <v-flex
          v-for="producto in lista_productos"
          :key="producto.id"
          md4
          xs6
          class="center-col-vh"
        >
          <v-checkbox
            v-model="listaIDsProductos"
            input-value="true"
            :value="producto.id"
            :label="producto.nombre"
          ></v-checkbox>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "FormCultivo",

  data() {
    return {
      lista_productos: [
        {
          id: 1,
          nombre: "Producto 1",
        },
        {
          id: 2,
          nombre: "Producto 2",
        },
        {
          id: 3,
          nombre: "Producto 3",
        },
        {
          id: 4,
          nombre: "Producto 4",
        },
        {
          id: 5,
          nombre: "Producto 5",
        },
      ],
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
  },

  methods: {},
};
</script>
