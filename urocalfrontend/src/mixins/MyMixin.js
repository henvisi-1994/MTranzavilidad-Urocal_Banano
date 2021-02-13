export const myMixin = {
    methods: {
        // FORMATO: Modifica el formato de la fecha a dd/mm/aaaa
        formatDate(fecha) {
            if (!fecha) return null

            const [year, month, day] = fecha.split('-')
            return `${day}/${month}/${year}`
        },

        tablaResponsiva() {
            // Ajusta el tamaño de la tabla para pantallas pequeñas
            switch (this.$vuetify.breakpoint.name) {
                case "xs":
                    if (
                        this.$vuetify.breakpoint.height >= 500 &&
                        this.$vuetify.breakpoint.height <= 550
                    ) {
                        return "41vh";
                    }
                    if (
                        this.$vuetify.breakpoint.height >= 551 &&
                        this.$vuetify.breakpoint.height <= 599
                    ) {
                        return "44vh";
                    }
                    if (
                        this.$vuetify.breakpoint.height >= 600 &&
                        this.$vuetify.breakpoint.height <= 650
                    ) {
                        return "51vh";
                    }
                    if (
                        this.$vuetify.breakpoint.height >= 651 &&
                        this.$vuetify.breakpoint.height <= 699
                    ) {
                        return "53vh";
                    }
                    if (
                        this.$vuetify.breakpoint.height >= 700 &&
                        this.$vuetify.breakpoint.height <= 799
                    ) {
                        return "57vh";
                    }
                    if (this.$vuetify.breakpoint.height >= 800) {
                        return "61vh";
                    }
                default:
                    return "auto";
            }
        },
    },
}

export const autenticacionMixin = {
    computed: {
        // Obtiene la variable que indica si esta logueado
        logueado() {
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            const estadoInicial = usuario
                ? { estado: { logueado: true }, usuario }
                : { estado: { logueado: false }, usuario: null };
            return estadoInicial.estado.logueado;
        },
    },

    mounted() {
        if (!this.logueado) {
            this.$router.push({ name: "Login" }).catch((failure) => {

            });
        }
    },
}

export const autenticacionLoginMixin = {
    computed: {
        // Obtiene la variable que indica si esta logueado
        logueado() {
            const usuario = JSON.parse(localStorage.getItem("usuario"));
            const estadoInicial = usuario
                ? { estado: { logueado: true }, usuario }
                : { estado: { logueado: false }, usuario: null };
            return estadoInicial.estado.logueado;
        },
    },

    created() {
        // Si esta logueado, lo envia a su respectivo contenido
        if (this.logueado) {
            let rol = JSON.parse(localStorage.getItem("usuario")).rol;
            if (rol === "Productor") this.$router.push({ name: "BaseSiembra" });
            if (rol === "Responsable Centro Acopio")
                this.$router.push({ name: "BaseAlmacenamiento" });
            if (rol === "Exportador")
                this.$router.push({ name: "BaseRegistroEnvio" });
            if (rol === "Administrador")
                this.$router.push({ name: "BaseUsuarioPersona" });
        }
    },
}