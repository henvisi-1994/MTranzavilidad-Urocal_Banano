<template>
  <v-container fluid>
    <DialogNuevoRegistroEnvio
      ref="componentDialogNuevoRegistroEnvio"
    ></DialogNuevoRegistroEnvio>

    <v-card elevation="0" class="mt-5">
      <v-card-title class="py-2">
        <v-row no-gutters justify-md="space-between">
          <v-col cols="12" md="6">
            <div
              :class="[`text-h4`, `mb-4`]"
              class="transition-swing primary--text"
              v-text="nombre"
            ></div>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="buscarRegistroEnvio"
              append-icon="mdi-magnify"
              label="Buscar"
              class="custom"
              dense
              filled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <!-- Tabla que muestra lista de registros -->
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaRegistroEnvio"
          sort-by="registroenvioid"
          :items="listaRegistroEnvioStore"
          :search="buscarRegistroEnvio"
          class="elevation-1"
        >
          <template v-slot:top>
            <!-- Dialog que muestra el formulario con toda la informacion del registro -->
            <DialogMostrarRegistroEnvio
              ref="componentDialogMostrarRegistroEnvio"
            ></DialogMostrarRegistroEnvio>
          </template>

          <template v-slot:item.actions="{ item }">
            <v-icon color="primary" @click="abrirMostrarRegistroEnvio(item)">
              mdi-eye
            </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <!-- Botón para agregar nuevo registro de envio -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px"
          large
          elevation="0"
          color="primary"
          @click="cargarDialogNuevoRegistroEnvio()"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import DialogMostrarRegistroEnvio from "@/components/DialogMostrarRegistroEnvio";
import DialogNuevoRegistroEnvio from "@/components/DialogNuevoRegistroEnvio";
import ServicioRegistroEnvio from "../services/ServicioRegistroEnvio";

import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  name: "BaseRegistroEnvio",

  components: {
    DialogMostrarRegistroEnvio,
    DialogNuevoRegistroEnvio,
  },
  mounted() {
    this.cargarListaRegistroEnvio();
  },

  computed: {
    // Obtiene y modifica el estado de la variable dialogNuevoRegistroEnvio
    dialogNuevoRegistroEnvio: {
      get() {
        return this.$store.getters["gestionDialogos/dialogNuevoRegistroEnvio"];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogNuevoRegistroEnvio",
          v
        );
      },
    },

    // Obtiene y modifica el estado de la variable dialogMostrarRegistroEnvio
    dialogMostrarRegistroEnvio: {
      get() {
        return this.$store.getters[
          "gestionDialogos/dialogMostrarRegistroEnvio"
        ];
      },
      set(v) {
        this.n_step = 1;
        return this.$store.commit(
          "gestionDialogos/toggleDialogMostrarRegistroEnvio",
          v
        );
      },
    },
    modeloRegistroEnvioStore: {
      get() {
        return this.$store.getters[
          "moduloRegistroEnvio/modeloRegistroEnvioStore"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloRegistroEnvio/establecerModeloRegistroEnvioStore",
          v
        );
      },
    },
    listaRegistroEnvioStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloRegistroEnvio/listaRegistroEnvioStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloRegistroEnvio/establecerListaRegistroEnvioStore",
          v
        );
      },
    },
    listaSeleccionDetallesStore: {
      get() {
        return this.$store.getters[
          "moduloRegistroEnvio/listaSeleccionDetallesStore"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloRegistroEnvio/establecerListaSeleccionDetallesStore",
          v
        );
      },
    },
    editarRegistroEnvio: {
      get() {
        return this.$store.getters["moduloRegistroEnvio/editarRegistroEnvio"];
      },
      set(v) {
        return this.$store.commit(
          "moduloRegistroEnvio/establecerEditarRegistroEnvio",
          v
        );
      },
    },
  },

  data() {
    return {
      nombre: "Registro de envíos",
      buscarRegistroEnvio: "",
      cabeceraTablaRegistroEnvio: [
        // Detalla las cabeceras de la tabla
        {
          text: "Fecha",
          value: "regfecha",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Tipo",
          value: "regtipo",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Lote",
          value: "reglote",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Destino",
          value: "regdestino",
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
    };
  },
  methods: {
    abrirMostrarRegistroEnvio(item) {
      this.dialogMostrarRegistroEnvio = !this.dialogMostrarRegistroEnvio; // Abre el dialogMostrarRegistroEnvio
      this.vaciarModeloRegistroEnvioStore();
      this.editarRegistroEnvio = true;
      // console.log(item);
      this.modeloRegistroEnvioStore = item;
      this.obtenerSeleccionDetalles();
      this.obtenerDetalleEnvio(this.modeloRegistroEnvioStore.registroenvioid);
    },

    cargarDialogNuevoRegistroEnvio() {
      this.dialogNuevoRegistroEnvio = !this.dialogNuevoRegistroEnvio; // Abre el dialogNuevoRegistroEnvio
      this.editarRegistroEnvio = false;
      this.vaciarModeloRegistroEnvioStore();
    },
    async cargarListaRegistroEnvio() {
      let listaRegistroEnvio = [];
      let respuesta = await ServicioRegistroEnvio.obtenerTodosRegistroEnvio();
      let registrosEnvios = await respuesta.data;
      registrosEnvios.forEach((f) => {
        listaRegistroEnvio.push(f);
      });
      this.listaRegistroEnvioStore = listaRegistroEnvio;
    },
    async obtenerSeleccionDetalles() {
      let resultado = await ServicioRegistroEnvio.obtenerSeleccionDetalles();
      this.listaSeleccionDetallesStore = await resultado.data;
    },
    async obtenerDetalleEnvio(id) {
      let listaDetalleEnvio = [];
      let respuesta = await ServicioRegistroEnvio.obtenerDetalleEnvio(id);
      let detallesEnvio = await respuesta.data;
      this.modeloRegistroEnvioStore.regdetalle = [];
      for (let i = 0; i < detallesEnvio.length; i++) {
        const elemento = detallesEnvio[i];
        let salir =false;
        for (let j = 0; j < this.listaSeleccionDetallesStore.length && salir===false; j++) {
          const elementoLista = this.listaSeleccionDetallesStore[j];

          if (
            elemento.codigofinca === elementoLista.codigo &&
            elemento.fecha === elementoLista.fecha &&
            elemento.productor === elementoLista.productor &&
            parseFloat(elemento.detenvcantidad) ===
              parseFloat(elementoLista.entregados)
          ) {
            listaDetalleEnvio.push(elementoLista);
            salir=true;
          }
        }
      }
      // console.log(listaDetalleEnvio);//son iguales
      // console.log(detallesEnvio);//con esto hasta aqui funciona
      // this.modeloRegistroEnvioStore.regdetalle = listaDetalleEnvio;
      this.$store.commit("moduloRegistroEnvio/establecerRegdetalle",listaDetalleEnvio);

    },
    ...mapMutations("moduloRegistroEnvio", ["vaciarModeloRegistroEnvioStore"]),
  },

  mixins: [autenticacionMixin, myMixin],

  created() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario.rol === "Administrador")
      this.$store.commit("colocarLayout", "LayoutAdministrador");
    if (usuario.rol === "Exportador")
      this.$store.commit("colocarLayout", "LayoutExportador");
  },
};
</script>
