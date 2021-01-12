<template>
  <v-container> </v-container>
</template>
<script>
export default {
  // Al crearse la vista, se envia al store el layout de Login a renderizar
  created() {
    this.$store.commit("colocarLayout", "LayoutLogin");
  },
};
</script>
