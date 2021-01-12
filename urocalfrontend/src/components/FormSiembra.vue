<template>
  <v-form ref="formSiembra" v-model="formSiembraValido">
    <v-container>
      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-select
            v-model="siembra.cultivoid"
            placeholder="Seleccione un Cultivo"
            class="style-chooser"
            label="proNombre"
            :reduce="(listaCultivos) => listaCultivos.cultivoid"
            :options="listaCultivos"
          >
            <template v-slot:no-options="{ search, searching }">
              <template v-if="searching">
                No hay resultados para <em>{{ search }}</em
                >.
              </template>
              <em style="opacity: 0.5" v-else>Empiece a escribir un Cultivo</em>
            </template>
          </v-select>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Cantidad de Plantas"
            type="Number"
            v-model="siembra.siecantidadplantas"
            :rules="[
              reglas.campoVacio(siembra.siecantidadplantas),
              reglas.soloNumeros(siembra.siecantidadplantas),
              reglas.soloNumerosPositivos(siembra.siecantidadplantas),
            ]"
            error-count="3"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-menu
            v-model="menuDateShowb"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="Fecha de compra semilla"
                v-model="siembra.siefechacomprasemilla"
                :rules="[reglas.campoVacio(siembra.siefechacomprasemilla)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="siembra.siefechacomprasemilla"
              @input="menuDateShowb = false"
              :show-current="currentDate"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="5">
          <v-text-field
            label="Proveedor de la Semilla"
            v-model="siembra.sieproveedorsemilla"
            :rules="[reglas.campoVacio(siembra.sieproveedorsemilla)]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-menu
            v-model="menuDateShow"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                label="Fecha de Siembra"
                v-model="siembra.siefechasiembra"
                :rules="[reglas.campoVacio(siembra.siefechasiembra)]"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="siembra.siefechasiembra"
              @input="menuDateShow = false"
              :show-current="currentDate"
              locale="es-419"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="12" md="5"
          ><v-text-field
            label="Hectareas"
            type="Number"
            rows="2"
            v-model="siembra.siehectareas"
            :rules="[
              reglas.campoVacio(siembra.siehectareas),
              reglas.soloNumerosPositivos(siembra.siehectareas),
            ]"
            error-count="2"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row no-gutters justify-md="space-around">
        <v-col cols="12" md="5">
          <v-text-field
            label="Operario"
            v-model="siembra.sieoperario"
            :rules="[reglas.campoVacio(siembra.sieoperario)]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="5"></v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from "vuex";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Siembra from "@/models/ModeloSiembra";

export default {
  name: "FormularioSiembra",

  components: {
    vSelect,
  },

  data() {
    return {
      listaCultivos: [
        {
          cultivoid: 1,
          proNombre: "Cultivo 1",
        },
        {
          cultivoid: 2,
          proNombre: "Cultivo 2",
        },
        {
          cultivoid: 3,
          proNombre: "Cultivo 3",
        },
      ],
      menuDateShow: "", // Variable de referencia para el menú de fecha toma muestra
      menuDateShowb: "",
      currentDate: new Date().toISOString().substr(0, 10), // Almacena la fecha actual
    };
  },

  computed: {
    // Obtiene el modelo siembra
    ...mapState("moduloSiembra", ["siembra"]),

    // Obtiene la variable que indica si el formulario es valido
    formSiembraValido: {
      get() {
        return this.$store.getters["moduloSiembra/formSiembraValido"];
      },
      set(v) {
        return this.$store.commit("moduloSiembra/cambiarEstadoFormSiembraValido", v);
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {},
};
</script>
