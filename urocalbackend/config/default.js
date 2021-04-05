require('dotenv').config()

module.exports = {
    port: 3000,
    domain: 'localhost',

    // Base de datos
    postgres: {
        user: process.env.DBUSER || 'postgres',
        host: process.env.DBHOST || 'localhost',
        database: process.env.DBNAME || 'urocaldb',
        password: process.env.DBPASSWORD || 'root',
        port: process.env.DBPORT || '5432'
    },
    //postgres: {
    //user: 'postgres',
    // host: 'localhost',
    //database: 'urocaldb',
    //password: 'root',
    //port: '5432'
    //  },

    // Email
    email: {
        provider: process.env.PROVIDER,
        user: process.env.EMAILUSER,
        password: process.env.EMAILPASSWD
<<<<<<< HEAD
        
=======

>>>>>>> 8f2d20847df712c65189b6986e90c5e632f0850c
    }
}