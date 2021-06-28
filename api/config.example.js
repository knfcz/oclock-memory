// Port du serveur
const SERVER_PORT = 3001;

// Nombre de paires
const GAME_PAIRS_COUNT = 18;

// Durée max d'une partie, en millisecondes
const GAME_MAX_DURATION = 120 * 1000;

// Informations de la base de donnée
const DB_USER = 'root';
const DB_PASSWORD = '';
const DB_HOST = 'localhost';
const DB_NAME = 'memory';

module.exports = {
    SERVER_PORT,
    GAME_PAIRS_COUNT,
    GAME_MAX_DURATION,
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_NAME,
};
