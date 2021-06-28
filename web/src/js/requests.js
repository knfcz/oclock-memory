import { API_URL } from './config';

/**
 * Envoie une requète et formatte la réponse
 */
const sendRequest = (resourceUrl, options) => {
    const fullUrl = API_URL + resourceUrl;

    return fetch(fullUrl, options).then(response => response.json());
};

const requests = {
    startGame: playerName =>
        sendRequest('/game', {
            method: 'POST',
            body: JSON.stringify({
                playerName,
            }),
            // Ce header permet de spécifier au serveur les données qu'on lui
            // envoie sont au format JSON
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }),

    // Cette syntaxe permet de récupérer dans l'objet passé en paramètre à revealCard
    // les propriétés "password", "gameId", et "cardId", et les stocker dans des variables
    // portant le même nom
    //
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
    revealCard: ({ password, gameId, cardId }) =>
        sendRequest(`/games/${gameId}/cards/${cardId}`, {
            method: 'POST',
            body: JSON.stringify({
                password,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }),

    listScores: () => sendRequest('/scores', { method: 'GET' }),
};

export default requests;
