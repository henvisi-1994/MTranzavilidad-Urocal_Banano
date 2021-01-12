require('dotenv').config()

module.exports = {
    port: 3000,
    domain: 'localhost',

    // Base de datos
    postgres: {
        user: process.env.DBUSER,
        host: process.env.DBHOST,
        database: process.env.DBNAME,
        password: process.env.DBPASSWORD,
        port: process.env.DBPORT
    },

    // Email
    email: {
        provider: process.env.PROVIDER,
        user: process.env.EMAILUSER,
        password: process.env.EMAILPASSWD
    }
}