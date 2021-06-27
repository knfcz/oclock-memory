const Storage = require('../../services/Storage');
const {
    ERROR_CODE_GAME_UNAUTHORIZED,
    ERROR_CODE_GAME_INVALID,
} = require('../../errorCodes');

/**
 * Middleware d'authentification,
 *
 * Renvoie une réponse d'erreur au client si il n'a pas le droit de jouer
 * à cette partie
 */
const authenticate = (request, response, next) => {
    const gameId = request.params.gameId;
    const gamePassword = request.body.password;

    const Game = Storage.get(`game-${gameId}`);

    // Si le partie n'existe pas en mémoire, on renvoie une erreur 404
    if (!Game) {
        response.status(404).json({
            errorCode: ERROR_CODE_GAME_INVALID,
        });

        return;
    }

    // Si le mot de passe donné ne correspond pas, on renvoie une erreur 401
    if (Game.password !== gamePassword) {
        response.status(401).json({
            errorCode: ERROR_CODE_GAME_UNAUTHORIZED,
        });

        return;
    }

    // Si tout est bon, on passe le relai au prochain middleware, ou à l'action
    next();
};

module.exports = authenticate;
