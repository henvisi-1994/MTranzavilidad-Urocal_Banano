require('dotenv').config()

module.exports = {
    port: 3000,
    domain: 'localhost',

    // Base de datos
    postgres: {
        user: process.env.DBUSER || 'postgres',
        host: process.env.DBHOST || 'localhost',
        database: process.env.DBNAME || 'urocaldb',
        password: process.env.DBPASSWORD || '12345',
        port: process.env.DBPORT || '5432'
    },

    // Email
    email: {
        provider: process.env.PROVIDER,
        user: process.env.EMAILUSER,
        password: process.env.EMAILPASSWD
        
    }
}