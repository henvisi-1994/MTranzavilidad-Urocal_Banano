<template>
  <v-form ref="formRespacopio" v-model="formRespacopioValido">
    <v-container>
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field
              :disabled="noEditar"
              v-model="respacopio.percedula"
              :rules="[reglas.campoVacio(respacopio.percedula),
                       reglas.soloNumerosPositivos(respacopio.percedula)]" 
              label="Cédula/RUC"
              class="custom px-2"
              dense
              filled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-menu
              v-model="menuMostrarCalendario"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  :disabled="noEditar"
                  v-model="respacopio.perfechanacimiento"
                  label="Fecha de nacimiento"
                  :rules="[reglas.campoVacio(respacopio.perfechanacimiento)]"
                  readonly
                  hint="Formato DD/MM/YYYY"
                  v-bind="attrs"
                  v-on="on"
                  class="custom px-2"
                  dense
                  filled
                >
                </v-text-field>
              </template>
              <v-date-picker
                v-model="respacopio.perfechanacimiento"
                @input="menuMostrarCalendario = false"
                locale="es-419"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field
              :disabled="noEditar"
              v-model="respacopio.pernombres"
              :rules="[reglas.campoVacio(respacopio.pernombres)]"
              label="Nombres"
              class="custom px-2"
              dense
              filled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field
              :disabled="noEditar"
              v-model="respacopio.perapellidos"
              :rules="[reglas.campoVacio(respacopio.perapellidos)]"
              label="Apellidos"
              class="custom px-2"
              dense
              filled
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field
              :disabled="noEditar"
              v-model="respacopio.pertelefono"
              :rules="[reglas.campoVacio(respacopio.pertelefono),
                    reglas.soloNumerosPositivos(respacopio.pertelefono)]" 
              label="Teléfono"
              class="custom px-2"
              dense
              filled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              :disabled="noEditar"
              v-model="respacopio.ciudadnacimiento.ciudadid"
              :rules="[reglas.campoVacio(respacopio.ciudadnacimiento.ciudadid)]"
              placeholder="Seleccione una ciudad"
              class="style-chooser custom px-2"
              label="ciudadnombre"
              filled
              :reduce="(listaCiudadStore) => listaCiudadStore.ciudadid"
              :options="listaCiudadStore"
            >
              <template v-slot:no-options="{ search, searching }">
                <template v-if="searching">
                  No hay resultados para <em>{{ search }}</em>
                </template>
                <em style="opacity: 0.5" v-else
                  >Empiece a escribir una finca</em
                >
              </template>
            </v-select>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field
              :disabled="noEditar"
              v-model="respacopio.perwhatsapp"
              :rules="[reglas.campoVacio(respacopio.perwhatsapp),
                    reglas.soloNumerosPositivos(respacopio.perwhatsapp)]" 
              label="Whatsapp"
              class="custom px-2"
              dense
              filled
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6">
            <v-select
              :disabled="noEditar"
              v-model="respacopio.pergenero"
              placeholder="Género"
              class="style-chooser px-2 custom"
              label="genero"
              filled
              :reduce="(itemsGenero) => itemsGenero.genero"
              :options="itemsGenero"
            >
              <template v-slot:no-options="{ search, searching }">
                <template v-if="searching">
                  No hay resultados para <em>{{ search }}</em>
                </template>
                <em style="opacity: 0.5" v-else
                  >Empiece a escribir una finca</em
                >
              </template>
            </v-select>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-text-field
              :disabled="noEditar"
              v-model="respacopio.perdireccion"
              :rules="[reglas.campoVacio(respacopio.perdireccion)]"   
              label="Dirección"
              class="custom px-2"
              dense
              filled
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              :disabled="noEditar"
              v-model="respacopio.peremail"
              :rules="[reglas.campoVacio(respacopio.peremail),
                    reglas.correo(respacopio.peremail)]" 
              label="Email"
              class="custom px-2"
              dense
              filled
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-container>
  </v-form>
</template>

<script>
import { mapState } from "vuex";

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  name: "FormRespacopio",

  components: {
    vSelect,
  },

  mounted() {
    this.inicializarFecha();
  },

  data() {
    return {
      menuMostrarCalendario: "",
      fecha: new Date().toISOString().substr(0, 10),
      ciudad: null,
      itemsGenero: [
        { id: 1, genero: "Masculino" },
        { id: 2, genero: "Femenino" },
      ],
      itemsTipoUsuario: [
        { id: 1, tipoUsuario: "Productor" },
        { id: 2, tipoUsuario: "Responsable Centro Acopio" },
        { id: 3, tipoUsuario: "Exportador" },
        { id: 4, tipoUsuario: "Administrador" },
      ],
    };
  },

/*
  watch: {
    ciudad(val) {
      //id
      this.respacopio.ciudadnacimiento.ciudadid = this.ciudad;
    },
  },
*/


  computed: {
    // Obtiene el modelo Respacopio
    //...mapState("moduloRespacopio", ["respacopio"]),

    noEditar: {
      get() {
        return this.$store.getters["moduloRespacopio/noEditar"];
      },
      set(v) {
        return this.$store.commit("moduloRespacopio/cambiarEstadoNoEditar", v);
      },
    },

    respacopio: {
      get() {
        return this.$store.getters["moduloRespacopio/respacopio"];
      },
      set(v) {
        return this.$store.commit("moduloRespacopio/nuevoRespacopio", v);
      },
    },

    listaRespacopioStore: {
      get() {
        return JSON.parse(
          JSON.stringify(
            this.$store.getters["moduloRespacopio/listaRespacopioStore"]
          )
        );
      },
      set(v) {
        return this.$store.commit(
          "moduloRespacopio/establecerlistaRespacopioStore",
          v
        );
      },
    },

    listaCiudadStore: {
      get() {
        return this.$store.getters["moduloRespacopio/listaCiudadStore"];
      },
      set(v) {
        return this.$store.commit(
          "moduloRespacopio/establecerListaCiudadStore",
          v
        );
      },
    },

    // Obtiene la variable que indica si el formulario es valido
    formRespacopioValido: {
      get() {
        return this.$store.getters["moduloRespacopio/formRespacopioValido"];
      },
      set(v) {
        return this.$store.commit(
          "moduloRespacopio/cambiarEstadoValidoFormRespacopio",
          v
        );
      },
    },

    // Obtiene las reglas de validacion
    ...mapState("validacionForm", ["reglas"]),
  },

  methods: {
    inicializarFecha() {
      this.respacopio.perfechanacimiento = this.fecha;
    },
  },
};
</script>
