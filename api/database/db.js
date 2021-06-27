const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = require('../config');

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
    },
});

// On expose une instance de knex,
// qui permettra aux Models d'interroger la base de donnée
module.exports = knex;
