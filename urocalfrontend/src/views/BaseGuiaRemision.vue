<template>
  <v-container fluid>
    <v-dialog
      v-model="dialog"
      scrollable
      :fullscreen="$vuetify.breakpoint.xs ? true : false"
      max-width="800px"
      transition="dialog-transition"
      eager
    >
      <v-card class="rounded-0">
        <v-card-title class="white primary--text">
          <h5>Registrar Guia</h5>
          <v-spacer></v-spacer>
          <v-btn icon @click="dialog = false">
            <v-icon class="primary--text">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text style="padding: 0px">
          <v-container>
            <v-row no-gutters justify-md="space-around">
              <v-col cols="12" md="6">
                <v-text-field class="custom px-2" dense filled label="Serie"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field class="custom px-2" dense filled label="Número"></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters justify-md="space-around">
              <v-col cols="12" md="6">
                <v-text-field class="custom px-2" dense filled label="Número del comprobante de venta"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-menu
                  v-model="menuFechaEmision"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field class="custom px-2" dense filled
                      label="Fecha de emisión"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    @input="menuFechaEmision = false"
                    :show-current="fechaActual"
                    locale="es-419"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row no-gutters justify-md="space-around">
              <v-col cols="12" md="6">
                <v-menu
                  v-model="menuFechaInicioTraslado"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field class="custom px-2" dense filled
                      label="Fecha de inicio de traslado"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    @input="menuFechaInicioTraslado = false"
                    :show-current="fechaActual"
                    locale="es-419"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field class="custom px-2" dense filled label="Hora de inicio del traslado"></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters justify-md="space-around">
              <v-col cols="12" md="6">
                <v-menu
                  v-model="menuFechaFinTraslado"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field class="custom px-2" dense filled
                      label="Fecha de fin de traslado"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    @input="menuFechaFinTraslado = false"
                    :show-current="fechaActual"
                    locale="es-419"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field class="custom px-2" dense filled label="Hora de fin del traslado"></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters justify-md="space-around">
              <v-col cols="12" md="6">
                <v-text-field class="custom px-2" dense filled label="Punto de inicio"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field class="custom px-2" dense filled label="Punto de fin"></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters justify-md="space-around">
              <v-col cols="12" md="6">
                <v-select class="style-chooser custom px-2" :items="motivos" label="Motivo"></v-select>
              </v-col>
              <v-col cols="12" md="6">
              </v-col>
            </v-row>
            <v-row no-gutters justify-md="space-around" class="mt-5">
              <v-col cols="12">
                <p class="text-center overline primary--text">Destinatario</p>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field class="custom px-2" dense filled label="Nombre o Razón Social"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field class="custom px-2" dense filled label="RUC o CI"></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters justify-md="space-around" class="mt-5">
              <v-col cols="12">
                <p class="text-center overline primary--text">
                  Persona encargada del transporte
                </p>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" md="6">
                <v-text-field class="custom px-2" dense filled label="Nombre o Razón Social"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field class="custom px-2" dense filled label="RUC o CI"></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" md="6">
                <v-text-field class="custom px-2" dense filled label="Placa del vehículo"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
              </v-col>
            </v-row>
            <v-row no-gutters justify-md="space-around" class="mt-5">
              <v-col cols="12">
                <p class="text-center overline primary--text">Bienes transportados</p>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" md="6">
                <v-text-field class="custom px-2" dense filled label="Cantidad"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field class="custom px-2" dense filled label="Unidad"></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" md="6">
                <v-text-field class="custom px-2" dense filled label="Código de cosecha"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field class="custom px-2" dense filled label="Descripción"></v-text-field>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="12" md="6">
                <v-text-field class="custom px-2" dense filled label="Estado"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
              </v-col>
            </v-row>
            <v-row class="justify-center">              
              <v-btn elevation="0" large :block="$vuetify.breakpoint.xs ? true : false" width="300px" color="primary">Agregar bienes transportados</v-btn>
            </v-row>
            <v-row no-gutters justify-md="space-around" class="mt-10">
              <v-col cols="11">
                <v-data-table
                  :headers="cabeceraTablaBienes"
                  :items="listaBienes"
                  class="elevation-1"
                >
                </v-data-table>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions class="justify-center pb-3">
          <v-btn
            :block="$vuetify.breakpoint.xs ? true : false"
            width="300px"
            large
            elevation="0"
            color="primary"
            >Registrar</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
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
            <v-text-field class="custom px-2" dense filled
              v-model="buscarGuia"
              append-icon="mdi-magnify"
              label="Buscar"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-title>

      <v-card-text>
        <v-data-table
          :height="tablaResponsiva()"
          :headers="cabeceraTablaGuiaRemision"
          sort-by="guiserie"
          :items="listGuiaRemision"
          :search="buscarGuia"
          class="elevation-1"
        >
          <template v-slot:item.actions="{ item }">
            <v-icon color="primary"> mdi-eye </v-icon>
          </template>
        </v-data-table>
      </v-card-text>

      <v-card-actions class="justify-center">
        <v-btn
          :block="$vuetify.breakpoint.xs ? true : false"
          width="300px"
          large
          elevation="0"
          color="primary"
          @click="dialog = true"
          >Nuevo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { autenticacionMixin, myMixin } from "@/mixins/MyMixin"; // Instancia al mixin de autenticacion

export default {
  data() {
    return {
      nombre: "Guía de Remisión",
      guiaremision: {
        guiserie: "",
        guinumero: "",
        guifechaemision: "",
        guifechainicio: "",
        guihorainicio: "",
        guifechafin: "",
        guihorafin: "",
        guipuntoinicio: "",
        guipuntofin: "",
        guidestinatario: "",
        guimotivo: "",
        guiformapago: "",
        guiobservacion: "",
        guiemiteurocal: false,
      },
      menuFechaEmision: false,
      menuFechaInicioTraslado: false,
      menuFechaFinTraslado: false,
      buscarGuia: "",
      dialog: false,
      motivos: [
        "Venta",
        "Compra",
        "Transformación",
        "Consignación",
        "Traslado entre establecimientos de una misma empresa",
        "Traslado por emisor itinerante de comprobantes de venta",
        "Devolución",
        "Importación",
        "Exportación",
        "Otros",
      ],
      cabeceraTablaBienes: [
        {
          text: "Cantidad",
          value: "cantidad",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Unidad",
          value: "unidad",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Código de cosecha",
          value: "codigocosecha",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Descripción",
          value: "descripcion",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Estado",
          value: "estado",
          align: "center",
          class: "grey lighten-3",
        },
      ],
      listaBienes: [
        {
          cantidad: 1,
          unidad: "Sacos",
          codigocosecha: "URF10A-L1-RP0000000001",
          descripcion: "Cacao Nacional Orgánico SPP",
          estado: "Baba",
        },
      ],
      cabeceraTablaGuiaRemision: [
        {
          text: "Serie",
          value: "guiserie",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Número",
          value: "guinumero",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha emisión",
          value: "guifechaemision",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha inicio traslado",
          value: "guifechainicio",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Hora inicio traslado",
          value: "guihorainicio",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Fecha fin traslado",
          value: "guifechafin",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Hora fin traslado",
          value: "guihorafin",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Punto de inicio",
          value: "guipuntoinicio",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Punto de fin",
          value: "guipuntofin",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Comprobante de venta",
          value: "comprobante",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Motivo",
          value: "guimotivo",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Destinatario",
          value: "guidestinatario",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Forma de pago",
          value: "guiformapago",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Observación",
          value: "guiobservacion",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Conductor",
          value: "conductorid",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Vehículo",
          value: "vehiculoid",
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
      listGuiaRemision: [],
      fechaActual: new Date().toISOString().substr(0, 10),
    };
  },

  methods: {},

  mixins: [autenticacionMixin, myMixin],

  created() {
    let usuario = JSON.parse(localStorage.getItem("usuario"));
    if (usuario.rol === "Administrador")
      this.$store.commit("colocarLayout", "LayoutAdministrador");
    if (usuario.rol === "Productor")
      this.$store.commit("colocarLayout", "LayoutProductor");
  },
};
</script>

<style></style>
