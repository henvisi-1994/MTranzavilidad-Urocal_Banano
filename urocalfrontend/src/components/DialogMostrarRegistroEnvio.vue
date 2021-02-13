<template>
  <v-dialog
    v-model="dialogMostrarRegistroEnvio"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <v-card-title class="white primary--text">
        <h5>Actualizar/eliminar</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon class="primary--text">mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="primary--text">mdi-trash-can</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon class="primary--text" @click="cerrarDialogMostrarRegistroEnvio()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense
                label="Fecha"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense 
                label="Tipo"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row no-gutters justify-md="space-around">
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense 
                label="Lote"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field class="custom px-2" filled dense 
                label="Destino"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider></v-divider>
          <v-row no-gutters justify-md="space-around">
            <v-col cols="12">
              <v-card elevation="0">
                <v-card-title class="primary--text">
                  Detalle
                </v-card-title>
                <v-card-text>
                  
              <v-data-table
                :headers="cabeceraTablaDetalle"
                :items="listaDetalles"
                class="elevation-1"
              >
              </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "DialogMostrarRegistroEnvio",
  data() {
    return {
      cabeceraTablaDetalle: [
        {
          text: "Código",
          value: "codigo",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha",
          value: "fecha",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Productor",
          value: "productor",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "QQ Entregados",
          value: "qqentregados",
          align: "center",
          class: "grey lighten-3",
        },
      ],
      listaDetalles: []
    }
  },
  computed: {
    // Obtiene y modifica el estado de la variable dialogMostrarPoda
    dialogMostrarRegistroEnvio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogMostrarRegistroEnvio"];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit("gestionDialogos/toggleDialogMostrarRegistroEnvio", v);
      },
    },
  },
  methods: {
    // Cierra el dialogo
    cerrarDialogMostrarRegistroEnvio() {
      this.dialogMostrarRegistroEnvio = !this.dialogMostrarRegistroEnvio; // Cierra el dialogMostrarLimpiezaHerramienta
    },
  },
}
</script>

<style>

</style>