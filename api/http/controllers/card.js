const Storage = require('../../services/Storage');
const { ERROR_CODE_CARD_INVALID } = require('../../errorCodes');

/**
 * Renvoie la valeur d'une carte
 */
const find = (request, response) => {
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

    // Sinon, on renvoie le nouveau plateau de jeu
    response.json({ cards: CurrentGame.getCards() });
};

module.exports = {
    find,
};
