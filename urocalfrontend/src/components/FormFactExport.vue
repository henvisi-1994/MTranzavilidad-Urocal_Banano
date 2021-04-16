<template>
  <v-form ref="formFactExporta" v-model="formFacturaExportValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="Numero"
            v-model="factExportaStore.facnumero"
            :rules="[reglas.campoVacio(factExportaStore.facnumero)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-select
            v-model="factExportaStore.compradorid"
            :disabled="bloquearFacturaExport"
            placeholder="Comprador"
            class="style-chooser"
            label="emprazonsocial"
            :reduce="(empresas) => empresas.empresaid"
            :options="empresas"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>empiece a escribir razon social</em>
            </template>
          </v-select>

        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
           <v-select
            v-model="factExportaStore.vendedorid"
            :disabled="bloquearFacturaExport"
            placeholder="Vendedor"
            class="style-chooser"
            label="emprazonsocial"
            :reduce="(empresas) => empresas.empresaid"
            :options="empresas"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>empiece a escribir razon social</em>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" md="6">
          <v-menu
            v-model="menuMostrarCalendario"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="factExportaStore.facfecha"
                :disabled="bloquearFacturaExport"
                class="custom px-2"
                filled
                dense
                label="Fecha"
                readonly
                :rules="[reglas.campoVacio(factExportaStore.facfecha)]"
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="factExportaStore.facfecha"
              @input="menuMostrarCalendario = false"
              :show-current="currentDate"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="Puerto de Embarque"
            v-model="factExportaStore.facpuertoembarque"
            :rules="[reglas.campoVacio(factExportaStore.facpuertoembarque)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="Puerto de Destino"
            v-model="factExportaStore.facpuertodestino"
            :rules="[reglas.campoVacio(factExportaStore.facpuertodestino)]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="Vapor"
            v-model="factExportaStore.facvapor"
            :rules="[reglas.campoVacio(factExportaStore.facvapor)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="Subtotal 12%"
            v-model="factExportaStore.facsubtotal12"
            :rules="[reglas.campoVacio(factExportaStore.facsubtotal12)]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="Subtotal 0%"
            v-model="factExportaStore.facsubtotal0"
            :rules="[reglas.campoVacio(factExportaStore.facsubtotal0)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="Subtotal sin IVA"
            v-model="factExportaStore.facsubtotalsiniva"
            :rules="[reglas.campoVacio(factExportaStore.facsubtotalsiniva)]"
          ></v-text-field>
        </v-col>
                <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="Subtotal execento de IVA"
            v-model="factExportaStore.facsubtotalivaexcento"
            :rules="[reglas.campoVacio(factExportaStore.facsubtotalivaexcento)]"
          ></v-text-field>
          
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="Subtotal sin  Impuestos"
            v-model="factExportaStore.facsubtotalsinimpuestos"
            :rules="[reglas.campoVacio(factExportaStore.facsubtotalsinimpuestos)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="Descuentos"
            v-model="factExportaStore.factotaldesc"
            :rules="[
              reglas.campoVacio(factExportaStore.factotaldesc),
            ]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="ICE"
            v-model="factExportaStore.facice"
            :rules="[
              reglas.campoVacio(factExportaStore.facice),
            ]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="IVA 12%"
            v-model="factExportaStore.faciva12"
            :rules="[reglas.campoVacio(factExportaStore.faciva12)]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="IRBPN"
            v-model="factExportaStore.facirbpn"
            :rules="[reglas.campoVacio(factExportaStore.facirbpn)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="Total"
            v-model="factExportaStore.facvalortotal"
            :rules="[reglas.campoVacio(factExportaStore.facvalortotal)]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="Plazo"
            v-model="factExportaStore.facplazo"
            :rules="[reglas.campoVacio(factExportaStore.facplazo)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
           <v-select
            v-model="factExportaStore.facformapago"
            :disabled="bloquearFacturaExport"
            placeholder="Seleccione una forma de pago"
            class="style-chooser"
            label="descripcion"
            :reduce="(forma_pago) => forma_pago.nombre"
            :options="forma_pago"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>empiece a escribir una forma de pago</em>
            </template>
          </v-select>

        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="Tiempo"
            v-model="factExportaStore.factiempo"
            :rules="[reglas.campoVacio(factExportaStore.factiempo)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="DAE"
            v-model="factExportaStore.facdae"
            :rules="[reglas.campoVacio(factExportaStore.facdae)]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="Peso Neto"
            v-model="factExportaStore.facpesoneto"
            :rules="[reglas.campoVacio(factExportaStore.facpesoneto)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="Peso Bruto"
            v-model="factExportaStore.facpesobruto"
            :rules="[reglas.campoVacio(factExportaStore.facpesobruto)]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="Lote"
            v-model="factExportaStore.faclote"
            :rules="[reglas.campoVacio(factExportaStore.faclote)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="Contenedor"
            v-model="factExportaStore.faccontenedor"
            :rules="[reglas.campoVacio(factExportaStore.faccontenedor)]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="Semana"
            v-model="factExportaStore.facsemana"
            :rules="[reglas.campoVacio(factExportaStore.facsemana)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="Marca"
            v-model="factExportaStore.facmarca"
            :rules="[reglas.campoVacio(factExportaStore.facmarca)]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-menu
            v-model="menuMostrarCalendarioZarpe"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="Fecha de Zarpe"
                :disabled="bloquearFacturaExport"
                v-model="factExportaStore.facfechazarpe"
                class="custom px-2"
                filled
                dense
                :rules="[reglas.campoVacio(factExportaStore.facfechazarpe)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="factExportaStore.facfechazarpe"
              @input="menuMostrarCalendarioZarpe = false"
              :show-current="currentDate"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            :disabled="bloquearFacturaExport"
            filled
            dense
            label="Certificaciones"
            v-model="factExportaStore.faccertificaciones"
            :rules="[reglas.campoVacio(factExportaStore.faccertificaciones)]"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="2">
          Detalle de Factura
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            v-model="detalle.detcodigoprincipal"
            :disabled="bloquearFacturaExport"
            label="Código Principal"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            v-model="detalle.detcantidad"
            :disabled="bloquearFacturaExport"
            label="Cantidad"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            v-model="detalle.detdescripcion"
            :disabled="bloquearFacturaExport"
            label="Descripción"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            v-model="detalle.detpreciounitario"
            :disabled="bloquearFacturaExport"
            label="Precio Unitario"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            v-model="detalle.detporcentajedesc"
            :disabled="bloquearFacturaExport"
            label="Porcentaje Descuento"
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field
            class="custom px-2"
            filled
            dense
            v-model="detalle.detpreciototal"
            :disabled="bloquearFacturaExport"
            label="Precio Total"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-btn
          elevation="0"
          large
          :block="$vuetify.breakpoint.xs ? true : false"
          width="420px"
          color="primary"
          :disabled="bloquearFacturaExport"
          @click="agregarDetalleFactura()"
          >Agregar Detalle de Factura de Exportación</v-btn
        >
      </v-row>
      <v-row no-gutters justify-md="space-around" class="mt-10">
        <v-col cols="11">
          <v-data-table
            :headers="cabeceraTablaDetalleFacturaExport"
            :items="factExportaStore.detalle"
            class="elevation-1"
            no-data-text="No se han agregado detalle"
          >
            <template v-slot:item.actions="{ item }">
              <v-icon
                color="primary"
                :disabled="bloquearFacturaExport"
                @click="eliminarDetalleFctura(item)"
              >
                mdi-trash-can
              </v-icon>
              <v-icon
                color="primary"
                :disabled="bloquearFacturaExport"
                @click="editarDetalleFactura(item)"
              >
                mdi-eye
              </v-icon>
            </template>
          </v-data-table>
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
import ServicioFacturaExportacion from '../services/ServicioFacturaExportacion';

export default {
  name: "FormFactExporta",

  components: {
    vSelect,
  },
  mounted() {
    this.inicializarFecha();
    this.getEmpresas();
    this.obtenerTodosFacturaExport();
  },

  data() {
    return {
      menuMostrarCalendario: "",
      menuMostrarCalendarioZarpe: "",
      currentDate: new Date().toISOString().substr(0, 10),
      forma_pago: [
        { nombre: "Efectivo", descripcion: "Efectivo" },
        { nombre: "Tarjeta de débito", descripcion: "Tarjeta de débito" },
        { nombre: "Dinero Electrónico", descripcion: "Dinero Electrónico" },
        { nombre: "Tarjeta Prepago", descripcion: "Tarjeta Prepago" },
        { nombre: "Tarjeta de Crédito", descripcion: "Tarjeta de Crédito" },
      ],
      empresas: [],
      listaFacturasExport:[],
      detalle: {
        detcodigoprincipal: "",
        detcantidad: "",
        detdescripcion: "",
        detpreciounitario: "",
        detporcentajedesc: "",
        detpreciototal:"",
      },
      cabeceraTablaDetalleFacturaExport: [
        {
          text: "Código Principal",
          value: "detcodigoprincipl",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Cantidad",
          value: "detcantidad",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Descripción",
          value: "detdescripcion",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Precio Unitario",
          value: "detpreciounitario",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Porcentaje Descuento",
          value: "detporcentajedesc",
          align: "center",
          class: "grey lighten-3",
        },
        {
          text: "Precio Total",
          value: "detpreciototal",
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


  computed: {
    // Obtiene la variable que indica si el formulario es valido
    formFacturaExportValido: {
      get() {
        return this.$store.getters[
          "moduloFacturaExport/formFacturaExportValido"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloFacturaExport/cambiarEstadoValidoFormFacturaExport",
          v
        );
      },
    },

    factExportaStore: {
      get() {
        return this.$store.getters["moduloFacturaExport/factExportaStore"];
      },
      set(v) {
        return this.$store.commit("moduloFacturaExport/establecerEditarFacturaExport", v);
      },
    },
       bloquearFacturaExport: {
      get() {
        return this.$store.getters["moduloFacturaExport/bloquearFacturaExport"];
      },
      set(v) {
        return this.$store.commit("moduloFacturaExport/cambiarEstadoBloquearFacturaExport", v);
      },
    },
    editarFacturaExport: {
      get() {
        return this.$store.getters["moduloFacturaExport/editarFacturaExport"];
      },
      set(v) {
        return this.$store.commit(
          "moduloFacturaExport/establecerEditarFacturaExport",
          v
        );
      },
    },

    // Obtiene el modelo Ciudad
    // ...mapState("moduloFactExporta", ["finca"]),
    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {
        // Vacia el modelo fertilizante
    ...mapMutations("moduloFacturaExport", ["vaciarFacturaExport"]),
    inicializarFecha(){
      this.factExportaStore.facfecha = this.currentDate;
      this.factExportaStore.facfechazarpe = this.currentDate;
    },
   async getEmpresas(){
      let resultado= await servicioEmpresa.obtenerTodosEmpresa();
      this.empresas= resultado.data;
    },
    async obtenerTodosFacturaExport() {
      let resultado = await ServicioFacturaExportacion.obtenerTodosFacturaExport();
       this.listaFacturasExport = resultado.data;
    },
     agregarDetalleFactura() {
      this.factExportaStore.detalle.push(this.detalle);
      this.vaciarDetalleFactura();
    },
    vaciarDetalleFactura() {
      this.detalle = JSON.parse(
        JSON.stringify({
          detcodigoprincipal: "",
          detcantidad: "",
          detdescripcion: "",
          detpreciounitario: "",
          detporcentajedesc: "",
          detpreciototal:"",
        })
      );
    },
    eliminarDetalleFctura(item) {
      const index = this.factExportaStore.detalle.indexOf(item);
      this.factExportaStore.detalle.splice(index, 1);
    },
    editarDetalleFactura(item) {
      const index = this.factExportaStore.detalle.indexOf(item);
      this.detalle = JSON.parse(
        JSON.stringify({
          detcodigoprincipal: item.detcodigoprincipal,
          detcantidad: item.detcantidad,
          detdescripcion: item.detdescripcion,
          detpreciounitario: item.detpreciounitario,
          detporcentajedesc: item.detporcentajedesc,
          detpreciototal:item.detpreciototal,
        })
      );
    },
  },
};
</script>
