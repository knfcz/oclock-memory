const { GAME_MAX_DURATION } = require('../../config');
const Game = require('../../services/Game');
const Score = require('../../database/models/Score');
const Storage = require('../../services/Storage');
const isPlayerNameValid = require('../../utils/isPlayerNameValid');
const { ERROR_CODE_INVALID_PARAMETERS } = require('../../errorCodes');

/**
 * Crée une nouvelle partie
 */
const createGame = async (request, response) => {
    const playerName = request.body.playerName;

    // Si le nom du joueur est invalide, on rejette
    if (!playerName || !isPlayerNameValid(playerName)) {
        response.status(400).json({
            errorCode: ERROR_CODE_INVALID_PARAMETERS,
        });

        return;
    }

    const NewGame = new Game({
        playerName,
        maxGameDuration: GAME_MAX_DURATION,
    });

    // On enregistre notre instance de jeu en mémoire
    Storage.set(`game-${NewGame.id}`, NewGame);

    response.json({
        cards: NewGame.getCards(),
        gameId: NewGame.id,
        maxGameDuration: NewGame.maxGameDuration,
        password: NewGame.password,
    });
};

/**
 * Révèle la valeur d'une carte de la partie demandée,
 * si toutes les cartes sont devinées, on met fin à la partie
 */
const revealCard = async (request, response) => {
    const gameId = request.params.gameId;
    const cardId = request.params.cardId;

    // On récupère l'instance de jeu correspondante en mémoire
    const CurrentGame = Storage.get(`game-${gameId}`);

    // On marque la carte comme révélée, et on la récupère
    const card = CurrentGame.revealCard(cardId);

    // Si la carte n'existe pas, on renvoie un erreur 404
    if (!card) {
        response.status(404).json({
            errorCode: ERROR_CODE_CARD_INVALID,
        });

        return;
    }

    let endGameData = {};

    if (CurrentGame.Board.getUnguessedCardsCount() === 0) {
        endGameData = CurrentGame.end();

        try {
            // On supprime l'instance de jeu en mémoire
            Storage.unset(`game-${CurrentGame.id}`);

            // Si le joueur a gagné, on enregistre le score en base de donnée
            if (endGameData.playerWon) {
                await Score.create({
                    gameDuration: endGameData.gameDuration,
                    playerName: CurrentGame.playerName,
                });
            }
        } catch (e) {
            response.status(500).json({
                errorCode: ERROR_CODE_CANNOT_CREATE_RESOURCE,
                resource: 'score',
            });

            return;
        }
    }

    // On renvoie le nouveau plateau de jeu et les éventuelles infos
    // de fin de partie
    response.json({
        cards: CurrentGame.getCards(),
        remainingCardsCount: CurrentGame.Board.getUnguessedCardsCount(),
        temporaryRevealedCardIds: CurrentGame.getTemporaryRevealedCardIds(),
        endGameData,
    });
};

module.exports = {
    createGame,
    revealCard,
};
