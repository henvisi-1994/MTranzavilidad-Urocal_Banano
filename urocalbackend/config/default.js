require('dotenv').config()

module.exports = {
    port: 3000,
    domain: 'localhost',

    // Base de datos
    postgres: {
        user: 'postgres',
        host: 'localhost',
        database: 'urocaldb',
        password: '12345',
        port: '5432'
    },

    // Email
    email: {
        provider: process.env.PROVIDER,
        user: process.env.EMAILUSER,
        password: process.env.EMAILPASSWD
    }
}