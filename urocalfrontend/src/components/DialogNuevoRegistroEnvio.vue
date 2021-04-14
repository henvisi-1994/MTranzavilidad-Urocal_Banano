<template>
  <v-dialog
    v-model="dialogNuevoRegistroEnvio"
    scrollable
    :fullscreen="$vuetify.breakpoint.xs ? true : false"
    max-width="800px"
    transition="dialog-transition"
    eager
  >
    <v-card class="rounded-0">
      <!-- Barra de titulo -->
      <v-card-title class="white primary--text">
        <h5>Nuevo Registro de Envio</h5>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon
            class="primary--text"
            @click="cerrarDialogNuevoRegistroEnvio()"
            >mdi-close</v-icon
          >
        </v-btn>
      </v-card-title>

      <v-card-text style="padding: 0px">
        <v-container>
          <!-- Formulario para registrar RegistroEnvio -->
          <FormRegistroEnvio
            ref="componentFormRegistroEnvio"
          ></FormRegistroEnvio>
        </v-container>
      </v-card-text>

      <v-card-actions class="justify-center pb-3">
        <!-- Botón para agregar nuevo Poda -->
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="200px"
          color="primary"
          @click="agregarRegistroEnvio()"
          >Registrar</v-btn
        >
      </v-card-actions>

      <!--  
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
          
              <v-card elevation="0">
                <v-card-title class="primary--text">
                  <v-col cols="12" md="6">
                    Detalle
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-autocomplete
                    :items="listaCodigos"
                    :filter="filtroCodigos"
                    item-text="codigo"
                    label="Buscar" class="custom" dense filled></v-autocomplete>
                  </v-col>
                </v-card-title>
                <v-card-text>
                  <v-data-table
                    :headers="cabeceraTablaDetalle"
                    :items="listaDetalles"
                    class="elevation-1">
                  </v-data-table>
                </v-card-text>
              </v-card>
            
          
        </v-container>
      </v-card-text>
-->
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import FormRegistroEnvio from "@/components/FormRegistroEnvio";
import ServicioRegistroEnvio from "../services/ServicioRegistroEnvio";

export default {
  name: "DialogNuevoRegistroEnvio",
  components: {
    FormRegistroEnvio,
  },

  data() {
    return {
      //   cabeceraTablaDetalle: [
      //     {
      //       text: "Código",
      //       value: "codigo",
      //       align: "center",
      //       class: "grey lighten-3",
      //     },
      //     {
      //       text: "Fecha",
      //       value: "fecha",
      //       align: "center",
      //       class: "grey lighten-3",
      //     },
      //     {
      //       text: "Productor",
      //       value: "productor",
      //       align: "center",
      //       class: "grey lighten-3",
      //     },
      //     {
      //       text: "QQ Entregados",
      //       value: "qqentregados",
      //       align: "center",
      //       class: "grey lighten-3",
      //     },
      //     {
      //       text: "Acciones",
      //       value: "actions",
      //       sortable: false,
      //       align: "center",
      //       class: "grey lighten-3",
      //     },
      //   ],
      //   listaDetalles: [],
      //   listaCodigos: [
      //     {
      //       codigo: "Uro-054",
      //       fecha: "07/02/2018",
      //       productor: "Miguel Gonzales",
      //       qqentregados: "2,246",
      //     },
      //     {
      //       codigo: "Uro-123",
      //       fecha: "10/03/2020",
      //       productor: "Angel Barrezueta",
      //       qqentregados: "1,372",
      //     },
      //   ],
    };
  },
  computed: {
    formRegistroEnvioValido: {
      get() {
        return this.$store.getters[
          "moduloRegistroEnvio/formRegistroEnvioValido"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloRegistroEnvio/cambiarEstadoValidoFormRegistroEnvio",
          v
        );
      },
    },
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
    ...mapState("validacionForm", ["reglas"]),
  },
  methods: {
    // Filtra cuando se escribe un codigo en la busqueda
    filtroCodigos(item, queryText) {
      const texto = item.codigo.toLowerCase();
      const busqueda = queryText.toLowerCase();

      return texto.indexOf(busqueda) > -1;
    },
    // Cierra el dialogo
    cerrarDialogNuevoRegistroEnvio() {
      this.dialogNuevoRegistroEnvio = !this.dialogNuevoRegistroEnvio; // Cierra el dialogNuevoRegistroEnvio
    },
  },
};
</script>