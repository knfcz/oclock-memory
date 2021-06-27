const { GAME_MAX_DURATION } = require('../../config');
const Game = require('../../services/Game');
const Score = require('../../database/models/Score');
const Storage = require('../../services/Storage');
const { ERROR_CODE_CANNOT_CREATE_RESOURCE } = require('../../errorCodes');
const { ERROR_CODE_INVALID_PARAMETERS } = require('../../errorCodes');

/**
 * Crée une nouvelle partie
 */
const start = async (request, response) => {
    const playerName = request.body.playerName;

    // Si le nom du joueur est invalide, on rejette
    if (!playerName) {
        response.status(400).json({
            errorCode: ERROR_CODE_INVALID_PARAMETERS,
        });

        return;
    }

    const NewGame = new Game({
        playerName,
        maxDuration: GAME_MAX_DURATION,
    });

    // On enregistre notre instance de jeu en mémoire
    Storage.set(`game-${NewGame.id}`, NewGame);

    response.json({
        cards: NewGame.getCards(),
        gameId: NewGame.id,
        password: NewGame.password,
    });
};

/**
 * Termine une partie,
 * si les conditions de victoire sont remplies, enregistre le score
 */
const end = async (request, response) => {
    const gameId = request.params.gameId;
    const gameStorageKey = `game-${gameId}`;

    // On récupère l'instance de jeu correspondante en mémoire
    const CurrentGame = Storage.get(gameStorageKey);

    const gameData = CurrentGame.end();

    try {
        // Si le joueur a gagné, on enregistre le score en base de donnée
        if (gameData.playerWon) {
            await Score.create({
                gameDuration: gameData.gameDuration,
                playerName: CurrentGame.playerName,
            });
        }
    } catch (e) {
        response.status(500).json({
            errorCode: ERROR_CODE_CANNOT_CREATE_RESOURCE,
            resource: 'score',
        });
    }

    // On supprime l'instance de jeu en mémoire
    Storage.unset(gameStorageKey);

    response.json(gameData);
};

module.exports = {
    start,
    end,
};
