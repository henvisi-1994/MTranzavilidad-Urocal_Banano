<template>
  <div>
    <v-dialog
      v-model="dialogoMostrarCertificacion"
      scrollable
      :fullscreen="$vuetify.breakpoint.xs ? true : false"
      max-width="800px"
      transition="dialog-transition"
      persistent
    >
      <v-card tile>
        <!-- Barra de titulo -->
        <v-card-title class="primary--text">
          <h5>INFORMACIÓN CERTIFICACION</h5>
          <v-spacer></v-spacer>
          <v-btn icon @click="bloquearCamposFormCertificacion = false">
            <v-icon class="primary--text">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon @click="deleteCertificacion()">
            <v-icon class="primary--text">mdi-trash-can</v-icon>
          </v-btn>
          <v-btn icon @click="cerrarDialogMostrarCertificacion()">
            <v-icon class="primary--text">mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <!-- Formulario Certificacion -->
        <v-card-text style="padding: 0px">
          <v-container class="py-0">
            <!-- Formulario para registrar CertificacionCabecera -->
            <FormCertificacion
              ref="componentFormCertificacion"
            ></FormCertificacion>
          </v-container>
        </v-card-text>

        <v-card-actions class="justify-center pb-3">
          <!-- Botón para editar certificacion -->
          <v-btn
            :block="$vuetify.breakpoint.xs ? true : false"
            width="200px"
            color="primary"
            @click="guardarCambios()"
            >Guardar cambios</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import ServicioCertificaciones from "../services/ServicioCertificaciones";
import FormCertificacion from "@/components/FormCertificacion";

export default {
  name: "DialogMostrarCertificacion",

  components: {
    FormCertificacion,
  },

  data() {
    return {};
  },

  computed: {

    // Obtiene y modifica el estado de la variable dialogMostrarCertificacion
    dialogoMostrarCertificacion: {
      get() {
        return this.$store.getters[
          "gestionDialogos/dialogoMostrarCertificacion"
        ];
      },
      set(v) {
        return this.$store.commit(
          "gestionDialogos/toggleDialogoMostrarCertificacion",
          v
        );
      },
    },

    // Obtiene la variable bloquearCamposFormCertificacion
    bloquearCamposFormCertificacion: {
      get() {
        return this.$store.getters[
          "moduloCertificaciones/bloquearCamposFormCertificacion"
        ];
      },
      set(v) {
        return this.$store.commit(
          "moduloCertificaciones/cambiarBloquearCamposFormCertificacion",
          v
        );
      },
    },
 

    // Obtiene y modifica la variable listaCertificacion
        listaCertificacionStore: {
      get() {
        return this.$store.getters["moduloCertificaciones/listaCertificacionStore"];
      },
      set(v) {
        return this.$store.commit("moduloCertificaciones/establecerListaCertificacionStore", v);
      },
    },
        certificacion: {
      get() {
        return this.$store.getters["moduloCertificaciones/certificacion"];
      },
      set(v) {
        return this.$store.commit("moduloCertificaciones/nuevaCertificacion", v);
      },
    },
  },

  methods: {
    // Vacia el modelo DetalleCertificacion
    ...mapMutations("moduloDetalleCertificacion", [
      "vaciarDetalleCertificacion",
    ]),

    // Vacia el modelo DetalleCertificacion
    ...mapMutations("moduloCertificacion", ["vaciarCertificacion"]),



    // Cierra el dialogMostrarCertificacion
    cerrarDialogMostrarCertificacion() {
      this.dialogoMostrarCertificacion = false;
      this.vaciarCertificacion();
    },


    async guardarCambios() {
      try {
         let respuesta = await ServicioCertificaciones.actualizarCertificacion(this.certificacion.certificacionid,this.certificacion);
         this.$toast.success(respuesta.data.message);
         this.obtenerTodosCertificacion();
         this.cerrarDialogMostrarCertificacion();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
    },

    // Llena la listaCertificacion con datos del servidor backend
    async obtenerTodosCertificacion() {
      let listaCertificacion = [];                                               // Limpiar la 'lista de datos'
      let respuesta = await ServicioCertificaciones.obtenerTodosCertificaciones();  // Obtener respuesta de backend
      let datosCertificacion = await respuesta.data;                                    // Rescatar datos de la respuesta
      datosCertificacion.forEach((certificacion) => {                                  // Guardar cada registro en la 'lista de datos' 
        listaCertificacion.push(certificacion);
      });
      this.listaCertificacionStore = listaCertificacion;
    },

   async deleteCertificacion() {
      try {
         let respuesta = await ServicioCertificaciones.eliminarCertificacion(this.certificacion.certificacionid);
         this.$toast.warning(respuesta.data.message);
         this.obtenerTodosCertificacion();
         this.cerrarDialogMostrarCertificacion();
      } catch (error) {
        this.$toast.error(error.response.data.message);
      }
     
    },
  },

  
};
</script>
